import React, { useState } from 'react';
import { CastleMoat } from '../auth/CastleMoat';

export const SovereignLanding = () => {
  const [accessWarRoom, setAccessWarRoom] = useState(false);

  if (accessWarRoom) return <CastleMoat />;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-[#d4af37] selection:text-black">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <nav className="relative z-10 flex justify-between items-center p-8 border-b border-white/5">
        <div className="text-[#d4af37] font-black tracking-[0.2em] text-xl uppercase text-glow">J. Worden & Sons</div>
        <div className="hidden md:flex space-x-8 text-xs font-mono tracking-widest text-gray-400">
          <span className="hover:text-white cursor-pointer transition-colors">90-DAY QSR BUILDS</span>
          <span className="hover:text-white cursor-pointer transition-colors">CONCRETE & CIVIL</span>
          <span className="hover:text-white cursor-pointer transition-colors">ASPHALT PAVING</span>
          <span className="hover:text-white cursor-pointer transition-colors">SOVEREIGN HOLDINGS</span>
        </div>
        <button className="border border-[#d4af37] text-[#d4af37] px-6 py-2 text-xs font-bold tracking-widest hover:bg-[#d4af37] hover:text-black transition-all">
          INITIATE TOTAL SITE BID
        </button>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        <div className="inline-block border border-[#00ff41]/30 bg-[#00ff41]/5 text-[#00ff41] px-4 py-1 rounded-full text-[10px] font-mono tracking-widest mb-8 animate-pulse">
          HEAVY CIVIL • CONCRETE • ASPHALT • TOTAL SITE CONTROL
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          The 90-Day QSR Build <br />
          <span className="text-[#d4af37]">Executed by AI.</span>
        </h1>
        <p className="max-w-2xl text-gray-400 text-lg md:text-xl font-light mb-12">
          We are a Sovereign GC Syndicate. From 4000 PSI concrete foundations and mass earthworks, to HVAC rooftop lifts and 96% Marshall asphalt paving. We deliver Turnkey Total Envelope Control for Franchise Developers.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="bg-[#d4af37] text-black font-black uppercase tracking-widest px-8 py-4 text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            Secure Commercial GC Bid
          </button>
          <button className="bg-[#1f1f23] border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 text-sm hover:border-[#d4af37] transition-all">
            View Franchise Portfolio
          </button>
        </div>
      </main>

      <section className="relative z-10 bg-black/50 border-t border-white/5 py-24">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-[#d4af37] text-3xl mb-4">🏛️</div>
            <h3 className="text-sm font-black mb-3 uppercase tracking-wider">Heavy Concrete Ops</h3>
            <p className="text-gray-500 text-xs leading-relaxed">4000 PSI steel-reinforced foundations, drive-thru pads, curbs, and monolithic pours engineered for extreme QSR traffic.</p>
          </div>
          <div>
            <div className="text-[#d4af37] text-3xl mb-4">🚜</div>
            <h3 className="text-sm font-black mb-3 uppercase tracking-wider">Mass Earthworks</h3>
            <p className="text-gray-500 text-xs leading-relaxed">GPS-guided land clearing, storm-water drainage, and VDOT-spec aggregate base compaction.</p>
          </div>
          <div>
            <div className="text-[#d4af37] text-3xl mb-4">🛣️</div>
            <h3 className="text-sm font-black mb-3 uppercase tracking-wider">96% Marshall Paving</h3>
            <p className="text-gray-500 text-xs leading-relaxed">4th Generation Sovereign asphalt application. Zero-disruption night-ops and automated lifecycle maintenance.</p>
          </div>
          <div>
            <div className="text-[#d4af37] text-3xl mb-4">🏗️</div>
            <h3 className="text-sm font-black mb-3 uppercase tracking-wider">Total Envelope (Roof/HVAC)</h3>
            <p className="text-gray-500 text-xs leading-relaxed">TPO flat roof installations and crane-lifted RTU (HVAC) systems. One contractor. One 50% deposit. Turnkey execution.</p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 p-8 flex justify-between items-center text-xs text-gray-600 font-mono">
        <div>© 1984 - 2026 J. WORDEN & SONS MULTI-TRADE SYNDICATE.</div>
        <button onClick={() => setAccessWarRoom(true)} className="hover:text-[#d4af37] transition-colors focus:outline-none group flex items-center space-x-2">
          <span>SYSTEM</span>
          <span className="opacity-0 group-hover:opacity-100">🔒</span>
        </button>
      </footer>
    </div>
  );
};
