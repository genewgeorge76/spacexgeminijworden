export const TreasuryLogic = {
  capitalReserves: {
    currentHoldingsFund: 185000, // Cash currently swept into the real estate fund
    pavingSweepPercentage: 0.15, // 15% of all paving profit automatically goes here
  },

  acquisitionTargets: {
    industrialLand: { targetDownPayment: 250000, targetIRR: 0.12 },
    distressedRetail: { targetDownPayment: 150000, targetIRR: 0.15 },
    asphaltPlantBuyout: { targetDownPayment: 800000, targetIRR: 0.20 },
  },

  /**
   * THE SLOW FEED ROUTER: Simulates sweeping paving profit into the Holding fund.
   */
  sweepPavingProfit: (pavingJobProfit: number) => {
    const sweepAmount = pavingJobProfit * TreasuryLogic.capitalReserves.pavingSweepPercentage;
    return {
      sweptAmount: sweepAmount,
      message: `SWEEP EXECUTED: $${sweepAmount.toLocaleString()} routed to Sovereign Real Estate Fund.`
    };
  },

  calculateFundingProgress: (downPaymentTarget: number) => {
    const progress = (TreasuryLogic.capitalReserves.currentHoldingsFund / downPaymentTarget) * 100;
    return Math.min(progress, 100).toFixed(1); // Caps at 100%
  }
};
