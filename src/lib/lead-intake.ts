import { PHONE_DISPLAY } from './businessInfo';

/**
 * lead-intake — the single path every lead on this site takes.
 *
 * Every form imports submitLead(). Nothing else may POST a lead directly:
 * scripts/check-lead-intake.mjs enforces that the endpoint below actually
 * exists in netlify/functions/ and that the form below is declared in
 * public/__forms.html, so the build fails before a deploy can drop leads.
 *
 * The rule this module exists to enforce: a caller may only show a thank-you
 * when a sink confirmed it stored the lead. `ok: false` means the visitor must
 * be told to call instead.
 */

/** Server-side fan-out to the CRM, ops backend, and Netlify Forms. */
export const LEAD_ENDPOINT = '/.netlify/functions/kickserv-lead';

/**
 * Browser-side fallback target. POSTs go to /__forms.html and never to "/" —
 * "/" is caught by the SPA fallback redirect, which answers 200 with index.html
 * and makes a lost lead look like a delivered one.
 */
export const LEAD_FORM_PATH = '/__forms.html';
export const LEAD_FORM_NAME = 'lead-intake';

const ENDPOINT_TIMEOUT_MS = 12_000;

export const LEAD_FAILURE_MESSAGE =
  `We could not confirm your request — please call ${PHONE_DISPLAY} and we'll pick up.`;

export type LeadPayload = Record<string, string | number | boolean | undefined>;

export interface LeadResult {
  /** True only when a sink confirmed storage. Never show success without this. */
  ok: boolean;
  /** Sinks that accepted the lead, e.g. ['netlify-forms', 'leads-api']. */
  delivered: string[];
  /** Traceable reference returned by the function, when it answered. */
  leadRef?: string;
  /** Present whenever something failed, even on a successful fallback. */
  error?: string;
}

function toFormBody(payload: LeadPayload, formName: string): string {
  const params = new URLSearchParams();
  params.append('form-name', formName);
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null) params.append(key, String(value));
  }
  return params.toString();
}

/** Last-resort sink: straight into Netlify Forms from the browser. */
async function submitToNetlifyForms(payload: LeadPayload, formName: string): Promise<boolean> {
  try {
    const res = await fetch(LEAD_FORM_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: toFormBody(payload, formName),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Deliver a lead. Tries the function first, falls back to Netlify Forms, and
 * reports honestly when neither worked.
 *
 * `formName` picks the Netlify Forms bucket for the fallback — pass 'contact'
 * to keep contact-page submissions in their existing bucket. Whatever is passed
 * must be declared in public/__forms.html or the build check fails.
 */
export async function submitLead(
  payload: LeadPayload,
  formName: string = LEAD_FORM_NAME,
): Promise<LeadResult> {
  let primaryError = '';

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(ENDPOINT_TIMEOUT_MS),
    });

    const data = (await res.json().catch(() => ({}))) as Partial<LeadResult> & { error?: string };

    if (res.ok && data.ok) {
      return {
        ok: true,
        delivered: data.delivered ?? ['lead-intake'],
        leadRef: data.leadRef,
        error: data.error,
      };
    }

    primaryError = data.error || `Lead endpoint returned ${res.status}`;
  } catch (err) {
    // A missing function answers with the SPA fallback HTML, which fails the
    // JSON parse above; a network error lands here. Both mean: try the fallback.
    primaryError = err instanceof Error ? err.message : 'Lead endpoint unreachable';
  }

  if (await submitToNetlifyForms(payload, formName)) {
    return { ok: true, delivered: ['netlify-forms-fallback'], error: primaryError };
  }

  return { ok: false, delivered: [], error: LEAD_FAILURE_MESSAGE };
}
