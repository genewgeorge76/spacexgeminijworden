import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import {
  HardHat,
  MapPin,
  Truck,
  Thermometer,
  Clock,
  LogOut,
  Radio,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export const Route = createFileRoute('/field')({
  component: FieldApp,
});

const jobCards = [
  {
    id: 'JOB-2401',
    site: 'KFC — Midlothian Turnpike',
    address: '8220 Midlothian Tpke, Richmond VA 23235',
    target: '308 tons',
    status: 'IN PROGRESS',
    statusColor: 'text-green-400 border-green-600 bg-green-950/30',
    progress: 68,
  },
  {
    id: 'JOB-2402',
    site: 'Commercial Lot — Short Pump',
    address: '11940 W Broad St, Glen Allen VA 23060',
    target: '142 tons',
    status: 'STAGING',
    statusColor: 'text-amber-400 border-amber-600 bg-amber-950/30',
    progress: 15,
  },
];

const plantStatus = [
  { name: 'Vulcan Materials — Chester', wait: '12 min', temp: '310°F', avail: true },
  { name: 'Martin Marietta — Chesterfield', wait: '28 min', temp: '305°F', avail: true },
  { name: 'APAC — Henrico', wait: '45 min', temp: '298°F', avail: false },
];

function FieldApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({ to: '/login' });
    }
  }, [user, navigate]);

  if (!user) return null;

  function handleLogout() {
    logout();
    navigate({ to: '/login' });
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">

      {/* Header bar */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-400/80">
            FIELD OPS ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest hidden sm:block">
            {user.id} · FIELD
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-950/50 hover:bg-red-900/60 border border-red-800/50 hover:border-red-700 text-red-400 hover:text-red-300 font-black uppercase tracking-widest text-[10px] px-4 py-2 rounded-lg transition-all"
          >
            <LogOut className="w-3 h-3" />
            TERMINATE SESSION
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HardHat className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              FIELD APP
            </h1>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
            J. Worden &amp; Sons · Crew Operations · {timeStr}
          </p>
        </div>

        {/* Active jobs */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-4 h-4 text-amber-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Active Job Sites
            </h2>
          </div>
          <div className="space-y-3">
            {jobCards.map((job) => (
              <div
                key={job.id}
                className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">
                      {job.id}
                    </div>
                    <div className="text-base font-black text-white uppercase">{job.site}</div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-500 font-bold">
                      <MapPin className="w-3 h-3" />
                      {job.address}
                    </div>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${job.statusColor}`}>
                    {job.status}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Tonnage Target
                  </span>
                  <span className="text-sm font-black text-amber-400">{job.target}</span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-zinc-700 font-bold">0%</span>
                  <span className="text-[9px] text-amber-500/70 font-black">{job.progress}% complete</span>
                  <span className="text-[9px] text-zinc-700 font-bold">100%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Plant Pulse */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Plant Pulse — Live Wait Times
            </h2>
          </div>
          <div className="space-y-2">
            {plantStatus.map((plant) => (
              <div
                key={plant.name}
                className={`flex items-center justify-between bg-zinc-900/60 border rounded-xl px-4 py-3 ${
                  plant.avail ? 'border-zinc-800' : 'border-zinc-900 opacity-50'
                }`}
              >
                <div>
                  <div className="text-xs font-black text-white">{plant.name}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {plant.wait}
                    </span>
                    <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1">
                      <Thermometer className="w-3 h-3" /> {plant.temp}
                    </span>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${plant.avail ? 'text-green-400' : 'text-zinc-600'}`}>
                  {plant.avail ? '● OPEN' : '○ CLOSED'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Alert strip */}
        <div className="flex items-start gap-3 bg-amber-950/30 border border-amber-800/40 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest text-amber-400 mb-0.5">96% Compaction Standard</div>
            <p className="text-[10px] text-zinc-400 font-bold">
              Verify Marshall Unit Weight before final lift. VDOT Sec 315 compliance required on all commercial jobs.
            </p>
          </div>
        </div>

        {/* Radio / Comm */}
        <div className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-green-400 animate-pulse" />
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Foreman Channel</div>
              <div className="text-xs font-black text-white">CH-7 · Worden Ops Net</div>
            </div>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-green-400">LIVE</span>
        </div>
      </main>
    </div>
  );
}
