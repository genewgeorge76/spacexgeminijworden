/**
 * Browser-side entry point for every AI call.
 *
 * There is deliberately no API key in this file and no provider SDK. Keys live
 * in the Netlify function environment; the browser only ever talks to our own
 * endpoint. Anything that reads a VITE_*_API_KEY and constructs a provider
 * client in the browser is shipping that key to every visitor.
 */

export type AIProvider = 'anthropic' | 'openai' | 'gemini';

export interface CallAIOptions {
  provider?: AIProvider;
  prompt: string;
  system?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

const ENDPOINT = '/.netlify/functions/ai-proxy';

export async function callAI(opts: CallAIOptions): Promise<string> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      provider: opts.provider ?? 'anthropic',
      prompt: opts.prompt,
      system: opts.system,
      model: opts.model,
      max_tokens: opts.maxTokens ?? 1000,
      temperature: opts.temperature,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `AI request failed (${res.status})`);
  return data.response ?? '';
}
