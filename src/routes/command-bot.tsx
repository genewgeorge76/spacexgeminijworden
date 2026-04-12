import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { commandBot } from '@/utils/commandBot';
import { prizedServices } from '@/utils/prizedServices';

export const Route = createFileRoute('/command-bot')({
  component: CommandBotPage,
});

interface LogEntry {
  type: 'input' | 'output' | 'system';
  text: string;
}

const QUICK_COMMANDS = [
  'leads',
  'pricing',
  'photos',
  'status',
  'prioritize milling',
  'prioritize sealcoating',
  'prioritize patching',
  'prioritize chip and tar',
  'prioritize grading',
  'prioritize striping',
];

function CommandBotPage() {
  const [input, setInput] = useState('');
  const [log, setLog] = useState<LogEntry[]>([
    { type: 'system', text: '████████████████████████████████████████' },
    { type: 'system', text: '  JWORDENAI COMMAND BOT v1.0 — ONLINE' },
    { type: 'system', text: `  HQ: ${commandBot.hq}` },
    { type: 'system', text: '████████████████████████████████████████' },
    { type: 'system', text: 'Type a command or click a quick-action below.' },
    { type: 'system', text: "Try: 'leads', 'pricing', 'prioritize milling', 'chip and tar'" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const handleSubmit = (cmd?: string) => {
    const command = (cmd ?? input).trim();
    if (!command) return;
    const response = commandBot.processCommand(command);
    setLog((prev) => [
      ...prev,
      { type: 'input', text: `> ${command}` },
      { type: 'output', text: response },
    ]);
    setInput('');
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono pt-36 pb-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]/70">
              Worden OS · JWORDENAI Command Interface
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
            <span className="text-[#ffcc00]">COMMAND</span>{' '}
            <span className="text-white italic">BOT</span>
          </h1>
          <p className="text-zinc-400 font-bold text-lg max-w-2xl">
            Real-time pipeline management. Route high-margin services directly to Kickserv's Elite folder.
          </p>
        </div>

        {/* Terminal */}
        <div className="bg-black border-2 border-zinc-800 rounded-2xl overflow-hidden mb-6 shadow-[0_0_60px_rgba(255,204,0,0.05)]">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-zinc-600">
              JWORDENAI — {commandBot.status}
            </span>
          </div>

          {/* Log output */}
          <div className="h-80 overflow-y-auto p-6 space-y-1 text-sm">
            {log.map((entry, i) => (
              <div
                key={i}
                className={
                  entry.type === 'input'
                    ? 'text-[#ffcc00] font-black'
                    : entry.type === 'output'
                      ? 'text-green-400 font-bold pl-2 border-l border-green-900'
                      : 'text-zinc-600 font-bold'
                }
              >
                {entry.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            className="flex items-center gap-3 px-4 py-3 border-t border-zinc-800 bg-zinc-950"
          >
            <span className="text-[#ffcc00] font-black text-sm shrink-0">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command..."
              className="flex-1 bg-transparent text-white font-bold text-sm outline-none placeholder-zinc-700"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#ffcc00] text-black font-black uppercase tracking-widest text-xs px-5 py-2 hover:bg-white transition-colors shrink-0"
            >
              Run
            </button>
          </form>
        </div>

        {/* Quick commands */}
        <div className="mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-3">Quick Commands</h2>
          <div className="flex flex-wrap gap-2">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleSubmit(cmd)}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-[#ffcc00]/60 hover:text-[#ffcc00] text-xs font-black uppercase tracking-wider px-4 py-2 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Prized Services Reference */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffcc00]" />
            Prized Services Database
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(prizedServices).map(([key, svc]) => (
              <div
                key={key}
                className="bg-zinc-900 border border-zinc-800 hover:border-[#ffcc00]/40 rounded-xl p-5 transition-all cursor-pointer group"
                onClick={() => handleSubmit(`prioritize ${key}`)}
                title={`Click to run: prioritize ${key}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-white group-hover:text-[#ffcc00] transition-colors">
                    {key}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${svc.margin === 'Elite' ? 'bg-[#ffcc00]/10 text-[#ffcc00] border border-[#ffcc00]/30' : 'bg-green-900/30 text-green-400 border border-green-800/40'}`}>
                    {svc.margin}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Tag: {svc.tag}</div>
                <div className="text-[10px] text-zinc-600 italic">{svc.visualProof}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
