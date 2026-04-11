import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { Lock, User, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [secureId, setSecureId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    // Brief delay for effect
    await new Promise((r) => setTimeout(r, 600));

    const role = login(secureId.trim(), passcode);
    setIsAuthenticating(false);

    if (!role) {
      setError('ACCESS DENIED — Invalid credentials. Authentication failed.');
      return;
    }

    if (role === 'OWNER') {
      navigate({ to: '/dashboard' });
    } else {
      navigate({ to: '/field' });
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,204,0,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,204,0,0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow orb top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Login panel */}
      <div className="relative z-10 w-full max-w-md">

        {/* Top classification bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30" />
          <div className="flex items-center gap-2 px-4">
            <Shield className="w-3 h-3 text-amber-500/70" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-amber-500/70">
              JWORDENAI · SECURE PORTAL
            </span>
            <Shield className="w-3 h-3 text-amber-500/70" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30" />
        </div>

        {/* Glass panel */}
        <div className="backdrop-blur-xl bg-zinc-900/60 border border-zinc-700/50 rounded-2xl p-8 shadow-2xl shadow-black/60">

          {/* Logo / Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-[0.15em] text-white mb-1">
              J. WORDEN<span className="text-amber-400">&amp;</span> SONS
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              JWORDENAI™ · Executive Access Portal
            </p>
            <div className="mt-3 text-[9px] font-bold uppercase tracking-widest text-amber-500/50">
              Authorized Personnel Only · Est. 1984
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Secure ID */}
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">
                Secure ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  value={secureId}
                  onChange={(e) => setSecureId(e.target.value)}
                  placeholder="Enter your Secure ID"
                  autoComplete="username"
                  required
                  className="w-full bg-zinc-950/80 border border-zinc-700 focus:border-amber-500/60 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-700 font-bold tracking-wide transition-colors"
                />
              </div>
            </div>

            {/* Passcode */}
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">
                Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter your Passcode"
                  autoComplete="current-password"
                  required
                  className="w-full bg-zinc-950/80 border border-zinc-700 focus:border-amber-500/60 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-700 font-bold tracking-wide transition-colors"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-red-950/40 border border-red-800/50 rounded-lg px-4 py-3">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-900/50 disabled:text-amber-700 text-black font-black uppercase tracking-[0.3em] py-4 rounded-lg text-sm transition-all duration-200 relative overflow-hidden group"
            >
              {isAuthenticating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  AUTHENTICATING...
                </span>
              ) : (
                'AUTHENTICATE'
              )}
            </button>
          </form>
        </div>

        {/* Bottom classification bar */}
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
