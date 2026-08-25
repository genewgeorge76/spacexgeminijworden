/**
 * kickserv-lead — server-side lead intake for every form on the site.
 *
 * This is the endpoint every lead form POSTs to. It fans a submission out to
 * every configured sink and reports honestly which ones accepted it:
 *
 *   1. netlify-forms  Always on. Server-side POST back to our own /__forms.html.
 *                     Needs no credentials, so it survives an expired CRM token,
 *                     a lapsed subscription, or a backend outage. This is the
 *                     sink that guarantees a lead is never silently lost.
 *   2. leads-api      The FastAPI ops backend (LEADS_API_URL). Optional.
 *   3. crm-webhook    Kickserv (or any CRM) inbound webhook. Optional.
 *
 * Contract with the client (src/lib/lead-intake.ts):
 *   200 + { ok: true,  delivered: [...] }  at least one sink stored the lead
 *   502 + { ok: false, failed: [...] }     nothing stored it — the caller MUST
 *                                          show a real error, never a thank-you
 *
 * Canary mode: send `x-worden-canary: 1` to check the endpoint is deployed and
 * configured without creating a lead. Used by .github/workflows/lead-intake-canary.yml.
 */

const SINK_TIMEOUT_MS = 8000;

/** Netlify injects URL at runtime; fall back to the canonical production host. */
function siteUrl() {
  return (
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    'https://www.jwordenasphaltpaving.com'
  );
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

async function withTimeout(fn) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SINK_TIMEOUT_MS);
  try {
    return await fn(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

/** Which sinks this deploy is able to use. */
function sinkConfig() {
  return {
    'netlify-forms': true, // no credentials required — always available
    'leads-api': Boolean(process.env.LEADS_API_URL || process.env.VITE_LEADS_API_URL),
    'crm-webhook': Boolean(process.env.KICKSERV_WEBHOOK_URL),
  };
}

/**
 * Mirror into Netlify Forms. Posts to /__forms.html, which is a real static file
 * in the published bundle carrying the matching <form> definition — POSTing to
 * "/" instead would hit the SPA fallback and return a misleading 200.
 */
async function deliverToNetlifyForms(lead) {
  const params = new URLSearchParams({ 'form-name': 'lead-intake' });
  for (const [key, value] of Object.entries(lead)) {
    if (value !== undefined && value !== null) params.append(key, String(value));
  }

  const res = await withTimeout((signal) =>
    fetch(`${siteUrl()}/__forms.html`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'manual',
      signal,
    }),
  );

  // Netlify answers an accepted form POST with 200 or a 3xx to the success page.
  if (res.status >= 400) {
    throw new Error(`Netlify Forms returned ${res.status} (is the form detected in the deploy?)`);
  }
}

async function deliverToLeadsApi(lead) {
  const url = process.env.LEADS_API_URL || process.env.VITE_LEADS_API_URL;
  const res = await withTimeout((signal) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal,
    }),
  );
  if (!res.ok) throw new Error(`Leads API returned ${res.status}`);
}

async function deliverToCrmWebhook(lead) {
  const headers = { 'Content-Type': 'application/json' };
  if (process.env.KICKSERV_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${process.env.KICKSERV_WEBHOOK_TOKEN}`;
  }
  const res = await withTimeout((signal) =>
    fetch(process.env.KICKSERV_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(lead),
      signal,
    }),
  );
  if (!res.ok) throw new Error(`CRM webhook returned ${res.status}`);
}

const DELIVERERS = {
  'netlify-forms': deliverToNetlifyForms,
  'leads-api': deliverToLeadsApi,
  'crm-webhook': deliverToCrmWebhook,
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed. POST a JSON lead.' });
  }

  const configured = sinkConfig();

  // Canary probe — proves the function is deployed and wired, creates nothing.
  const headers = event.headers || {};
  if (headers['x-worden-canary'] || headers['X-Worden-Canary']) {
    return jsonResponse(200, {
      ok: true,
      canary: true,
      sinks: configured,
      site: siteUrl(),
    });
  }

  let lead;
  try {
    lead = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON body.' });
  }

  // Honeypot — bots fill this, humans never see it. Accept and drop silently.
  if (lead['bot-field']) {
    return jsonResponse(200, { ok: true, delivered: ['discarded-bot'] });
  }

  const name = String(lead.firstName || lead.name || '').trim();
  const phone = String(lead.phone || '').trim();
  if (!name || !phone) {
    return jsonResponse(400, {
      ok: false,
      error: 'A name and a phone number are required so we can call you back.',
    });
  }

  const leadRef = `WRD-${Date.now().toString(36).toUpperCase()}`;
  const enriched = {
    ...lead,
    leadRef,
    receivedAt: new Date().toISOString(),
    source: lead.source || 'website',
  };

  const attempts = Object.keys(DELIVERERS).filter((sink) => configured[sink]);
  const results = await Promise.allSettled(
    attempts.map((sink) => DELIVERERS[sink](enriched)),
  );

  const delivered = [];
  const failed = [];
  results.forEach((result, i) => {
    const sink = attempts[i];
    if (result.status === 'fulfilled') {
      delivered.push(sink);
    } else {
      failed.push({ sink, error: String(result.reason && result.reason.message) });
    }
  });

  // Log without the contact details — enough to trace a lead, not enough to leak one.
  console.log(
    JSON.stringify({ event: 'lead_intake', leadRef, delivered, failed: failed.map((f) => f.sink) }),
  );

  if (delivered.length === 0) {
    return jsonResponse(502, {
      ok: false,
      leadRef,
      failed,
      error: 'We could not record your request. Please call 804-446-1296.',
    });
  }

  return jsonResponse(200, { ok: true, leadRef, delivered, failed });
};
