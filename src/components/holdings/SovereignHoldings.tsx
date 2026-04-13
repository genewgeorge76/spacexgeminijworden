import { TreasuryLogic } from '../../logic/holdings/TreasuryLogic';

export const SovereignHoldings = () => {
  const activeTargets = [
    { id: "ACQ-01", type: "Distressed Industrial Land", location: "Stafford, VA", price: "$1.2M", downPayment: 250000, yield: "14.5% IRR" },
    { id: "ACQ-02", type: "Failing Asphalt Plant", location: "Richmond, VA", price: "$4.5M", downPayment: 800000, yield: "22.0% IRR" },
    { id: "DEV-01", type: "Ground-Up Retail GC", location: "Fairfax, VA", price: "$850K", downPayment: 150000, yield: "18% Margin" }
  ];

  const currentFund = TreasuryLogic.capitalReserves.currentHoldingsFund;
  const sweepRate = TreasuryLogic.capitalReserves.pavingSweepPercentage * 100;

  return (
    <div className="mt-8 bg-[#050505] p-8 rounded-xl border border-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🏗️</div>
      
      <div className="flex justify-between items-end border-b border-[#d4af37]/20 pb-4 mb-6 relative z-10">
        <div>
          <h3 className="text-[#d4af37] font-black uppercase tracking-[0.2em] text-2xl">Sovereign Capital & Holdings</h3>
          <p className="text-[#00ff41] text-xs font-mono mt-1 font-bold animate-pulse">
            ACTIVE AUTO-SWEEP: {sweepRate}% OF PAVING PROFIT DIVERTED TO HOLDINGS
          </p>
        </div>
        <div className="text-right">
          <div className="text-gray-500 text-xs font-mono mb-1">CURRENT HOLDINGS FUND</div>
          <div className="text-[#d4af37] font-black text-3xl tracking-wider text-glow">${currentFund.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {activeTargets.map(target => {
          const progress = TreasuryLogic.calculateFundingProgress(target.downPayment);
          const isReady = parseFloat(progress) >= 100;

          return (
            <div key={target.id} className={`bg-[#0a0a0c] p-5 rounded-lg border transition-all group ${isReady ? 'border-[#00ff41]' : 'border-white/10 hover:border-[#d4af37]'}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#1f1f23] text-[#d4af37] text-[10px] px-2 py-1 rounded font-mono">{target.id}</span>
                <span className={`${isReady ? 'text-[#00ff41]' : 'text-gray-400'} text-[10px] font-bold tracking-widest`}>
                  {isReady ? 'FUNDS SECURED' : 'SLOW FEEDING...'}
                </span>
              </div>
              <h4 className="text-white font-bold mb-1">{target.type}</h4>
              <p className="text-gray-400 text-sm mb-4">{target.location}</p>
              
              {/* Slow Feed Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] font-mono mb-1 text-gray-500">
                  <span>CAPITAL SECURED</span>
                  <span>{progress}% of ${target.downPayment.toLocaleString()} Down</span>
                </div>
                <div className="w-full bg-[#1f1f23] rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${isReady ? 'bg-[#00ff41]' : 'bg-[#d4af37]'}`} style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
                <div>
                  <div className="text-gray-500 text-[10px] font-mono">TOTAL COST</div>
                  <div className="text-white text-sm font-bold">{target.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 text-[10px] font-mono">PROJECTED YIELD</div>
                  <div className="text-[#d4af37] text-sm font-bold">{target.yield}</div>
                </div>
              </div>

              <button className={`mt-4 w-full font-bold py-2 rounded text-xs tracking-widest transition-all ${isReady ? 'bg-[#00ff41] text-black hover:bg-white' : 'bg-[#1f1f23] text-gray-500 cursor-not-allowed'}`}>
                {isReady ? 'EXECUTE ACQUISITION' : 'AWAITING PAVING SWEEP'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
