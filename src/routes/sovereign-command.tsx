import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { Lock, Shield, AlertTriangle } from 'lucide-react';
import CommandCenter from '@/components/CommandCenter';

export const Route = createFileRoute('/sovereign-command')({
  component: SovereignCommandRoute,
});

function Gatekeeper({ onUnlock }: { onUnlock: () => void }) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setChecking(true);

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
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,204,0,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,204,0,0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
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

        <div className="backdrop-blur-xl bg-zinc-900/60 border border-zinc-700/50 rounded-2xl p-8 shadow-2xl shadow-black/60">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-[0.15em] text-white mb-1">
              SOVEREIGN COMMAND
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

function SovereignCommandRoute() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <Gatekeeper onUnlock={() => setUnlocked(true)} />;
  }

  return <CommandCenter onLock={() => setUnlocked(false)} />;
}
