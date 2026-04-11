/**
 * JWORDENAI Labor & Subcontractor Treasury Engine
 * Objective: Real-time OT Burn Tracking & Automated 1099 Payouts
 */
export const payrollTreasury = {
  // Flag crews about to hit Overtime
  monitorOTBurnRate: function(crewId: string, currentHours: number) {
    if (currentHours >= 38) {
      return `[MARGIN ALERT]: Crew ${crewId} is 2 hours from OT. Pull from site to protect 35% margin.`;
    }
    return `Crew ${crewId} hours nominal (${currentHours}h).`;
  },

  // Auto-calculate Subcontractor pay based on exact CFO math
  calculateSubPayout: function(tonsLaid: number, subRatePerTon: number) {
    const payout = tonsLaid * subRatePerTon;
    return `Generate 1099 Payout: $${payout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} for ${tonsLaid} tons.`;
  },

  // Margin Audit Lock - compare actuals to estimated
  marginAuditLock: function(estimatedBid: number, actualLaborCost: number, actualMaterialCost: number) {
      const totalActualCost = actualLaborCost + actualMaterialCost;
      const actualMargin = ((estimatedBid - totalActualCost) / estimatedBid) * 100;
      
      if (actualMargin < 35) {
          return `[CFO AUDIT REQUIRED]: Margin dropped to ${actualMargin.toFixed(2)}%. Below 35% threshold.`;
      }
      return `Margin Secured: ${actualMargin.toFixed(2)}%.`;
  }
};
