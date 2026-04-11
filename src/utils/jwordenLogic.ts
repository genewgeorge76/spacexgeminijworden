// JWORDENAI Residential Priority Logic

export interface Lead {
  zip: string;
  service: string;
  isCommercial: boolean;
}

export const residentialLogic = {
  highVelocityZips: ['21811', '23221', '23113', '23836'],
  services: {
    sealcoating: { frequencyMonths: 24, profitMargin: 'High' },
    driveway: { complexity: 'Low', turnover: 'Fast' },
  },

  // Neighborhood Density Multiplier
  calculateBatchDiscount(activeJobsInArea: number): number {
    if (activeJobsInArea > 2) return 0.90; // 10% off for "Neighborhood Batching"
    return 1.0;
  },
};

// Kickserv High-Velocity Injection
export function pushToKickserv(lead: Lead): string {
  let priority = lead.isCommercial ? 'High-Value' : 'High-Velocity';

  // Prioritize everyday residential scores for immediate cash flow
  if (residentialLogic.highVelocityZips.includes(lead.zip)) {
    priority = 'CRITICAL - LOCAL RESIDENTIAL';
  }

  console.log(`Injecting ${priority} lead into Kickserv...`, lead);
  return priority;
}
