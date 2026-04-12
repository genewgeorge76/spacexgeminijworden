import { createFileRoute, Link } from '@tanstack/react-router';
import { AlertTriangle, Clock, HardHat, MapPin, OctagonX, Truck, Zap } from 'lucide-react';

export const Route = createFileRoute('/field')({
  component: FieldApp,
});

// ── Mock active job data ──────────────────────────────────────────────────────
const activeJobs = [
  {
    id: 'JOB-2401',
    address: '4821 Commerce Park Dr, Dallas, TX 75247',
    targetTonnage: 308.33,
    tonsLaid: 187.5,
    crewLead: 'Crew Alpha',
    region: 'TX',
    status: 'IN PROGRESS',
  },
  {
    id: 'JOB-2402',
    address: '1090 Industrial Blvd, Richmond, VA 23231',
    targetTonnage: 142.6,
    tonsLaid: 89.0,
    crewLead: 'Crew Beta',
    region: 'VA',
    status: 'IN PROGRESS',
  },
  {
    id: 'JOB-2403',
    address: '2200 Nations Ford Rd, Charlotte, NC 28217',
    targetTonnage: 215.0,
    tonsLaid: 215.0,
    crewLead: 'Crew Gamma',
    region: 'NC',
    status: 'COMPLETE',
  },
];

// ── Mock plant pulse data ─────────────────────────────────────────────────────
const plantPulse = [
  { name: 'Vulcan Materials — Dallas, TX', waitMin: 22, status: 'green' },
  { name: 'Superior Asphalt — Richmond, VA', waitMin: 45, status: 'yellow' },
  { name: 'Allan Myers — Charlotte, NC', waitMin: 95, status: 'red' },
];

// ── Mock crew hours data ──────────────────────────────────────────────────────
const crewHours = [
  { name: 'Mike T. (Foreman)', hoursWorked: 34.5, region: 'TX' },
  { name: 'Carlos R. (Operator)', hoursWorked: 31.0, region: 'TX' },
  { name: 'Dave W. (Foreman)', hoursWorked: 37.0, region: 'VA' },
  { name: 'Sam K. (Roller)', hoursWorked: 29.5, region: 'VA' },
  { name: 'Luis M. (Foreman)', hoursWorked: 22.0, region: 'NC' },
];

const OT_KILL_SWITCH = 38;

function getWaitColor(status: string) {
  if (status === 'red') return 'text-red-400 border-red-800 bg-red-900/20';
  if (status === 'yellow') return 'text-yellow-400 border-yellow-800 bg-yellow-900/20';
  return 'text-green-400 border-green-800 bg-green-900/20';
}

function getHoursColor(hours: number) {
  if (hours >= OT_KILL_SWITCH) return 'text-red-400';
  if (hours >= 35) return 'text-orange-400';
  return 'text-green-400';
}

