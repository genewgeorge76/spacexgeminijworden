import { TreasuryLogic } from '../../logic/holdings/TreasuryLogic';

export const SovereignHoldings = () => {
  const activeTargets = [
    {
      id: 'ACQ-01',
      type: 'Distressed Industrial Land',
      location: 'Stafford, VA',
      price: '$1.2M',
      yield: '14.5% IRR',
      status: 'READY FOR DEPLOYMENT',
    },
    {
      id: 'ACQ-02',
      type: 'Failing Asphalt Plant',
      location: 'Richmond, VA',
      price: '$4.5M',
      yield: '22.0% IRR',
      status: 'NEGOTIATION ACTIVE',
    },
    {
      id: 'DEV-01',
      type: 'Ground-Up Retail GC',
      location: 'Fairfax, VA',
      price: '$3.8M',
      yield: '18% Margin',
      status: 'PERMITTING',
    },
  ];

  const excessCapital =
    TreasuryLogic.capitalReserves.currentStripeBalance -
    TreasuryLogic.capitalReserves.deploymentThreshold;

  return (
    <div className="relative mt-8 overflow-hidden rounded-xl border border-[#d4af37]/40 bg-[#050505] p-8 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
      {/* Background styling */}
      <div className="absolute top-0 right-0 p-8 text-9xl opacity-10">🏛️</div>

      <div className="relative z-10 mb-6 flex items-end justify-between border-b border-[#d4af37]/20 pb-4">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-[#d4af37]">
            Sovereign Capital & Holdings
          </h3>
          <p className="mt-1 text-xs font-mono text-gray-400">
            REAL ESTATE ACQUISITION & GC DEVELOPMENT ENGINE
          </p>
        </div>
        <div className="text-right">
          <div className="mb-1 text-xs font-mono text-gray-500">
            LIQUID EXCESS CAPITAL (READY TO DEPLOY)
          </div>
          <div className="text-2xl font-black tracking-wider text-[#00ff41]">
            ${excessCapital.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {activeTargets.map((target) => (
          <div
            key={target.id}
            className="group rounded-lg border border-white/10 bg-glass p-5 transition-all hover:border-[#d4af37]"
          >
            <div className="mb-4 flex items-start justify-between">
              <span className="rounded bg-[#1f1f23] px-2 py-1 font-mono text-[10px] text-[#d4af37]">
                {target.id}
              </span>
              <span className="animate-pulse text-xs font-bold text-[#00ff41]">
                {target.status}
              </span>
            </div>
            <h4 className="mb-1 font-bold text-white">{target.type}</h4>
            <p className="mb-4 text-sm text-gray-400">{target.location}</p>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <div className="text-[10px] font-mono text-gray-500">ASKING PRICE</div>
                <div className="font-bold text-white">{target.price}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-gray-500">
                  PROJECTED YIELD
                </div>
                <div className="font-bold text-[#d4af37]">{target.yield}</div>
              </div>
            </div>

            <button className="mt-4 w-full rounded bg-[#1f1f23] py-2 text-xs font-bold tracking-widest text-gray-400 transition-all group-hover:bg-[#d4af37] group-hover:text-black">
              AUTHORIZE ACQUISITION
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
