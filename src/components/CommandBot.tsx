import { useState, useRef, useEffect } from 'react';
import { commandBot } from '@/utils/commandBot';

interface TerminalLine {
  type: 'input' | 'output';
  text: string;
}

export default function CommandBotUI() {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: `JWORDENAI Command Bot v1.0 — STATUS: ${commandBot.status}` },
    { type: 'output', text: `HQ: ${commandBot.hq}` },
    { type: 'output', text: `Try: 'leads', 'photos', or 'pricing'` },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    const response = commandBot.processCommand(cmd);
    setLines((prev) => [
      ...prev,
      { type: 'input', text: `> ${cmd}` },
      { type: 'output', text: response },
    ]);
    setInput('');
  };

  return (
    <section className="bg-zinc-950 border border-zinc-700 rounded-2xl p-6 max-w-xl mx-auto shadow-2xl font-mono">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
        <span className="ml-3 text-zinc-400 text-xs uppercase tracking-widest">JWORDENAI Terminal</span>
      </div>

      <div role="log" aria-live="polite" aria-label="Command Bot output" className="bg-zinc-900 rounded-lg p-4 h-52 overflow-y-auto text-sm space-y-1 mb-4">
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.type === 'input' ? 'text-[#ffcc00]' : 'text-green-400'}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <span className="text-[#ffcc00] self-center">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          aria-label="Command input"
          className="flex-1 bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#ffcc00] transition-colors font-mono"
        />
        <button
          type="submit"
          className="bg-[#ffcc00] text-zinc-900 font-bold uppercase text-xs tracking-wide px-5 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Run
        </button>
      </form>
    </section>
  );
}
