import { createFileRoute } from '@tanstack/react-router';
import { AlertTriangle, CheckCircle, DollarSign, Users, FileText, TrendingDown, Lock } from 'lucide-react';
import { payrollTreasury } from '../utils/payrollTreasury';

export const Route = createFileRoute('/payroll-treasury')({
  component: PayrollTreasury,
});

// ── Mock live crew data ───────────────────────────────────────────────────────
const ACTIVE_CREWS = [
  { id: 'Alpha', hours: 38.5, foreman: 'Mike D.', site: 'Chesterfield County Schools – Chester, VA' },
  { id: 'Beta',  hours: 32.0, foreman: 'Ray T.',  site: 'KBP/KFC Commercial Lot – Richmond, VA' },
  { id: 'Gamma', hours: 27.5, foreman: 'Carlos M.', site: 'Colonial Heights Parking Expansion' },
];

// ── Mock sub payout (308.33 tons from recent commercial job) ─────────────────
const SUB_PAYOUT_TONS = 308.33;
const SUB_RATE_PER_TON = 18.5; // $/ton negotiated rate

// ── Mock completed-job margin audit ──────────────────────────────────────────
const COMPLETED_JOB = {
  jobId: 'JWA-20260401-007',
  client: 'Plaza Street Partners – Dallas, TX',
  estimatedBid: 215450,
  actualLaborCost: 68400,
  actualMaterialCost: 71200,
};

function PayrollTreasury() {
  const subPayoutMsg = payrollTreasury.calculateSubPayout(SUB_PAYOUT_TONS, SUB_RATE_PER_TON);
  const marginMsg    = payrollTreasury.marginAuditLock(
    COMPLETED_JOB.estimatedBid,
    COMPLETED_JOB.actualLaborCost,
    COMPLETED_JOB.actualMaterialCost,
  );
  const marginBelow35 = marginMsg.startsWith('[CFO AUDIT REQUIRED]');

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* ── HERO COMMAND HEADER ── */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-b border-zinc-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,204,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]/70">
              Worden OS · Labor & Subcontractor Treasury Engine
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
            <span className="text-[#ffcc00]">LABOR &amp;</span>
            <br />
            <span className="text-white italic">SUBCONTRACTOR TREASURY</span>
          </h1>
          <p className="text-lg text-zinc-400 font-bold max-w-3xl leading-relaxed">
            Real-time OT burn tracking, automated 1099 sub payouts, and CFO margin audit lock — all in one command panel.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

        {/* ── PANEL 1: Live OT Burn Feed ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <Users className="w-5 h-5 text-[#ffcc00]" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.35em] text-[#ffcc00]">
              Live Crew OT Burn Radar
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {ACTIVE_CREWS.map((crew) => {
              const msg     = payrollTreasury.monitorOTBurnRate(crew.id, crew.hours);
              const isAlert = crew.hours >= 38;
              return (
                <div
                  key={crew.id}
                  className={`rounded-xl border p-5 ${
                    isAlert
                      ? 'border-red-500/60 bg-red-950/30'
                      : 'border-zinc-800 bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Crew ID</p>
                      <p className="text-xl font-black text-white">Crew {crew.id}</p>
                    </div>
                    {isAlert
                      ? <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                      : <CheckCircle   className="w-6 h-6 text-green-400 flex-shrink-0" />
                    }
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 mb-1">Foreman: {crew.foreman}</p>
                  <p className="text-[10px] font-bold text-zinc-500 mb-3 truncate">{crew.site}</p>
                  <div className={`text-xs font-black px-3 py-2 rounded-lg ${
                    isAlert ? 'bg-red-900/50 text-red-300' : 'bg-green-900/30 text-green-300'
                  }`}>
                    {msg}
                  </div>
                  {/* Hours bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">
                      <span>Hours Worked</span>
                      <span>{crew.hours}h / 40h</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isAlert ? 'bg-red-500' : 'bg-[#ffcc00]'}`}
                        style={{ width: `${Math.min((crew.hours / 40) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PANEL 2: Sub 1099 Payout Calculator ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <DollarSign className="w-5 h-5 text-[#ffcc00]" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.35em] text-[#ffcc00]">
              Subcontractor 1099 Payout — Recent Commercial Job
            </h2>
          </div>
          <div className="border border-zinc-800 rounded-xl bg-zinc-900/40 p-6">
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <div className="border-l-4 border-[#ffcc00] pl-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Tons Laid</p>
                <p className="text-3xl font-black text-white">{SUB_PAYOUT_TONS.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-500 font-bold mt-1">INDUSTRIAL — 148 lbs/sq yd/in</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Rate Per Ton</p>
                <p className="text-3xl font-black text-white">${SUB_RATE_PER_TON.toFixed(2)}</p>
                <p className="text-[10px] text-zinc-500 font-bold mt-1">Negotiated Sub Rate</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Total Payout</p>
                <p className="text-3xl font-black text-green-400">
                  ${(SUB_PAYOUT_TONS * SUB_RATE_PER_TON).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] text-zinc-500 font-bold mt-1">Auto-calculated</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/50">
              <FileText className="w-5 h-5 text-[#ffcc00] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Treasury Engine Output</p>
                <p className="text-sm font-black text-white">{subPayoutMsg}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PANEL 3: Margin Audit Lock ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <Lock className="w-5 h-5 text-[#ffcc00]" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.35em] text-[#ffcc00]">
              Margin Audit Lock — Completed Job
            </h2>
          </div>
          <div className={`border rounded-xl p-6 ${
            marginBelow35 ? 'border-red-500/60 bg-red-950/20' : 'border-green-600/50 bg-green-950/20'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Job ID</p>
                <p className="text-lg font-black text-white">{COMPLETED_JOB.jobId}</p>
                <p className="text-[11px] text-zinc-400 font-bold mt-1">{COMPLETED_JOB.client}</p>
              </div>
              {marginBelow35
                ? <TrendingDown className="w-8 h-8 text-red-400 flex-shrink-0" />
                : <CheckCircle  className="w-8 h-8 text-green-400 flex-shrink-0" />
              }
            </div>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Estimated Bid</p>
                <p className="text-2xl font-black text-white">
                  ${COMPLETED_JOB.estimatedBid.toLocaleString()}
                </p>
              </div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Actual Labor Cost</p>
                <p className="text-2xl font-black text-orange-400">
                  ${COMPLETED_JOB.actualLaborCost.toLocaleString()}
                </p>
              </div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Actual Material Cost</p>
                <p className="text-2xl font-black text-orange-400">
                  ${COMPLETED_JOB.actualMaterialCost.toLocaleString()}
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-xl border ${
              marginBelow35
                ? 'bg-red-900/30 border-red-700/50'
                : 'bg-green-900/20 border-green-700/40'
            }`}>
              {marginBelow35
                ? <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                : <CheckCircle   className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              }
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${marginBelow35 ? 'text-red-400' : 'text-green-400'}`}>
                  CFO Audit Lock Result
                </p>
                <p className={`text-sm font-black ${marginBelow35 ? 'text-red-200' : 'text-green-200'}`}>
                  {marginMsg}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section className="text-center py-10 border-t border-zinc-900">
          <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.35em] mb-3">
            J. Worden &amp; Sons · 4th Generation · Est. 1984
          </p>
          <a
            href="tel:8044461296"
            className="inline-flex items-center gap-3 bg-[#ffcc00] text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors shadow-xl rounded-sm"
          >
            804-446-1296 — Command Center Dispatch
          </a>
        </section>

      </div>
    </main>
  );
}
