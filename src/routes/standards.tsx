import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/standards')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-sans text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm tracking-[0.3em] mb-6 inline-block">
            Consumer Protection & Specs
          </span>
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 text-[#ffcc00]">
            Virginia Engineered <br /> Standards
          </h1>
          <p className="text-2xl font-bold uppercase italic text-gray-400 max-w-4xl leading-tight">
            We don't do "bait and switch" paving. Choose your structural tier based on your budget and timeline. Every spec is in writing.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-800">
        <div className="bg-[#1a1a1a] p-10 border-l-8 border-red-600 shadow-2xl">
          <h2 className="text-4xl font-black uppercase text-white mb-6 italic">
            Liability Protection: <span className="text-[#ffcc00]">Striping & ADA</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/50 p-6 border border-gray-800">
              <h4 className="text-[#ffcc00] font-black uppercase mb-2">Industrial Materials</h4>
              <p className="text-sm text-gray-400">Exclusively using Neyra and SealMaster high-solids emulsions. No watered-down mixes.</p>
            </div>
            <div className="bg-black/50 p-6 border border-gray-800">
              <h4 className="text-[#ffcc00] font-black uppercase mb-2">Legal Compliance</h4>
              <p className="text-sm text-gray-400">Every handicap stall and van-accessible route is measured to the inch to meet federal mandates.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  ),
});
