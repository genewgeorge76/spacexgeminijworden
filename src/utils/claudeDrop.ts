/**
 * JWORDENAI "Claude Drop" Engine (50-State National Operation)
 * Objective: Convert raw CFO Math & Satellite Data into elite Commercial Proposals and Kickserv JSON payloads.
 */

export const claudeDropEngine = {
  model: "claude-3-opus",
  binderIndex: 627.50,

  // Dynamic DOT Compliance for 50-State Operation
  getDOTCompliance: function(state: string) {
    const dotMap: Record<string, string> = {
      "VA": "VDOT Section 211",
      "NC": "NCDOT Standard Specifications",
      "SC": "SCDOT Standard Specifications",
      "GA": "GDOT Standard Specifications",
      "FL": "FDOT Standard Specifications",
      "TX": "TxDOT Standard Specifications",
    };
    return dotMap[state.toUpperCase()] || `${state.toUpperCase()} DOT Standard Specifications`;
  },

  calculateMathCore: function(sqft: number, depthInches: number, type: 'RESIDENTIAL' | 'INDUSTRIAL') {
    const density = type === 'INDUSTRIAL' ? 148 : 145;
    // GEMINI.md Formula: T = (sqft / 9 * depth_inches * density) / 24000
    const tonnage = (sqft / 9 * depthInches * density) / 24000;
    const machineHealthSurcharge = tonnage * 0.08;

    // Calculate a base cost (mock logic for bid total generation)
    const baseCost = (tonnage * 85) + (sqft * 1.50) + this.binderIndex + machineHealthSurcharge;
    // 35% net margin target (Floor)
    const finalBidTotal = baseCost / 0.65;

    return {
      tonnage: Number(tonnage.toFixed(2)),
      machineHealthSurcharge: Number(machineHealthSurcharge.toFixed(2)),
      finalBidTotal: Number(finalBidTotal.toFixed(2)),
      density,
    };
  },

  generateKickservPayload: function(projectId: string, state: string, sqft: number, depthInches: number, type: 'RESIDENTIAL' | 'INDUSTRIAL') {
    const math = this.calculateMathCore(sqft, depthInches, type);
    const isWhale = sqft > 20000;
    const dotStandard = this.getDOTCompliance(state);

    const payload = {
      "project_id": projectId,
      "client_priority": isWhale ? "Prized-Lead | HIGH-PRIORITY | WHALE-PRIORITY" : "Standard",
      "sq_ft": sqft,
      "tons_required": math.tonnage,
      "binder_index_applied": this.binderIndex,
      "grading_hours": Math.ceil(sqft / 5000) * 2,
      "striping_linear_ft": type === 'INDUSTRIAL' ? Math.ceil(sqft * 0.05) : 0,
      "net_margin_target": "35%",
      "machine_health_surcharge": math.machineHealthSurcharge,
      "vdot_section_211_flag": `VERIFY — 2026 ${dotStandard} mix design required`,
      "emergency_threshold_flag": isWhale ? "⚠ EXCEEDS 20,000 SQ FT — INDUSTRIAL VOLUME — FLAG FOR GENE GEORGE PERSONAL REVIEW" : "Standard",
      "mix_type": `${type} — ${math.density} lbs/sq yd/in`,
      "final_bid_total": math.finalBidTotal,
    };

    return payload;
  },

  generateClaudePrompt: function(payload: { sq_ft: number; tons_required: number; vdot_section_211_flag: string; final_bid_total: number }, address: string) {
    return `
You are the elite Chief Estimator for J. Worden & Sons Paving (Est. 1984) — a National 50-State Paving Operation.
Write a highly persuasive, legally sound commercial paving proposal for ${address}.

PROJECT DATA:
- Total Sq Ft: ${payload.sq_ft}
- Required Tonnage: ${payload.tons_required} tons
- Specifications: ${payload.vdot_section_211_flag}
- Total Price: $${payload.final_bid_total.toLocaleString()}

INSTRUCTIONS:
1. Write a professional executive cover letter.
2. Detail the scope of work (Grading, Paving, Striping).
3. Highlight our 90-Day Fast Track timeline and 30-year operational history.
4. Include a clear breakdown of the investment, justifying the premium pricing due to superior DOT-grade asphalt and exact binder indexes.
    `.trim();
  },
};
