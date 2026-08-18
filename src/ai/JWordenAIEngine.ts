import legacyData from '../data/legacyPortfolio.json';
import { sovereignElite } from '../logic/sovereignElite';
import { coastalEmpire } from '../utils/coastalLogic';
import { callAI } from './aiClient';

function resolveHeritageSummary(): string {
  const heritage = legacyData.heritage as unknown;
  if (typeof heritage === 'string') return heritage;
  if (heritage && typeof heritage === 'object' && 'summary' in heritage) {
    const summary = (heritage as { summary?: unknown }).summary;
    return typeof summary === 'string' ? summary : 'Legacy heritage profile available.';
  }
  return 'Legacy heritage profile available.';
}

export class JWordenAI {
  static async generateAutonomousBid(targetAddress: string, estimatedSqFt: number) {
    const basePricePerSqFt = 2.5;
    const zonePremium = coastalEmpire.calculateZonePremium('Fredericksburg');
    const totalEstimate = estimatedSqFt * basePricePerSqFt * zonePremium;

    const systemPrompt = `
      You are JWordenAI, the autonomous bidding engine for J. Worden & Sons.
      Heritage: ${resolveHeritageSummary()}
      Legal Authority: ${sovereignElite.legal.clauses.join(', ')}
      VDOT Specs: ${coastalEmpire.vdotSpecs.mix} at ${coastalEmpire.vdotSpecs.temp}.
      Generate a hyper-persuasive executive summary for a paving contract at ${targetAddress} for $${totalEstimate}. Demand a 10% Stripe deposit.
    `;

    try {
      // Runs through /.netlify/functions/ai-proxy rather than the Anthropic SDK.
      // The SDK path needed dangerouslyAllowBrowser and VITE_ANTHROPIC_API_KEY,
      // which Vite inlines into the shipped bundle — the key was readable by
      // anyone who opened devtools. The proxy keeps it server-side.
      const aiProposal = await callAI({
        provider: 'anthropic',
        system: 'You are the apex AI estimator for an elite national paving syndicate.',
        prompt: systemPrompt,
        maxTokens: 1000,
        temperature: 0.2,
      });

      return { totalEstimate, aiProposal };
    } catch (error) {
      console.error('AI Engine Failure:', error);
      return null;
    }
  }
}
