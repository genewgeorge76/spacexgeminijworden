import { useState } from 'react';
import { premiumSuite } from '@/utils/premiumSuite';
import { prizedServices } from '@/utils/prizedServices';

const COMMANDS = [
  'leads',
  'photos',
  'pricing',
  'grading',
  'striping',
  'milling',
  'sealcoating',
  'patching',
  'chip and tar',
  'run premium bid',
];

function processCommand(input: string): string {
  const lower = input.toLowerCase().trim();

  if (lower.includes('leads')) return 'Checking Kickserv pipeline... 3 High-Velocity leads found.';
  if (lower.includes('photos')) return 'Syncing Vision Folders... BEAUFORT updated.';
  if (lower.includes('pricing')) return 'Fetching live binder costs... Bids adjusted for 2026 volatility.';

  if (lower === 'run premium bid') {
    const result = premiumSuite.calculateEliteBid({ zip: '23221', sqft: 5000, type: 'commercial' });
    return `[JWORDENAI Premium]: Elite bid calculated → $${result} (ZIP 23221 · 5,000 sq ft · Commercial)`;
  }

  for (const key of Object.keys(prizedServices)) {
    if (lower.includes(key)) {
      const svc = prizedServices[key];
      return `[JWORDENAI]: Revving priority for ${key.toUpperCase()}. Tag: ${svc.tag} | Margin: ${svc.margin} | Visual: ${svc.visualProof}. Pushing to Kickserv 'Elite' folder.`;
    }
  }

  return `Command not recognized. Try: ${COMMANDS.join(', ')}.`;
}

export function CommandBot() {
  const [input, setInput] = useState('');
  const [log, setLog] = useState<{ cmd: string; res: string }[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const res = processCommand(trimmed);
    setLog((prev) => [...prev, { cmd: trimmed, res }]);
    setInput('');
  }

  return (
    <div className="bg-black border border-[#ffcc00]/30 rounded-xl p-6 font-mono text-sm max-w-2xl w-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffcc00] animate-pulse" />
        <span className="text-[#ffcc00] font-black uppercase tracking-widest text-xs">
          JWORDENAI Command Bot · ONLINE
        </span>
      </div>

      <div className="bg-zinc-950 rounded-lg p-4 min-h-[200px] max-h-[320px] overflow-y-auto mb-4 space-y-3">
        {log.length === 0 && (
          <p className="text-zinc-600 italic">
            Type a command below. Try: <span className="text-[#ffcc00]">run premium bid</span>, <span className="text-[#ffcc00]">grading</span>, or <span className="text-[#ffcc00]">leads</span>.
          </p>
        )}
        {log.map((entry, i) => (
          <div key={i}>
            <p className="text-zinc-400">
              <span className="text-[#ffcc00]">$</span> {entry.cmd}
            </p>
            <p className="text-white pl-4">{entry.res}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-[#ffcc00] outline-none rounded-lg px-4 py-2 text-white placeholder-zinc-600 transition-colors"
        />
        <button
          type="submit"
          className="bg-[#ffcc00] text-black font-black uppercase text-xs tracking-widest px-5 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          Run
        </button>
      </form>

      <p className="text-zinc-700 text-xs mt-3">
        HQ: 1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836 · Premium Status:{' '}
        <span className="text-[#ffcc00]">{premiumSuite.status}</span>
      </p>
    </div>
  );
}
