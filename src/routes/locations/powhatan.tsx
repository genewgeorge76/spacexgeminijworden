import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/standards')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-sans text-white text-left">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-left">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm tracking-[0.3em] mb-6 inline-block">
            Consumer Protection & Specs
          </span>
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 text-[#ffcc00]">
            J. Worden & Sons <br /> Asphalt Paving
          </h1>
          <p className="text-2xl font-bold uppercase italic text-gray-400 max-w-4xl leading-tight">
            Virginia Engineered Standards. No shortcuts. Every 6-inch stone base is verified.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto text-left">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#1a1a1a] p-10 border-l-8 border-[#ffcc00] shadow-2xl">
            <h3 className="text-4xl font-black uppercase mb-4 italic text-white text-left">Structural Tier 2</h3>
            <p className="text-[#ffcc00] font-bold uppercase text-sm tracking-widest mb-6 italic text-left underline decoration-2">The Richmond Standard</p>
            <p className="text-gray-300 text-xl font-bold leading-relaxed mb-8">
              Full 2" compacted surface over a 6" stone base. This is the foundation of our family legacy.
            </p>
            <div className="bg-black/50 p-6 border border-gray-800 text-left">
              <h4 className="text-[#ffcc00] font-black uppercase mb-2 text-left">Legal Compliance</h4>
              <p className="text-sm text-gray-400 font-bold text-left italic">
                Every handicap stall and van-accessible route is measured to the inch to meet all Virginia state and federal ADA requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  ),
})
