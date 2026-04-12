import { useState } from 'react';
import legacyData from '../data/legacyPortfolio.json';
import { JWordenAI } from '../ai/JWordenAIEngine';

type LegacyAccount = {
  name?: string;
  projects?: string;
  relationship?: string;
};

function getHeritageLine() {
  const heritage = legacyData.heritage as unknown;
  if (typeof heritage === 'string') return heritage;
  if (heritage && typeof heritage === 'object') {
    const h = heritage as { summary?: unknown; founded?: unknown };
    if (typeof h.summary === 'string') return h.summary;
    if (typeof h.founded === 'number') return `EST. ${h.founded}`;
  }
  return 'LEGACY PORTFOLIO';
}

function getMajorAccounts(): LegacyAccount[] {
  const legacy = legacyData as unknown as {
    major_accounts?: LegacyAccount[];
    majorAccounts?: LegacyAccount[];
  };
  return legacy.major_accounts ?? legacy.majorAccounts ?? [];
}

export const DashboardOps = ({ isAutoMode }: { isAutoMode: boolean }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const runEstimator = async () => {
    setIsGenerating(true);
    await JWordenAI.generateAutonomousBid('Fredericksburg, VA', 10000);
    setIsGenerating(false);
  };

  const heritageLine = getHeritageLine();
  const majorAccounts = getMajorAccounts();

  return (
    <div className="min-h-screen p-8 radar-sweep relative">
      <header className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-black text-[#d4af37] tracking-tighter text-glow uppercase">
            JWordenAI <span className="text-white font-light text-xl">Sovereign Absolute</span>
          </h1>
          <p className="text-xs text-gray-400 tracking-widest mt-1">NATIONWIDE PRIME CONTRACTOR // AUTH 1984</p>
        </div>
        <div className="px-4 py-1 rounded-full bg-glass border-gold-glow text-sm text-[#d4af37] animate-pulse">
          {isAutoMode ? 'AUTO-PILOT ACTIVE' : 'MANUAL OVERRIDE'}
        </div>
      </header>

      <div className="bg-glass rounded-lg mb-8 border border-white/5 overflow-hidden flex whitespace-nowrap p-4">
        <div className="animate-pulse flex space-x-12">
          <span className="text-[#d4af37] font-bold tracking-widest">{heritageLine.toUpperCase()}</span>
          {majorAccounts.map((account, idx) => (
            <span key={idx} className="text-gray-300 tracking-wide">
              <strong className="text-white">{(account.name ?? 'ACCOUNT').toUpperCase()}</strong> // {(account.projects ?? account.relationship ?? 'PROJECTS').toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="bg-glass p-8 rounded-xl border-gold-glow relative overflow-hidden h-[400px]">
            <h2 className="text-xl font-bold text-white mb-2">Live Demand Heatmap & Satellite Targeting</h2>
            <p className="text-sm text-gray-400 mb-6">Scanning High-Intensity I-95 Nodes (Fairfax, Arlington, Fredericksburg)...</p>
            <div className="absolute inset-0 top-24 bg-[#1f1f23] rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              <p className="text-[#00ff41] font-mono z-10 animate-pulse">AWAITING TARGET LOCK...</p>
            </div>
          </div>
        </div>

        <div className="bg-glass p-6 rounded-xl border border-white/10 h-[400px]">
          <h3 className="text-[#d4af37] font-bold mb-4 uppercase tracking-wider text-sm border-b border-white/10 pb-2">Weapons Free: AI Actions</h3>
          <button onClick={runEstimator} className="w-full bg-[#d4af37] hover:bg-[#b5952f] text-black font-black py-4 px-4 rounded-lg mb-4 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            {isGenerating ? 'GENERATING BID...' : '1. RUN SATELLITE AI ESTIMATOR'}
          </button>
          <button className="w-full bg-[#1f1f23] hover:bg-black text-white border border-white/20 font-bold py-3 px-4 rounded-lg mb-3">2. DEPLOY TWILIO SMS SURGE</button>
          <button className="w-full bg-[#1f1f23] hover:bg-black text-white border border-white/20 font-bold py-3 px-4 rounded-lg mb-3">3. GENERATE LEGAL PDF</button>
          <button className="w-full bg-[#1f1f23] hover:bg-black text-white border border-white/20 font-bold py-3 px-4 rounded-lg">4. AUDIT STRIPE MOAT DEPOSITS</button>
        </div>
      </div>
    </div>
  );
};
