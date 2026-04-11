/**
 * JWORDENAI Elite Command Modules
 * Features: Plant Wait Times, Cash Flow (A/R), Crew Burn Rate, Competitor Intel
 */

const QUEUE_THRESHOLD = 5;
const MAX_ACCEPTABLE_WAIT_MINUTES = 45;
const MIN_WAIT_MINUTES = 15;
const PAYMENT_TERM_DAYS = 30;
const STANDARD_WORKWEEK_HOURS = 40;
const BID_LOSS_ALERT_THRESHOLD = 3;

export const eliteCommand = {
  // 1. Asphalt Plant Wait Times & Tonnage
  checkPlantStatus: function(plantName: string, trucksInQueue: number): string {
    if (trucksInQueue > QUEUE_THRESHOLD) {
      return `WARNING: ${plantName} Plant wait time > ${MAX_ACCEPTABLE_WAIT_MINUTES} mins. REROUTE SUGGESTED.`;
    }
    return `${plantName} Plant Status: GREEN (Wait time < ${MIN_WAIT_MINUTES} mins).`;
  },

  // 2. Cash Flow Velocity & A/R Interception
  checkOverdueInvoices: function(client: string, invoiceAmount: number, daysPastDue: number): string {
    if (daysPastDue > PAYMENT_TERM_DAYS) {
      return `RED ZONE: ${client} is ${daysPastDue} days late on $${invoiceAmount}. ACTION: Generate Legal Payment Demand.`;
    }
    return `Account Current: ${client}`;
  },

  // 3. Crew Burn Rate & Geofencing (Labor Control)
  calculateOvertimeRisk: function(crewName: string, currentHours: number, estimatedCompletion: number): string {
    const projectedHours = currentHours + estimatedCompletion;
    if (projectedHours > STANDARD_WORKWEEK_HOURS) {
      return `OT ALERT: ${crewName} projected to hit ${projectedHours} hours this week. Approve OT or swap crews?`;
    }
    return `${crewName} Labor Status: NORMAL (No OT projected).`;
  },

  // 4. Competitor Intel & Bid Win/Loss Matrix
  analyzeBidLosses: function(region: string, service: string, lostCount: number, priceDifferencePct: number): string {
    if (lostCount >= BID_LOSS_ALERT_THRESHOLD) {
      return `WAR ROOM INTEL: You lost the last ${lostCount} ${service} jobs in ${region}. Competitors are undercutting base prep by ${priceDifferencePct}%. Adjust pricing algorithm?`;
    }
    return `Bid Win Rate in ${region} is nominal.`;
  }
};
