import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sealcoating')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      {/* HERO: THE BRANDED NAME */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.3em] mb-8 inline-block shadow-xl">
            Industrial Maintenance Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            ARMOR-KOTE™ <br /> <span className="text-white italic text-left">MOLECULAR DEFENSE</span>
          </h1>
          <p className="text-2xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            Standard sealants sit on the surface. **Armor-Kote™** penetrates the aggregate to restore the bitumen oils lost to Virginia’s UV exposure and salt-air oxidation.
          </p>
        </div>
      </section>

      {/* THE COMPLIANCE SHIELD */}
      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
          <div className="bg-[#1a1a1a] p-12 border-l-[10px] border-[#ffcc00] shadow-2xl text-left">
            <h3 className="text-3xl font-black uppercase text-[#ffcc00] mb-6 italic tracking-tighter text-left">The $5,500 Lawsuit Shield</h3>
            <p className="text-gray-300 font-bold leading-relaxed mb-8 text-left">
              "Drive-by" ADA lawsuits target non-compliant striping and faded markings. We provide factual project history for national retail hubs—ensuring your lot is not just beautiful, but courtroom-defensible.
            </p>
            <div className="flex flex-wrap gap-4 text-left">
               <span className="text-[10px] font-black px-3 py-1 bg-black border border-gray-800 text-[#ffcc00]">ADA Ramps</span>
               <span className="text-[10px] font-black px-3 py-1 bg-black border border-gray-800 text-[#ffcc00]">Van Accessibility</span>
               <span className="text-[10px] font-black px-3 py-1 bg-black border border-gray-800 text-[#ffcc00]">Bollard Install</span>
            </div>
          </div>
          <div className="space-y-6 text-left">
            <h2 className="text-5xl font-black uppercase text-white leading-none text-left">The <span className="text-[#ffcc00]">Daily Choice</span> of National Brands</h2>
            <p className="text-gray-400 font-bold italic text-left leading-relaxed">
              From Richmond pharmacy hubs to the I-64 logistics corridor, J. Worden & Sons is the turn-key partner for regional asset management.
            </p>
            <div className="pt-6 text-left">
               <a href="tel:8044461296" className="text-4xl font-black text-[#ffcc00] hover:text-white underline decoration-4 underline-offset-8 transition-colors text-left">804-446-1296</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  ),
});
