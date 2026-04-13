import legacyData from '../data/legacyPortfolio.json';
import { sovereignElite } from '../logic/sovereignElite';
import { coastalEmpire } from '../utils/coastalLogic';

export class JWordenAI {
  static async generateAutonomousBid(targetAddress: string, estimatedSqFt: number) {
    const basePricePerSqFt = 2.50;
    const zonePremium = coastalEmpire.calculateZonePremium("Fredericksburg");
    const totalEstimate = estimatedSqFt * basePricePerSqFt * zonePremium;

    const systemPrompt = `
      Heritage: ${legacyData.heritage}
      Legal Authority: ${sovereignElite.legal.clauses.join(', ')}
      Target: ${targetAddress} | Minimum Paving Value: $${totalEstimate}.
      
      CORE DIRECTIVES:
      1. You are the Apex Estimator for J. Worden Sovereign Holdings.
      2. We offer TOTAL SITE CONTROL for QSRs (KFC, Taco Bell).
      3. Your capabilities include: 90-Day Turnkey Builds, High-Margin Earth/Gravel Grading, Concrete Foundations, TPO Roofing, HVAC RTU Lifting, and Commercial Snow/Ice Management.
      4. Always demand a 50% Stripe deposit to lock a confirmed start date. Zero exceptions.
      
      Draft the supreme executive summary pitching our Multi-Trade Syndicate capability. CRITICAL: You MUST include the Grandfather Guardrail clause: "Estimate assumes standard soil compaction. Rock excavation, limestone trenching, or unstable sub-grade remediation will be billed as an immediate Change Order at $350/hour."
    `;

    try {
      const response = await fetch('/.netlify/functions/swarm-intelligence', {
        method: 'POST',
        body: JSON.stringify({ targetAddress, estimatedSqFt, systemPrompt })
      });
      
      const data = await response.json();
      return { totalEstimate, aiProposal: data.aiProposal };
    } catch (error) {
      console.error("Enclave Comms Failure:", error);
      return null;
    }
  }
}
