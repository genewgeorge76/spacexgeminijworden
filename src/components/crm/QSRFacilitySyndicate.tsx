import React, { useState } from 'react';

export const QSRFacilitySyndicate = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeAudit, setActiveAudit] = useState<string | null>(null);

  const franchiseTargets = [
    {
      id: "KFC-90DAY",
      franchise: "KFC / KBP Foods",
      type: "90-Day Turnkey QSR Build",
      location: "Austin, TX (High-Volume Sunbelt)",
      needs: ["Earth & Gravel Grading", "Concrete Foundations", "96% Marshall Paving", "TPO Flat Roof", "HVAC RTU Lifting"],
      status: "PERMIT FILED - HOT SPOT",
      value: "$1,245,000",
      riskLevel: "HIGH",
      auditNotes: "AWAITING SOIL BORING DATA. POTENTIAL LIMESTONE BEDROCK DETECTED IN AUSTIN CORRIDOR."
    },
    {
      id: "FLYNN-WINTER",
      franchise: "Taco Bell / Flynn Group",
      type: "Annual Winter & Lifecycle",
      location: "Fairfax, VA",
      needs: ["Snow & Ice Management", "Asphalt Mill & Overlay", "Roof Membrane Coating"],
      status: "MAINTENANCE DUE",
      value: "$285,000",
      riskLevel: "LOW",
      auditNotes: "STANDARD MILL & FILL. NO SUB-GRADE EXCAVATION REQUIRED."
    },
    {
      id: "INDUSTRIAL-DIRT",
      franchise: "Prologis Logistics",
      type: "Heavy Civil Earthwork",
      location: "Houston, TX (Industrial Corridor)",
      needs: ["High-Margin Gravel Grading", "Sub-Base Compaction", "Stormwater Drainage"],
      status: "GEO-FENCED",
      value: "$442,000",
      riskLevel: "CRITICAL",
      auditNotes: "COASTAL FLOOD PLAIN. HIGH PROBABILITY OF SOIL FAILURE. REQUIRE GEOGRID & 3X CRUSHER RUN IMPORT."
    }
  ];

  const deployAdStrike = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 2000);
  };

  const runRiskAudit = (id: string) => {
    setActiveAudit(id);
    setTimeout(() => setActiveAudit(null), 3000); // Simulate 3 second AI geological audit
  };

  return (
    <div className="bg-[#050505] p-6 rounded-xl border border-[#d4af37]/30 shadow-[0_0_20px_rgba(212,175,55,0.1)] mt-8 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 opacity-5 text-9xl">🏗️</div>

      <div className="flex justify-between items-center border-b border-[#d4af37]/20 pb-4 mb-6 relative z-10">
        <div>
          <h3 className="text-[#d4af37] font-black uppercase tracking-[0.2em] text-xl">Total Site Control: QSR & Civil Syndicate</h3>
          <p className="text-[#00ff41] text-xs font-mono mt-1 font-bold animate-pulse">90-DAY TURNKEY BUILDS // EARTHWORK // HVAC // SNOW OPS ACTIVE</p>
        </div>
        <button
          onClick={deployAdStrike}
          disabled={isDeploying}
          className={`px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all border ${
            isDeploying
              ? 'bg-[#00ff41] text-black border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.5)]'
              : 'bg-[#1f1f23] text-[#d4af37] border-[#d4af37]/50 hover:bg-[#d4af37] hover:text-black'
          }`}
        >
          {isDeploying ? 'INITIATING GEO-FENCE ADS...' : 'DEPLOY PROGRAMMATIC AD-STRIKE'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {franchiseTargets.map(target => (
          <div key={target.id} className={`p-5 rounded-lg border transition-all group ${activeAudit === target.id ? 'bg-[#d4af37]/10 border-[#d4af37] animate-pulse' : 'bg-glass border-white/10 hover:border-[#d4af37]/50'}`}>
            <div className="flex justify-between items-start mb-3">
              <span className="text-white font-black uppercase tracking-wider">{target.franchise}</span>
              <span className="text-[#00ff41] font-mono text-[10px] animate-pulse">{target.status}</span>
            </div>

            <div className="text-gray-400 text-xs mb-3">{target.location}</div>

            <div className="bg-[#1f1f23] rounded p-3 mb-4 border border-white/5">
              <div className="text-[10px] text-gray-500 font-mono mb-2">IDENTIFIED SCOPE: {target.type}</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {target.needs.map((need, idx) => (
                  <span key={idx} className="bg-black border border-[#d4af37]/30 text-[#d4af37] text-[9px] px-2 py-1 rounded tracking-wider uppercase">
                    {need}
                  </span>
                ))}
              </div>

              {/* The Sovereign Auditor Block */}
              <div className={`mt-3 p-2 rounded border text-[9px] font-mono ${
                target.riskLevel === 'CRITICAL' ? 'bg-red-900/20 border-red-500/50 text-red-400' :
                target.riskLevel === 'HIGH' ? 'bg-yellow-900/20 border-yellow-500/50 text-yellow-400' :
                'bg-green-900/20 border-green-500/50 text-green-400'
              }`}>
                <div className="font-bold mb-1">SOVEREIGN AUDITOR: {target.riskLevel} RISK</div>
                <div>{target.auditNotes}</div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-3">
              <div className="text-[10px] font-mono text-gray-500">TOTAL ENVELOPE VALUE</div>
              <div className="text-white font-bold">{target.value}</div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => runRiskAudit(target.id)}
                className="flex-1 bg-[#1f1f23] border border-white/10 hover:border-red-500 text-gray-400 hover:text-red-400 text-[10px] uppercase tracking-widest py-2 transition-all"
              >
                {activeAudit === target.id ? 'AUDITING...' : 'RUN SOIL/RISK AUDIT'}
              </button>
              <button className="flex-1 bg-black border border-[#d4af37]/50 hover:bg-[#d4af37] text-[#d4af37] hover:text-black font-bold text-[10px] uppercase tracking-widest py-2 transition-all">
                DRAFT CONTRACT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
