import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'commander' | 'ai';
  text: string;
  timestamp: string;
}

export const CommanderTerminal = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      text: "JWordenAI Sovereign Core online. Good morning, Commander. I have locked the 50% deposit mandate across all GC and Retail Titan logic. Standing by for operational commands.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newCmd: Message = {
      id: Date.now().toString(),
      role: 'commander',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newCmd]);
    setInput('');
    setIsTyping(true);

    // Simulate JWordenAI parsing the command and learning
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: `Command received: "${newCmd.text}". I am updating my operational parameters. I will apply this logic to all future estimates and dispatch protocols.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-[#050505] rounded-xl border border-[#d4af37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)] flex flex-col h-[400px] relative overflow-hidden mt-8">
      {/* Header */}
      <div className="bg-[#0a0a0c] border-b border-[#d4af37]/20 p-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]"></span>
          </div>
          <h3 className="text-[#d4af37] font-black uppercase tracking-[0.2em] text-sm">Neural Command Terminal</h3>
        </div>
        <span className="text-gray-500 text-[10px] font-mono tracking-widest">JWORDEN_AI // CHIEF OF STAFF</span>
      </div>

      {/* Chat Log */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scrollbar-thin scrollbar-thumb-[#d4af37]/20 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'commander' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-baseline space-x-2 mb-1">
              <span className={`text-[10px] font-mono tracking-wider ${msg.role === 'commander' ? 'text-gray-500' : 'text-[#d4af37]'}`}>
                {msg.role === 'commander' ? 'COMMANDER GENE' : 'JWORDEN AI'}
              </span>
              <span className="text-[9px] text-gray-600 font-mono">{msg.timestamp}</span>
            </div>
            <div className={`max-w-[80%] p-4 rounded-lg text-sm ${
              msg.role === 'commander' 
                ? 'bg-[#1f1f23] text-white border border-white/10 rounded-tr-none' 
                : 'bg-[#d4af37]/10 text-[#e2e8f0] border border-[#d4af37]/30 rounded-tl-none font-mono leading-relaxed'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="text-[10px] font-mono tracking-wider text-[#d4af37] mb-1">JWORDEN AI</div>
            <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 p-4 rounded-lg rounded-tl-none flex space-x-1">
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-[#0a0a0c] border-t border-white/5 z-10">
        <form onSubmit={handleCommand} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Instruct JWordenAI..."
            className="w-full bg-[#1f1f23] text-white font-mono text-sm px-4 py-4 pr-24 rounded-lg border border-white/10 focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 bottom-2 bg-[#d4af37] hover:bg-white text-black font-black text-[10px] tracking-widest uppercase px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
};
