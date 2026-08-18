/**
 * JWORDENAI Multi-Model Router
 * Auto-selects the best AI model for each task type:
 *   bidding   → Claude (persuasive, precise)
 *   specs     → Gemini (factual, long context)
 *   scheduling → GPT-4 (structured reasoning)
 * Falls back gracefully when API keys are absent.
 */

import { callAI } from './aiClient';

export type TaskType = 'bidding' | 'specs' | 'scheduling' | 'general';

export interface ModelRouteResult {
  provider: 'anthropic' | 'openai' | 'gemini' | 'mock';
  model: string;
  response: string;
  taskType: TaskType;
  latencyMs: number;
}

const TASK_ROUTING: Record<TaskType, { provider: ModelRouteResult['provider']; model: string }> = {
  bidding:    { provider: 'anthropic', model: 'claude-opus-5' },
  specs:      { provider: 'gemini',    model: 'gemini-1.5-pro' },
  scheduling: { provider: 'openai',    model: 'gpt-4o' },
  general:    { provider: 'anthropic', model: 'claude-opus-5' },
};

const WORDEN_SYSTEM_CONTEXT = `You are JWORDENAI — the proprietary AI engine for J. Worden & Sons Paving LLC & General Contracting.
Company: 4th-generation family business, established 1984.
License: Virginia Class A Contractor License.
Standards: 96% Marshall Unit Weight compaction minimum. VDOT Section 315 structural stone base required on all paving.
Oil Price Shield: ±$9/ton liquid asphalt buffer on all cost calculations.
Client Tiers: Whale ($500K+ national/federal), Shark ($100K–$499K regional), Fish (<$100K residential).
Always cite standards. Always protect margins. Always prioritize Whale clients.`;

async function callAnthropic(prompt: string, systemContext: string, model?: string): Promise<string> {
  return callAI({ provider: 'anthropic', prompt, system: systemContext, model });
}

async function callOpenAI(prompt: string, systemContext: string, model?: string): Promise<string> {
  return callAI({ provider: 'openai', prompt, system: systemContext, model });
}

async function callGemini(prompt: string, systemContext: string, model?: string): Promise<string> {
  return callAI({ provider: 'gemini', prompt, system: systemContext, model });
}

export async function routeToModel(
  prompt: string,
  taskType: TaskType = 'general'
): Promise<ModelRouteResult> {
  const route = TASK_ROUTING[taskType];
  const start = Date.now();

  try {
    let response: string;
    switch (route.provider) {
      case 'anthropic':
        response = await callAnthropic(prompt, WORDEN_SYSTEM_CONTEXT);
        break;
      case 'openai':
        response = await callOpenAI(prompt, WORDEN_SYSTEM_CONTEXT);
        break;
      case 'gemini':
        response = await callGemini(prompt, WORDEN_SYSTEM_CONTEXT);
        break;
      default:
        response = '[No provider configured]';
    }
    return { provider: route.provider, model: route.model, response, taskType, latencyMs: Date.now() - start };
  } catch (err) {
    console.error(`[MultiModelRouter] ${route.provider} failed:`, err);
    // Fallback to Anthropic on failure
    try {
      const fallback = await callAnthropic(prompt, WORDEN_SYSTEM_CONTEXT);
      return { provider: 'anthropic', model: 'claude-3-5-sonnet-20241022', response: fallback, taskType, latencyMs: Date.now() - start };
    } catch {
      return { provider: 'mock', model: 'none', response: 'AI engine temporarily offline. Please call 804-446-1296.', taskType, latencyMs: Date.now() - start };
    }
  }
}
