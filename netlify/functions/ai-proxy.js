/**
 * Server-side AI proxy.
 *
 * WHY THIS EXISTS
 *
 * src/ai/JWordenAIEngine.ts and src/ai/MultiModelRouter.ts used to construct
 * provider SDK clients in the browser with `dangerouslyAllowBrowser: true`,
 * reading VITE_ANTHROPIC_API_KEY / VITE_OPENAI_API_KEY / VITE_GEMINI_API_KEY.
 * Vite inlines every VITE_* variable into the shipped bundle as a plain
 * string, so those keys were readable by anyone who opened devtools, and
 * spendable against the account by anyone who copied them. The SDK's own flag
 * name says as much — it is spelled "dangerously" because in a browser there
 * is nowhere to hide a secret.
 *
 * The keys now live only in the function environment. The browser calls this
 * endpoint; this endpoint calls the provider. Nothing secret crosses the wire
 * to the client.
 */

const PROVIDERS = {
  anthropic: { env: 'ANTHROPIC_API_KEY', model: 'claude-opus-5' },
  openai:    { env: 'OPENAI_API_KEY',    model: 'gpt-4o' },
  gemini:    { env: 'GEMINI_API_KEY',    model: 'gemini-1.5-pro' },
};

const MAX_PROMPT_CHARS = 12000;

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'POST only' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { provider = 'anthropic', prompt, system, model, max_tokens = 1000, temperature } = body;
  const cfg = PROVIDERS[provider];
  if (!cfg) return { statusCode: 400, body: JSON.stringify({ error: 'Unknown provider' }) };
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'prompt is required' }) };
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    return { statusCode: 413, body: JSON.stringify({ error: 'prompt too long' }) };
  }

  const key = process.env[cfg.env];
  // Fail closed and log loudly: "not configured" and "rejected by the provider"
  // look identical from the client, and only one of them is worth retrying.
  if (!key) {
    console.error(`${cfg.env} is not set`);
    return { statusCode: 503, body: JSON.stringify({ error: `${provider} is not configured` }) };
  }

  try {
    const text = await call(provider, key, model || cfg.model, prompt, system, max_tokens, temperature);
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ provider, model: model || cfg.model, response: text }),
    };
  } catch (err) {
    // Upstream errors can name the account, the model and the billing state,
    // so they go to the log and never to the caller.
    console.error(`${provider} call failed:`, err && err.message);
    return { statusCode: 502, body: JSON.stringify({ error: 'Upstream AI request failed' }) };
  }
}

async function call(provider, key, model, prompt, system, maxTokens, temperature) {
  if (provider === 'anthropic') {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model, max_tokens: maxTokens,
        ...(system ? { system } : {}),
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!r.ok) throw new Error(`anthropic ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const d = await r.json();
    return (d.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
  }

  if (provider === 'openai') {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model, max_tokens: maxTokens,
        ...(temperature != null ? { temperature } : {}),
        messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: prompt }],
      }),
    });
    if (!r.ok) throw new Error(`openai ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const d = await r.json();
    return d.choices?.[0]?.message?.content || '';
  }

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: (system ? system + '\n\n' : '') + prompt }] }],
        generationConfig: { maxOutputTokens: maxTokens },
      }),
    }
  );
  if (!r.ok) throw new Error(`gemini ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const d = await r.json();
  return d.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
}
