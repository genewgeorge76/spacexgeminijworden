import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/standards')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-sans text-white text-left">
      {/* HERO SECTION */}
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-left">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm tracking-[0.3em] mb-6 inline-block shadow-2xl">
            Industrial Grade Specs
          </span>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-[#ffcc00]">
            THE WORDEN <br /> <span className="text-white italic">STANDARD</span>
          </h1>
          <p className="text-2xl font-bold uppercase italic text-gray-400 max-w-4xl leading-tight">
            At J. Worden & Sons Asphalt Paving, we don't guess—we engineer. Every 6-inch stone base is verified for compaction before a single drop of asphalt touches the ground.
          </p>
        </div>
      </section>

      {/* THE THREE TIERS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* TIER 2 - THE RICHMOND STANDARD */}
          <div className="bg-[#1a1a1a] p-10 border-l-8 border-[#ffcc00] shadow-2xl hover:bg-[#222] transition-all">
            <h3 className="text-4xl font-black uppercase mb-2 italic text-white text-left">Structural Tier 2</h3>
            <p className="text-[#ffcc00] font-bold uppercase text-sm tracking-widest mb-6 italic text-left underline decoration-2 underline-offset-4">The 20-Year Foundation</p>
            <p className="text-gray-300 text-xl font-bold leading-relaxed mb-8 text-left">
              Our gold standard for Virginia clay. This spec includes a full 6-inch compacted stone base topped with a 2-inch precision-laid surface course.
            </p>
            
            {/* ADA COMPLIANCE BOX - PREVIOUSLY BROKEN SECTION */}
            <div className="bg-black/50 p-6 border border-gray-800 text-left">
              <h4 className="text-[#ffcc00] font-black uppercase mb-2 text-left text-xs tracking-widest">Compliance Protocol</h4>
              <p className="text-sm text-gray-400 font-bold italic text-left">
                Every handicap stall and van-accessible route is measured to the inch to meet all Virginia state and federal ADA requirements. 
              </p>
            </div>
          </div>

          {/* TIER 3 - ESTATE/INDUSTRIAL */}
          <div className="bg-[#1a1a1a] p-10 border-l-8 border-white shadow-2xl hover:bg-[#222] transition-all">
            <h3 className="text-4xl font-black uppercase mb-2 italic text-white text-left text-left">Structural Tier 3</h3>
            <p className="text-white font-bold uppercase text-sm tracking-widest mb-6 italic text-left">High-Torque Infrastructure</p>
            <p className="text-gray-300 text-xl font-bold leading-relaxed mb-8 text-left">
              Designed for heavy equipment and semi-truck traffic. This tier utilizes a double-lift paving process over reinforced sub-grades.
            </p>
            <p className="text-[#ffcc00] font-black uppercase text-xs text-left">Standard for: Tyson Foods, Food Lion Logistics, Estate Main-Lanes</p>
          </div>
        </div>
      </section>
    </main>
  ),
})
