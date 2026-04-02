import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/masonry')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#c8a84b] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#c8a84b] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            4th Generation Legacy | Cobblestone & Brick Paver Specialists
          </span>
          <h1 className="text-8xl font-black uppercase text-[#c8a84b] leading-[0.9] tracking-tighter text-left">
            MASONRY <br /> <span className="text-white italic">PAVERS</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            Cobblestone driveways, brick paver walkways, and natural stone aprons — engineered on the same structural stone base that defines every J. Worden project.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-6xl font-black uppercase text-white leading-none italic underline decoration-[#c8a84b] underline-offset-8">
              The <span className="text-[#c8a84b]">Cobblestone</span> Standard
            </h2>
            <div className="space-y-10">
              <div className="text-left font-bold">
                <h4 className="text-xl font-black uppercase text-[#c8a84b] mb-2">01. Structural Stone Foundation</h4>
                <p className="text-gray-400 leading-relaxed">Every cobblestone and brick paver installation begins with our signature 6-inch compacted stone base — the same load-bearing foundation we use for commercial asphalt, guaranteeing zero settling or heaving.</p>
              </div>
              <div className="text-left font-bold">
                <h4 className="text-xl font-black uppercase text-[#c8a84b] mb-2">02. Precision Pattern Laying</h4>
                <p className="text-gray-400 leading-relaxed">From herringbone to running bond, our crews execute exacting patterns across driveways, courtyard aprons, and estate entrances throughout the Richmond metro and 41 surrounding cities.</p>
              </div>
              <div className="text-left font-bold">
                <h4 className="text-xl font-black uppercase text-[#c8a84b] mb-2">03. Natural Stone & Granite Cobble</h4>
                <p className="text-gray-400 leading-relaxed">We source premium granite cobblestones, tumbled Belgian block, and reclaimed brick to complement both historic Richmond neighborhoods and modern estate builds in Chesterfield and Henrico.</p>
              </div>
              <div className="text-left font-bold">
                <h4 className="text-xl font-black uppercase text-[#c8a84b] mb-2">04. Seamless Asphalt Integration</h4>
                <p className="text-gray-400 leading-relaxed">Cobblestone aprons paired with VDOT-grade asphalt main drives — precision tie-ins ensure a continuous structural surface with zero lip, no flex differential, and perfect drainage grade.</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-[#1a1a1a] p-12 border-l-[10px] border-[#c8a84b] shadow-2xl text-left">
              <h3 className="text-3xl font-black uppercase text-white mb-6 italic tracking-tighter">The J. Worden Vow:</h3>
              <p className="text-gray-300 font-bold leading-relaxed mb-8 uppercase tracking-tighter italic">
                "A cobblestone driveway is a generational statement. We build it the same way we build our asphalt — structurally, permanently, and with the full weight of 4th-generation craftsmanship behind every stone."
              </p>
              <div className="text-left font-black">
                <a href="tel:8044461296" className="text-4xl font-black text-[#c8a84b] hover:text-white underline decoration-4 underline-offset-8 transition-colors">804-446-1296</a>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-8 border border-white/10 text-left">
              <h4 className="text-lg font-black uppercase text-white mb-4 tracking-widest">Paver Services</h4>
              <ul className="space-y-3 text-gray-400 font-bold">
                <li className="flex items-start gap-3"><span className="text-[#c8a84b] mt-1">▸</span> Granite &amp; Belgian cobblestone driveways</li>
                <li className="flex items-start gap-3"><span className="text-[#c8a84b] mt-1">▸</span> Brick paver walkways &amp; courtyard aprons</li>
                <li className="flex items-start gap-3"><span className="text-[#c8a84b] mt-1">▸</span> Natural stone entry aprons</li>
                <li className="flex items-start gap-3"><span className="text-[#c8a84b] mt-1">▸</span> Cobblestone edging &amp; border accents</li>
                <li className="flex items-start gap-3"><span className="text-[#c8a84b] mt-1">▸</span> Asphalt + cobblestone combination drives</li>
                <li className="flex items-start gap-3"><span className="text-[#c8a84b] mt-1">▸</span> HOA courtyard &amp; community entrance paving</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#1a1a1a] border-t border-white/10 text-left">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#c8a84b] font-black uppercase tracking-widest text-sm">Dispatching from Chester, VA</span>
          <h2 className="text-5xl font-black uppercase text-white mt-4 mb-6">
            Ready to Plan Your <span className="text-[#c8a84b]">Cobblestone Project?</span>
          </h2>
          <p className="text-xl text-gray-400 font-bold italic max-w-2xl mx-auto mb-10">
            Call us for a structural consultation. We assess sub-grade conditions, material selection, and long-term drainage grading before a single stone is set.
          </p>
          <a
            href="tel:8044461296"
            className="inline-flex items-center gap-3 bg-[#c8a84b] px-10 py-5 text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(200,168,75,0.4)]"
          >
            Call 804-446-1296
          </a>
        </div>
      </section>
    </main>
  ),
});
