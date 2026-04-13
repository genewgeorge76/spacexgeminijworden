import legacyData from '../data/legacyPortfolio.json';
import { sovereignElite } from '../logic/sovereignElite';
import { coastalEmpire } from '../utils/coastalLogic';

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
    const zonePremium = coastalEmpire.injectLocalSignals('VA') ? 1.1 : 1;
    const totalEstimate = estimatedSqFt * basePricePerSqFt * zonePremium;

    const systemPrompt = `
      Heritage: ${resolveHeritageSummary()}
      Legal Authority: ${sovereignElite.legal.clauses.join(', ')}
      Target: ${targetAddress} | Total Cost: $${totalEstimate}.
      Draft the supreme executive summary.
    `;

    try {
      const response = await fetch('/.netlify/functions/swarm-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetAddress, estimatedSqFt, systemPrompt }),
      });

      if (!response.ok) {
        throw new Error(`Enclave request failed (${response.status})`);
      }

      const data = await response.json();
      return { totalEstimate, aiProposal: data.aiProposal };
    } catch (error) {
      console.error('Enclave Comms Failure:', error);
      return null;
    }
  }
}
