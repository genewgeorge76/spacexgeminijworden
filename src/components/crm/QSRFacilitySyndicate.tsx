import React, { useState } from 'react';

export const QSRFacilitySyndicate = () => {
  const [isDeploying, setIsDeploying] = useState(false);

  const franchiseTargets = [
    { 
      id: "KFC-90DAY", 
      franchise: "KFC / KBP Foods", 
      type: "90-Day Turnkey QSR Build", 
      location: "Richmond, VA (I-95 Corridor)", 
      needs: ["Earth & Gravel Grading", "Concrete Foundations", "96% Marshall Paving", "TPO Flat Roof", "HVAC RTU Lifting"],
      status: "PERMIT FILED - HOT SPOT",
      value: "$1,245,000"
    },
    { 
      id: "FLYNN-WINTER", 
      franchise: "Taco Bell / Flynn Group", 
      type: "Annual Winter & Lifecycle", 
      location: "Fairfax, VA", 
      needs: ["Snow & Ice Management", "Asphalt Mill & Overlay", "Roof Membrane Coating"],
      status: "MAINTENANCE DUE",
      value: "$285,000"
    },
    { 
      id: "INDUSTRIAL-DIRT", 
      franchise: "Prologis Logistics", 
      type: "Heavy Civil Earthwork", 
      location: "Stafford, VA", 
      needs: ["High-Margin Gravel Grading", "Sub-Base Compaction", "Stormwater Drainage"],
      status: "GEO-FENCED",
      value: "$442,000"
    }
  ];

  const deployAdStrike = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 2000);
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
          <div key={target.id} className="bg-glass p-5 rounded-lg border border-white/10 hover:border-[#d4af37]/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <span className="text-white font-black uppercase tracking-wider">{target.franchise}</span>
              <span className="text-[#00ff41] font-mono text-[10px] animate-pulse">{target.status}</span>
            </div>

            <div className="text-gray-400 text-xs mb-3">{target.location}</div>

            <div className="bg-[#1f1f23] rounded p-3 mb-4 border border-white/5">
              <div className="text-[10px] text-gray-500 font-mono mb-2">IDENTIFIED SCOPE: {target.type}</div>
              <div className="flex flex-wrap gap-2">
                {target.needs.map((need, idx) => (
                  <span key={idx} className="bg-black border border-[#d4af37]/30 text-[#d4af37] text-[9px] px-2 py-1 rounded tracking-wider uppercase">
                    {need}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-3">
              <div className="text-[10px] font-mono text-gray-500">TOTAL ENVELOPE VALUE</div>
              <div className="text-white font-bold">{target.value}</div>
            </div>

            <button className="w-full mt-4 bg-black border border-white/10 group-hover:border-[#d4af37] text-gray-400 group-hover:text-white text-[10px] uppercase tracking-widest py-2 transition-all">
              GENERATE MULTI-TRADE PROPOSAL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
