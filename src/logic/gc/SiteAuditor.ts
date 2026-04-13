export class SiteAuditor {
  static runGeotechAudit(location: string, trades: string[]) {
    const risks: string[] = [];
    let riskLevel = "LOW";
    let requiredContingency = 0;

    if (location.includes("Houston") || location.includes("Coastal")) {
      risks.push("⚠️ GEO-HAZARD: High Water Table detected. Mandating undercut & Geogrid stabilization.");
      requiredContingency += 45000;
      riskLevel = "HIGH";
    }

    if (location.includes("Austin") || location.includes("Hill Country")) {
      risks.push("⚠️ GEO-HAZARD: Limestone Bedrock. Excavation requires heavy rock-breakers.");
      requiredContingency += 65000;
      riskLevel = "CRITICAL";
    }

    if (trades.some((t) => t.includes("Concrete"))) {
      risks.push("⚠️ SUPPLY-CHAIN: Local 4000-PSI concrete allocation is tight. Add 14-day schedule buffer.");
    }

    return {
      riskLevel,
      alerts: risks.length > 0 ? risks : ["✅ SITE CLEAR: Standard Soil Compaction Expected."],
      contingencyCost: requiredContingency
    };
  }
}
