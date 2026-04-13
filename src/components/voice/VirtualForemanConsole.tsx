export const VirtualForemanConsole = () => {
  const recentCalls = [
    {
      time: '10:42 AM',
      caller: 'Property Manager (Hospitality)',
      sqft: 180000,
      whale: true,
      outcome: 'OFFERED SOVEREIGN RATE. PENDING DEPOSIT.',
    },
    {
      time: '09:15 AM',
      caller: 'Local GC',
      sqft: 12000,
      whale: false,
      outcome: 'QUOTED STANDARD. EMAIL DISPATCHED.',
    },
  ];

  return (
    <div className="mt-8 rounded-xl border border-[#00ff41]/30 bg-[#050505] p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)]">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff41] opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00ff41]"></span>
          </div>
          <h3 className="text-lg font-black uppercase tracking-widest text-[#00ff41]">Gene's Virtual Foreman</h3>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-gray-500">VOICE ENGINE:</span>
          <span className="ml-2 font-mono text-xs text-white">ELEVENLABS (GRANDFATHER-01)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded border border-white/5 bg-[#0a0a0c] p-4">
          <h4 className="mb-3 font-mono text-xs text-gray-500">LIVE TRANSCRIPT LOGS</h4>
          <div className="space-y-3">
            {recentCalls.map((call, idx) => (
              <div key={idx} className="border-l-2 border-[#d4af37] pl-3">
                <div className="mb-1 flex justify-between font-mono text-[10px] text-gray-400">
                  <span>
                    {call.time} | {call.caller}
                  </span>
                  {call.whale && <span className="text-[#d4af37]">WHALE DETECTED</span>}
                </div>
                <div className="text-sm font-bold text-white">{call.outcome}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center rounded border border-white/5 bg-[#0a0a0c] p-4">
          <h4 className="mb-2 text-center font-mono text-xs text-gray-500">OPERATIONAL LOGIC OVERRIDES</h4>
          <div className="space-y-2 text-center">
            <div className="rounded border border-white/10 bg-[#1f1f23] py-2 text-xs text-white">
              ZERO-DISRUPTION NIGHT-OPS (HOSPITALITY)
            </div>
            <div className="rounded border border-[#d4af37]/30 bg-[#1f1f23] py-2 text-xs font-bold text-[#d4af37]">
              SOVEREIGN LEGACY RATE ($119.75) ACTIVE
            </div>
          </div>
          <button className="mt-4 w-full rounded border border-[#00ff41]/50 bg-[#00ff41]/10 py-2 text-xs font-bold tracking-widest text-[#00ff41] transition-all hover:bg-[#00ff41] hover:text-black">
            TAKE OVER LIVE CALL
          </button>
        </div>
      </div>
    </div>
  );
};
