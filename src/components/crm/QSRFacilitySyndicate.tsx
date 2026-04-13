import { useState } from 'react';
import { SiteAuditor } from '../../logic/gc/SiteAuditor';

export const QSRFacilitySyndicate = () => {
  const [isDeploying, setIsDeploying] = useState(false);

  const franchiseTargets = [
    {
      id: 'KFC-DFW-01',
      franchise: 'KFC / KBP Foods',
      type: '90-Day Turnkey Build',
      location: 'Houston, TX (Industrial Corridor)',
      needs: ['Earthwork', 'Concrete Foundations', '96% Marshall Paving', 'TPO Roof'],
      status: 'PERMIT FILED',
      baseValue: 1245000,
    },
    {
      id: 'TB-ATX-99',
      franchise: 'Taco Bell / Flynn Group',
      type: 'Ground-Up QSR',
      location: 'Austin, TX',
      needs: ['Mass Excavation', 'Drive-Thru Pad', 'HVAC Lifting'],
      status: 'BIDDING PHASE',
      baseValue: 890000,
    },
    {
      id: 'WENDYS-VA',
      franchise: "Wendy's Corporate",
      type: 'Site Retrofit',
      location: 'Fairfax, VA',
      needs: ['Mill & Overlay', 'ADA Ramps'],
      status: 'GEO-FENCED',
      baseValue: 185000,
    },
  ];

  const deployAdStrike = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 2000);
  };

  return (
    <div className="bg-[#050505] p-6 rounded-xl border border-[#d4af37]/30 shadow-[0_0_20px_rgba(212,175,55,0.1)] mt-8 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 opacity-5 text-9xl">🛡️</div>

      <div className="flex justify-between items-center border-b border-[#d4af37]/20 pb-4 mb-6 relative z-10">
        <div>
          <h3 className="text-[#d4af37] font-black uppercase tracking-[0.2em] text-xl">Sovereign Site Auditor & GC Radar</h3>
          <p className="text-red-500 text-xs font-mono mt-1 font-bold animate-pulse">GEOTECH & SUPPLY CHAIN RISK ENGINE ACTIVE</p>
        </div>
        <button
          onClick={deployAdStrike}
          disabled={isDeploying}
          className={`px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all border ${
            isDeploying
              ? 'bg-[#00ff41] text-black border-[#00ff41]'
              : 'bg-[#1f1f23] text-[#d4af37] border-[#d4af37]/50 hover:bg-[#d4af37] hover:text-black'
          }`}
        >
          {isDeploying ? 'INITIATING...' : 'DEPLOY AD-STRIKE'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {franchiseTargets.map((target) => {
          const audit = SiteAuditor.runGeotechAudit(target.location, target.needs);
          const totalAdjustedValue = target.baseValue + audit.contingencyCost;

          return (
            <div
              key={target.id}
              className="bg-glass p-5 rounded-lg border border-white/10 hover:border-[#d4af37]/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-white font-black uppercase tracking-wider">{target.franchise}</span>
                  <span className="text-[#00ff41] font-mono text-[10px] bg-[#00ff41]/10 px-2 py-0.5 rounded border border-[#00ff41]/30">
                    {target.status}
                  </span>
                </div>

                <div className="text-gray-400 text-xs mb-3 font-mono">{target.location}</div>

                <div className="bg-[#1f1f23] rounded p-3 mb-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-gray-500 font-mono uppercase">AI PRE-FLIGHT AUDIT</span>
                    <span
                      className={`text-[10px] font-black tracking-widest ${
                        audit.riskLevel === 'CRITICAL'
                          ? 'text-red-500'
                          : audit.riskLevel === 'HIGH'
                            ? 'text-yellow-500'
                            : 'text-[#00ff41]'
                      }`}
                    >
                      RISK: {audit.riskLevel}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {audit.alerts.map((alert, idx) => (
                      <div key={idx} className="text-[9px] font-mono text-gray-400 leading-tight border-l-2 border-gray-600 pl-2">
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 mt-auto">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-[10px] font-mono text-gray-500">BASE ESTIMATE</div>
                  <div className="text-gray-400 text-xs">${target.baseValue.toLocaleString()}</div>
                </div>
                {audit.contingencyCost > 0 && (
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-[10px] font-mono text-red-500/70 animate-pulse">REQUIRED CONTINGENCY</div>
                    <div className="text-red-500 text-xs">+${audit.contingencyCost.toLocaleString()}</div>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                  <div className="text-[10px] font-mono text-[#d4af37]">ADJUSTED CONTRACT VALUE</div>
                  <div className="text-white font-bold">${totalAdjustedValue.toLocaleString()}</div>
                </div>

                <button className="w-full mt-4 bg-black border border-white/10 group-hover:border-[#d4af37] text-[#d4af37] group-hover:text-black group-hover:bg-[#d4af37] font-black text-[10px] uppercase tracking-widest py-2 transition-all">
                  AUTHORIZE ADJUSTED BID
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
