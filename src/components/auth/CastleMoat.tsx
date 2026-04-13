import React, { useState } from 'react';
import { DashboardOps } from '../DashboardOps';

export const CastleMoat = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleBreach = (e: React.FormEvent) => {
    e.preventDefault();
    // Master Override Code (To be replaced by Supabase Biometrics/Auth)
    if (passcode === 'ABSOLUTE1984') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPasscode('');
    }
  };

  if (isAuthenticated) {
    return <DashboardOps isAutoMode={true} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="z-10 bg-black/50 backdrop-blur-xl border border-[#d4af37]/30 p-12 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.1)] text-center max-w-md w-full">
        <h1 className="text-[#d4af37] text-3xl font-black tracking-[0.2em] mb-2 uppercase text-glow">JWordenAI</h1>
        <p className="text-gray-500 font-mono text-xs tracking-widest mb-8">SOVEREIGN ENCLAVE // RESTRICTED ACCESS</p>

        <form onSubmit={handleBreach} className="space-y-6">
          <div>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-[#1f1f23] border border-white/10 text-center text-[#00ff41] font-mono tracking-[0.5em] p-4 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors"
              placeholder="ENTER OVERRIDE"
              autoFocus
            />
            {error && <p className="text-red-500 font-mono text-xs mt-3 animate-pulse">ACCESS DENIED. UNAUTHORIZED BREACH ATTEMPT LOGGED.</p>}
          </div>
          <button type="submit" className="w-full bg-[#d4af37] text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors duration-300">
            Disengage Lock
          </button>
        </form>
      </div>
    </div>
  );
};