function FieldApp() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white font-sans">

      {/* ── HEADER ────────────────────────────────────────────────────────────── */}
      <section className="sticky top-0 z-50 bg-[#09090b] border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f59e0b]">
            JWORDENAI — FIELD APP
          </span>
        </div>
        <div className="flex items-center gap-2">
          <HardHat className="w-4 h-4 text-zinc-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
            FOREMAN VIEW
          </span>
        </div>
      </section>

      {/* ── ACTIVE JOB SITES ─────────────────────────────────────────────────── */}
      <section className="py-6 px-4 border-b border-zinc-900">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#f59e0b]" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Active Job Sites
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {activeJobs.map((job) => {
              const pct = Math.min(100, Math.round((job.tonsLaid / job.targetTonnage) * 100));
              return (
                <div
                  key={job.id}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">
                        {job.id} · {job.crewLead} [{job.region}]
                      </div>
                      <div className="text-sm font-bold text-white leading-snug">{job.address}</div>
                    </div>
                    <span
                      className={`shrink-0 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                        job.status === 'COMPLETE'
                          ? 'bg-green-900/40 text-green-400 border border-green-800'
                          : 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  {/* Tonnage target */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                      Tonnage Progress
                    </span>
                    <span className="text-xs font-black text-[#f59e0b]">
                      Target: {job.targetTonnage.toFixed(2)} Tons
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-1">
                    <div
                      className={`h-full rounded-full transition-all ${
                        job.status === 'COMPLETE' ? 'bg-green-500' : 'bg-[#f59e0b]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[9px] font-bold text-zinc-600">
                    {job.tonsLaid.toFixed(2)} / {job.targetTonnage.toFixed(2)} tons laid ({pct}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PLANT PULSE ──────────────────────────────────────────────────────── */}
      <section className="py-6 px-4 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-4 h-4 text-[#f59e0b]" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Plant Pulse — Live Wait Times
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {plantPulse.map((plant) => (
              <div
                key={plant.name}
                className={`border rounded-xl p-4 flex items-center justify-between gap-3 ${getWaitColor(plant.status)}`}
              >
                <div>
                  <div className="text-xs font-black uppercase leading-snug">{plant.name}</div>
                  {plant.status === 'red' && (
                    <div className="flex items-center gap-1 mt-1 text-[9px] font-black text-red-400 uppercase tracking-widest">
                      <AlertTriangle className="w-3 h-3" />
                      REROUTE LOWBOYS — EXCESS WAIT
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-black">{plant.waitMin}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">min wait</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOURS TRACKER ────────────────────────────────────────────────────── */}
      <section className="py-6 px-4 border-b border-zinc-900">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-[#f59e0b]" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Hours Tracker — OT Kill Switch @ 38 Hrs
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-bold text-zinc-600 uppercase tracking-wider mb-4 ml-6">
            <AlertTriangle className="w-3 h-3 shrink-0" />
            <span>Overtime Kill Switch activates at {OT_KILL_SWITCH} hours — alert supervisor before reaching limit</span>
          </div>
          <div className="flex flex-col gap-2">
            {crewHours.map((member) => {
              const pct = Math.min(100, Math.round((member.hoursWorked / OT_KILL_SWITCH) * 100));
              const isWarning = member.hoursWorked >= 35;
              const isDanger = member.hoursWorked >= OT_KILL_SWITCH;
              return (
                <div
                  key={member.name}
                  className={`bg-zinc-900/60 border rounded-xl p-3 ${
                    isDanger ? 'border-red-800' : isWarning ? 'border-orange-800' : 'border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                        [{member.region}]
                      </span>
                      <span className="text-xs font-black text-white">{member.name}</span>
                    </div>
                    <div className={`text-sm font-black ${getHoursColor(member.hoursWorked)}`}>
                      {member.hoursWorked.toFixed(1)} hrs
                      {isDanger && (
                        <span className="inline-flex items-center gap-0.5 ml-1 text-[9px] font-black text-red-400 uppercase">
                          <OctagonX className="w-3 h-3" /> OT LIMIT
                        </span>
                      )}
                      {isWarning && !isDanger && (
                        <span className="inline-flex items-center gap-0.5 ml-1 text-[9px] font-black text-orange-400 uppercase">
                          <AlertTriangle className="w-3 h-3" /> NEAR LIMIT
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isDanger ? 'bg-red-500' : isWarning ? 'bg-orange-400' : 'bg-green-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NAVIGATION ───────────────────────────────────────────────────────── */}
      <section className="py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-zinc-600" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
              Quick Access
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/dispatch"
              className="bg-zinc-900/60 border border-zinc-800 hover:border-[#f59e0b]/40 rounded-xl p-4 text-center transition-all"
            >
              <div className="text-sm font-black text-white mb-1">🚛 Dispatch</div>
              <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Crew & project ops</div>
            </Link>
            <Link
              to="/contact"
              className="bg-zinc-900/60 border border-zinc-800 hover:border-[#f59e0b]/40 rounded-xl p-4 text-center transition-all"
            >
              <div className="text-sm font-black text-white mb-1">📞 Contact HQ</div>
              <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">804-446-1296</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <section className="py-4 px-4 border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
            JWORDENAI Field App · Foreman View
          </div>
          <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
            96% Marshall Std. · VDOT Sec 315
          </div>
        </div>
      </section>

    </main>
  );
}
