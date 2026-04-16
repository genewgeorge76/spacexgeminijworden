/**
 * Kickserv Lead Proxy — netlify/functions/kickserv-lead.js
 *
 * Forwards lead data from the contact form to the Kickserv leads API,
 * working around browser CORS restrictions by sending the request
 * server-side from this Netlify Function.
 *
 * Kickserv endpoint: https://app.kickserv.com/account/60655/leads
 * Encoding: application/x-www-form-urlencoded
 *
 * Expected JSON body from the browser:
 *   { firstName, lastName, phone, email, serviceAddress, jobDescription }
 *
 * No environment variables are required — the Kickserv endpoint is public
 * and accepts leads without an API key for this account configuration.
 */

const KICKSERV_LEADS_URL = 'https://app.kickserv.com/account/60655/leads';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body', detail: err instanceof Error ? err.message : String(err) }),
    };
  }

  const {
    firstName = '',
    lastName = '',
    phone = '',
    email = '',
    serviceAddress = '',
    jobDescription = '',
  } = payload;

  const params = new URLSearchParams({
    'customer[first_name]': firstName,
    'customer[last_name]': lastName,
    'customer[phone]': phone,
    'customer[email]': email,
    'customer[service_address]': serviceAddress,
    'job[description]': jobDescription,
    source: 'jworden_gemini_site',
  });

  try {
    const response = await fetch(KICKSERV_LEADS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: `Kickserv returned ${response.status}`,
          detail: text.slice(0, 300),
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: err.message || 'Network error reaching Kickserv' }),
    };
  }
};
