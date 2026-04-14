import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import {
  Lock,
  Unlock,
  Shield,
  AlertTriangle,
  LayoutDashboard,
  Truck,
  DollarSign,
  FileText,
  Users,
  BarChart3,
  Zap,
  Globe,
  Wrench,
} from 'lucide-react';

export const Route = createFileRoute('/command-center')({
  component: CommandCenterRoute,
});

// ─── Gatekeeper ──────────────────────────────────────────────────────────────

function Gatekeeper({ onUnlock }: { onUnlock: () => void }) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setChecking(true);

    // Brief delay for UX effect
    await new Promise((r) => setTimeout(r, 500));

    const expected = import.meta.env.VITE_COMMAND_CENTER_KEY as string | undefined;

    if (!expected) {
      setError('COMMAND CENTER KEY not configured. Contact system administrator.');
      setChecking(false);
      return;
    }

    if (passphrase.trim() === expected) {
      onUnlock();
    } else {
      setError('ACCESS DENIED — Invalid passphrase. All attempts are logged.');
      setPassphrase('');
    }

    setChecking(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,204,0,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,204,0,0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Classification bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30" />
          <div className="flex items-center gap-2 px-4">
            <Shield className="w-3 h-3 text-amber-500/70" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-amber-500/70">
              JWORDENAI · SOVEREIGN COMMAND
            </span>
            <Shield className="w-3 h-3 text-amber-500/70" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30" />
        </div>

        {/* Panel */}
        <div className="backdrop-blur-xl bg-zinc-900/60 border border-zinc-700/50 rounded-2xl p-8 shadow-2xl shadow-black/60">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-[0.15em] text-white mb-1">
              COMMAND CENTER
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              J. Worden &amp; Sons · Sovereign Operations Hub
            </p>
            <div className="mt-3 text-[9px] font-bold uppercase tracking-widest text-amber-500/50">
              Authorized Personnel Only · Est. 1984
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">
                Command Passphrase
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="Enter passphrase"
                  autoComplete="current-password"
                  required
                  className="w-full bg-zinc-950/80 border border-zinc-700 focus:border-amber-500/60 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-700 font-bold tracking-wide transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-950/40 border border-red-800/50 rounded-lg px-4 py-3">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={checking}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-900/50 disabled:text-amber-700 text-black font-black uppercase tracking-[0.3em] py-4 rounded-lg text-sm transition-all duration-200"
            >
              {checking ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  VERIFYING...
                </span>
              ) : (
                'UNLOCK'
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-700">
            Virginia Class A Contractor · JWORDENAI™ Secure System
          </p>
          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-800 mt-1">
            Unauthorized access is strictly prohibited
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Command Center (unlocked) ───────────────────────────────────────────────

const COMMAND_MODULES = [
  {
    icon: LayoutDashboard,
    label: 'Executive Dashboard',
    href: '/dashboard',
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    desc: 'Real-time operations overview',
  },
  {
    icon: Truck,
    label: 'Dispatch Node',
    href: '/dispatch',
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    desc: 'Crew & equipment routing',
  },
  {
    icon: DollarSign,
    label: 'Profit Node',
    href: '/profit-node',
    color: 'text-green-400',
    border: 'border-green-500/30',
    desc: 'Live margin & job P&L',
  },
  {
    icon: FileText,
    label: 'GC Bid Engine',
    href: '/gc-bid',
    color: 'text-violet-400',
    border: 'border-violet-500/30',
    desc: 'Government & commercial bids',
  },
  {
    icon: BarChart3,
    label: 'Investor ROI',
    href: '/investor-roi',
    color: 'text-rose-400',
    border: 'border-rose-500/30',
    desc: '50-state expansion analytics',
  },
  {
    icon: Zap,
    label: 'Pre-Con AI',
    href: '/pre-con',
    color: 'text-yellow-400',
    border: 'border-yellow-500/30',
    desc: 'Preconstruction intelligence',
  },
  {
    icon: Globe,
    label: 'Whale Hunter',
    href: '/whale-hunter',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    desc: 'National bid lead sourcing',
  },
  {
    icon: Users,
    label: 'Payroll & Treasury',
    href: '/payroll-treasury',
    color: 'text-orange-400',
    border: 'border-orange-500/30',
    desc: 'Davis-Bacon & crew pay',
  },
  {
    icon: Wrench,
    label: 'Pre-Con Dashboard',
    href: '/pre-con-dashboard',
    color: 'text-lime-400',
    border: 'border-lime-500/30',
    desc: 'God-Mode project control',
  },
] as const;

function CommandCenter({ onLock }: { onLock: () => void }) {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 relative overflow-hidden">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,204,0,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,204,0,0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Unlock className="w-5 h-5 text-amber-400" />
              <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
                SOVEREIGN COMMAND CENTER
              </h1>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500/60">
              J. Worden &amp; Sons · 4th Generation · Est. 1984 · Virginia Class A
            </p>
          </div>
          <button
            onClick={onLock}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-amber-500/40 text-zinc-400 hover:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors"
          >
            <Lock className="w-3 h-3" />
            Lock
          </button>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-6 mb-8 px-5 py-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Systems Online</span>
          </div>
          <div className="h-3 w-px bg-zinc-700" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
            96% Marshall · VDOT Sec 315 · $9/Ton Shield · Zero-Downtime Medical
          </span>
          <div className="ml-auto text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
            JWORDENAI™ v1.0.0
          </div>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMMAND_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <a
                key={mod.href}
                href={mod.href}
                className={`group flex items-start gap-4 p-5 bg-zinc-900/60 border ${mod.border} hover:bg-zinc-800/60 rounded-xl transition-all duration-200 hover:shadow-lg`}
              >
                <div className={`mt-0.5 p-2 rounded-lg bg-zinc-950/80 border ${mod.border}`}>
                  <Icon className={`w-5 h-5 ${mod.color}`} />
                </div>
                <div>
                  <p className={`text-sm font-black uppercase tracking-wider ${mod.color} mb-1`}>
                    {mod.label}
                  </p>
                  <p className="text-[11px] text-zinc-500 leading-snug">{mod.desc}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-700">
            JWORDENAI™ Sovereign System · All access logged · 4th Generation Since 1984
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Route component — manages locked/unlocked state ─────────────────────────

function CommandCenterRoute() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <Gatekeeper onUnlock={() => setUnlocked(true)} />;
  }

  return <CommandCenter onLock={() => setUnlocked(false)} />;
}
