import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { handler } from '../../netlify/functions/kickserv-lead.js';

/**
 * Unit cover for the lead intake function. The rule under test throughout:
 * it may only answer 200 when a sink actually stored the lead.
 */

const VALID_LEAD = {
  firstName: 'Dana',
  phone: '804-555-0100',
  jobDescription: 'Parking lot overlay, 9,000 sqft.',
};

const post = (body, headers = {}) =>
  handler({ httpMethod: 'POST', headers, body: JSON.stringify(body) });

let realFetch;
const calls = [];

/** Stub global fetch; `plan` maps a URL substring to the status to answer. */
function stubFetch(plan) {
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    const match = Object.entries(plan).find(([fragment]) => String(url).includes(fragment));
    const status = match ? match[1] : 500;
    if (status === 'throw') throw new Error('network down');
    return { ok: status < 400, status };
  };
}

describe('kickserv-lead', () => {
  beforeEach(() => {
    realFetch = globalThis.fetch;
    calls.length = 0;
    process.env.URL = 'https://example.test';
    delete process.env.LEADS_API_URL;
    delete process.env.VITE_LEADS_API_URL;
    delete process.env.KICKSERV_WEBHOOK_URL;
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  test('rejects anything but POST', async () => {
    const res = await handler({ httpMethod: 'GET', headers: {}, body: null });
    assert.equal(res.statusCode, 405);
  });

  test('requires a name and a phone number', async () => {
    stubFetch({ '__forms.html': 200 });
    const res = await post({ firstName: 'Dana' });
    assert.equal(res.statusCode, 400);
    assert.equal(calls.length, 0, 'must not call a sink with an unusable lead');
  });

  test('answers the canary without creating a lead', async () => {
    stubFetch({ '__forms.html': 200 });
    const res = await handler({
      httpMethod: 'POST',
      headers: { 'x-worden-canary': '1' },
      body: '{}',
    });
    const body = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.equal(body.ok, true);
    assert.equal(body.canary, true);
    assert.equal(calls.length, 0, 'the canary must not write anything');
  });

  test('posts to /__forms.html, never to "/"', async () => {
    stubFetch({ '__forms.html': 200 });
    const res = await post(VALID_LEAD);

    assert.equal(res.statusCode, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://example.test/__forms.html');
    assert.match(calls[0].init.body, /form-name=lead-intake/);
    assert.match(calls[0].init.body, /Dana/);
  });

  test('fans out to every configured sink', async () => {
    process.env.LEADS_API_URL = 'https://ops.test/api/v1/leads/website';
    process.env.KICKSERV_WEBHOOK_URL = 'https://crm.test/hook';
    stubFetch({ '__forms.html': 200, 'ops.test': 200, 'crm.test': 200 });

    const body = JSON.parse((await post(VALID_LEAD)).body);

    assert.deepEqual(body.delivered.sort(), ['crm-webhook', 'leads-api', 'netlify-forms']);
    assert.equal(calls.length, 3);
  });

  test('still succeeds when only one sink accepts', async () => {
    process.env.LEADS_API_URL = 'https://ops.test/api/v1/leads/website';
    stubFetch({ '__forms.html': 200, 'ops.test': 503 });

    const res = await post(VALID_LEAD);
    const body = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(body.delivered, ['netlify-forms']);
    assert.equal(body.failed[0].sink, 'leads-api');
  });

  test('returns 502 — never a false success — when every sink fails', async () => {
    process.env.LEADS_API_URL = 'https://ops.test/api/v1/leads/website';
    stubFetch({ '__forms.html': 500, 'ops.test': 'throw' });

    const res = await post(VALID_LEAD);
    const body = JSON.parse(res.body);

    assert.equal(res.statusCode, 502);
    assert.equal(body.ok, false);
    assert.match(body.error, /804-446-1296/);
    assert.equal(body.failed.length, 2);
  });

  test('drops honeypot submissions without calling a sink', async () => {
    stubFetch({ '__forms.html': 200 });
    const res = await post({ ...VALID_LEAD, 'bot-field': 'spam' });

    assert.equal(res.statusCode, 200);
    assert.equal(calls.length, 0);
  });
});
