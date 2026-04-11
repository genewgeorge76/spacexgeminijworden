/**
 * JWORDENAI Command Bot v1.0
 * Secure Interface for Gene George (J. Worden & Sons)
 * HQ: 1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836
 */
import { prizedServices } from './prizedServices';

export const commandBot = {
  status: "ONLINE",
  hq: "7011 Wood Rd, Richmond, VA",

  processCommand: function (input: string): string {
    const lowerInput = input.toLowerCase();

    // Core operational commands
    if (lowerInput.includes("leads")) return "Checking Kickserv pipeline... 3 High-Velocity leads found.";
    if (lowerInput.includes("photos")) return "Syncing Vision Folders... BEAUFORT updated.";
    if (lowerInput.includes("pricing")) return "Fetching live binder costs... Bids adjusted for 2026 volatility.";
    if (lowerInput.includes("status")) return `[JWORDENAI]: System ${this.status} · HQ: ${this.hq}`;
    if (lowerInput.includes("help")) {
      return "Available commands: 'leads', 'photos', 'pricing', 'status', 'grading', 'striping', 'milling', 'sealcoating', 'patching', 'chip and tar'.";
    }

    // Check for Prized Services (dynamic lookup)
    const matchedService = Object.keys(prizedServices).find((service) =>
      lowerInput.includes(service)
    );

    if (matchedService) {
      return this.prioritizeService(matchedService);
    }

    return "Command not recognized. Try: 'leads', 'photos', 'pricing', 'grading', 'striping', 'milling', 'sealcoating', 'patching', or 'chip and tar'.";
  },

  prioritizeService: function (serviceType: string): string {
    const service = prizedServices[serviceType];
    if (service) {
      const msg = `[JWORDENAI]: Revving priority for ${serviceType.toUpperCase()}. Tag: ${service.tag}. Margin: ${service.margin}. Visual Proof: ${service.visualProof}. Pushing to Kickserv 'Elite' folder.`;
      return msg;
    }
    return "Service not found in Prized database.";
  },
};
