import React, { useState } from 'react';

export const QSRFacilitySyndicate = () => {
  const [isDeploying, setIsDeploying] = useState(false);

  const franchiseTargets = [
    {
      id: "KFC-NEW-182",
      franchise: "KFC / KBP Foods",
      type: "90-Day Sovereign Build (Ground-Up)",
      location: "Richmond, VA",
      needs: ["Earthworks & Gravel Grading", "Concrete Foundations", "HVAC Rooftop Lifting", "TPO Flat Roof", "96% Marshall Paving"],
      status: "PERMIT SECURED - DAY 0",
      value: "$1,850,000",
      margin: "High"
    },
    {
      id: "FLYNN-WINT",
      franchise: "Taco Bell / Flynn Group",
      type: "Winter Ops Syndicate",
      location: "Fairfax, VA (5 Locations)",
      needs: ["Zero-Tolerance Snow Removal", "De-Icing Salting Ops", "Spring Mill & Overlay"],
      status: "CONTRACT RENEWAL",
      value: "$240,000 / Yr",
      margin: "Extreme"
    },
    {
      id: "VDOT-GRAVEL",
      franchise: "VDOT Municipal / Heavy Civil",
      type: "High-Margin Earthworks",
      location: "Stafford County, VA",
      needs: ["Mass Grading & Excavation", "Crusher Run Stone Base", "Erosion Control"],
      status: "BIDDING PHASE",
      value: "$890,000",
      margin: "Extreme"
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
          <h3 className="text-[#d4af37] font-black uppercase tracking-[0.2em] text-xl">Total Envelope Prime Contractor (QSR & Civil)</h3>
          <p className="text-[#00ff41] text-xs font-mono mt-1 font-bold animate-pulse">
            ACTIVE DOCTRINE: 90-DAY QSR GROUND-UP // WINTER OPS // HEAVY EARTHWORKS
          </p>
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
          <div key={target.id} className="bg-[#0a0a0c] p-5 rounded-lg border border-white/10 hover:border-[#d4af37]/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <span className="text-white font-black uppercase tracking-wider">{target.franchise}</span>
              <span className="text-[#00ff41] font-mono text-[10px] bg-[#00ff41]/10 px-2 py-0.5 rounded border border-[#00ff41]/30">
                {target.status}
              </span>
            </div>

            <div className="text-gray-400 text-xs mb-3 font-mono">{target.location}</div>

            <div className="bg-[#1f1f23] rounded p-3 mb-4 border border-white/5 h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
              <div className="text-[10px] text-gray-500 font-mono mb-2 uppercase">SOVEREIGN SCOPE: {target.type}</div>
              <div className="flex flex-wrap gap-2">
                {target.needs.map((need, idx) => (
                  <span key={idx} className="bg-black border border-[#d4af37]/30 text-[#d4af37] text-[9px] px-2 py-1 rounded tracking-wider uppercase">
                    {need}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-3">
              <div>
                <div className="text-[10px] font-mono text-gray-500">TOTAL SOVEREIGN VALUE</div>
                <div className="text-white font-bold">{target.value}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-gray-500">PROFIT VECTOR</div>
                <div className="text-[#d4af37] font-bold uppercase">{target.margin} MARGIN</div>
              </div>
            </div>

            <button className="w-full mt-4 bg-black border border-white/10 group-hover:border-[#d4af37] text-[#d4af37] group-hover:text-black group-hover:bg-[#d4af37] font-black text-[10px] uppercase tracking-widest py-2 transition-all">
              {target.id.includes("NEW") ? "INITIALIZE 90-DAY BUILD PROTOCOL" : "GENERATE SUPREME COURT CONTRACT"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
