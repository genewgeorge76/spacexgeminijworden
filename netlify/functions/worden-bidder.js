/**
 * worden-bidder.js — Paving AI Bidding Node
 * White-Label Multi-Tenant Architecture (SaaS-Ready)
 *
 * All tenant-specific values are controlled by environment variables so that
 * licensed contractors can drop in their own credentials without touching code.
 *
 * Environment Variables
 * ─────────────────────
 * ANTHROPIC_API_KEY      — Required. Anthropic Claude API key.
 * COMPANY_NAME           — Tenant company name. Default: "J. Worden & Sons Paving"
 * ASPHALT_PRICE_PER_TON  — Asphalt material cost (USD/ton). Default: 85.00
 * STONE_PRICE_PER_TON    — Structural stone base cost (USD/ton). Default: 28.50
 * OIL_PRICE_SHIELD       — Liquid-asphalt price buffer (USD/ton). Default: 9.00
 * STONE_BASE_SPEC        — State/agency specification for aggregate base material.
 *                          Default: "VDOT Section 315" (Virginia). Override for other
 *                          state DOTs, e.g. "MDOT Section 301" or "PennDOT Form 408".
 * CASE_STUDIES           — Comma-separated reference projects. Default: "$2.2M KFC Big Chicken Remodel and Taco Bell contracts"
 * CRM_WEBHOOK_URL        — Optional. Full HTTPS URL of a CRM inbound webhook.
 *                          When set, every generated proposal is POST-ed there so
 *                          the lead lands in Kickserv, HubSpot, Jobber, etc.
 */

// ─── Tenant Configuration ───────────────────────────────────────────────────
const config = {
  companyName:
    process.env.COMPANY_NAME || 'J. Worden & Sons Paving',
  asphaltPricePerTon:
    parseFloat(process.env.ASPHALT_PRICE_PER_TON) || 85.0,
  stonePricePerTon:
    parseFloat(process.env.STONE_PRICE_PER_TON) || 28.5,
  // ±$9/ton liquid-asphalt price buffer is the Worden Standard floor; tenants
  // in other markets can raise this to protect their own margins.
  oilPriceShield:
    parseFloat(process.env.OIL_PRICE_SHIELD) || 9.0,
  // State/agency aggregate-base specification — override for non-VDOT markets.
  stoneBaseSpec:
    process.env.STONE_BASE_SPEC || 'VDOT Section 315',
  caseStudies:
    process.env.CASE_STUDIES ||
    '$2.2M KFC Big Chicken Remodel and Taco Bell contracts',
};

// ─── Anthropic System Prompt (uses config so it is tenant-agnostic) ──────────
function buildSystemPrompt() {
  return `You are an elite commercial estimating AI for ${config.companyName}.

Your job is to generate authoritative, enterprise-grade asphalt paving proposals.

PRICING STANDARDS (non-negotiable floors):
- Asphalt: $${config.asphaltPricePerTon}/ton (±$${config.oilPriceShield}/ton oil-price buffer applied automatically)
- Structural Stone Base: $${config.stonePricePerTon}/ton (${config.stoneBaseSpec} aggregate spec)
- Minimum compaction: 96% Marshall Unit Weight density

PROPOSAL RULES:
1. Always specify a ${config.stoneBaseSpec}-grade structural stone base (minimum 6 inches for commercial).
2. Always cite 96% Marshall Unit Weight compaction — never negotiate below this.
3. Apply the ±$${config.oilPriceShield}/ton oil-price shield and call it out explicitly so the client understands margin protection.
4. Reference relevant past performance: ${config.caseStudies}.
5. For cold-climate / frost-heave markets (e.g. Illinois / Chicago), enforce a minimum 3-inch asphalt surface with 8-inch stone base. Adjust per local climate as needed.
6. End every proposal with a professional close from ${config.companyName}.

OUTPUT FORMAT:
Return a JSON object with these fields:
{
  "companyName": "${config.companyName}",
  "address": "<project address>",
  "sqft": <numeric square footage>,
  "totalPrice": <numeric total USD>,
  "proposalText": "<full markdown proposal>",
  "specSummary": {
    "asphaltDepth": "<depth in inches>",
    "stoneBaseDepth": "<depth in inches>",
    "compaction": "96% Marshall Unit Weight",
    "oilShield": "$${config.oilPriceShield}/ton"
  }
}`;
}

// ─── CRM Webhook Helper ───────────────────────────────────────────────────────
/**
 * Fires the generated lead data to an external CRM webhook if
 * process.env.CRM_WEBHOOK_URL is configured.
 *
 * Compatible with: Kickserv, HubSpot, Jobber, Salesforce, Zapier, Make.com, etc.
 * The receiving end just needs to accept a JSON POST body.
 */
async function sendToCRM(leadData) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return; // CRM integration is opt-in

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'worden-bidder',
        tenant: config.companyName,
        timestamp: new Date().toISOString(),
        lead: leadData,
      }),
    });

    if (!response.ok) {
      console.error(
        `[worden-bidder] CRM webhook returned ${response.status}: ${await response.text()}`
      );
    }
  } catch (err) {
    // Non-fatal — log but do not surface CRM errors to the end user
    console.error('[worden-bidder] CRM webhook error:', err.message);
  }
}

// ─── Netlify Function Handler ─────────────────────────────────────────────────
exports.handler = async function (event) {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' }),
    };
  }

  // Validate API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured.' }),
    };
  }

  // Parse request body
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body.' }),
    };
  }

  const { address, sqft, jobType } = body;

  if (!address || !sqft) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'address and sqft are required.' }),
    };
  }

  // Build user prompt
  const userPrompt = `Generate an enterprise asphalt paving proposal for the following project:
- Address: ${address}
- Square Footage: ${sqft} sq ft
- Job Type: ${jobType || 'Commercial Paving'}

Apply all ${config.companyName} standard specifications. Return valid JSON only — no markdown fences.`;

  // Call Anthropic Claude API
  let proposal;
  try {
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: buildSystemPrompt(),
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error('[worden-bidder] Anthropic API error:', errorText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Upstream AI service error.', detail: errorText }),
      };
    }

    const anthropicData = await anthropicResponse.json();
    const rawContent = anthropicData.content?.[0]?.text || '{}';

    // Parse the JSON proposal returned by the model
    try {
      proposal = JSON.parse(rawContent);
    } catch {
      // If the model returned non-JSON, wrap it gracefully
      proposal = {
        companyName: config.companyName,
        address,
        sqft: Number(sqft),
        totalPrice: null,
        proposalText: rawContent,
        specSummary: null,
      };
    }
  } catch (err) {
    console.error('[worden-bidder] Fetch error calling Anthropic:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to contact AI service.', detail: err.message }),
    };
  }

  // Fire CRM webhook without awaiting — best-effort, non-blocking.
  // Errors are caught and logged inside sendToCRM; they never affect the response.
  sendToCRM({
    address: proposal.address || address,
    sqft: proposal.sqft || sqft,
    totalPrice: proposal.totalPrice,
    jobType: jobType || 'Commercial Paving',
    proposalText: proposal.proposalText,
  });

  // Return the generated proposal to the caller
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proposal),
  };
};
