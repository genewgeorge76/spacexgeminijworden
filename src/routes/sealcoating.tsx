import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sealcoating')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans">
      {/* PREMIUM HERO */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.3em] mb-8 inline-block shadow-xl">
            Exclusive Maintenance Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter">
            ARMOR-KOTE™ <br /> <span className="text-white italic">MOLECULAR DEFENSE</span>
          </h1>
          <p className="text-2xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            Standard sealants sit on the surface. **Armor-Kote™** penetrates the aggregate to restore the bitumen oils lost to Virginia’s UV exposure and salt-air oxidation.
          </p>
        </div>
      </section>

      {/* THE BRAND POWER GRID */}
      <section className="py-24 px-6 bg-black border-b border-gray-900">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black uppercase italic mb-4">The Chemical Standard</h2>
          <p className="text-gray-500 uppercase tracking-[0.4em] font-bold text-xs">Certified Applicator of the World's Elite Formulations</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-px bg-gray-900 border border-gray-900">
          {[
            { name: "Hercules", link: "https://herculessealcoat.com/", desc: "High-solids asphalt emulsion for a deep-black finish." },
            { name: "SealMaster", link: "https://sealmaster.net/", desc: "The global leader in pavement sealer technology." },
            { name: "Crafco", link: "https://crafco.com/", desc: "Industrial hot-applied crack & joint welding." },
            { name: "Neyra", link: "https://neyra.com/", desc: "Elite polymer-modified emulsions for asset protection." },
            { name: "Star-Seal", link: "https://starseal.com/", desc: "Heavy-duty specialty coatings for high-traffic lots." }
          ].map((brand) => (
            <div key={brand.name} className="p-10 bg-[#0a0a0a] hover:bg-[#111111] transition-all group">
              <h3 className="text-[#ffcc00] text-xl font-black mb-4 uppercase tracking-tighter group-hover:scale-105 transition-transform">{brand.name}</h3>
              <p className="text-gray-500 text-[11px] mb-6 leading-relaxed font-bold uppercase">{brand.desc}</p>
              <a href={brand.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-white border-b border-[#ffcc00] pb-1 hover:text-[#ffcc00]">
                Specs →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* THE DAILY MONEY MOVE: PROPERTY MANAGER SECTION */}
      <section className="py-24 px-6 bg-[#111111]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-6xl font-black uppercase text-white leading-none">The Property <br /><span className="text-[#ffcc00]">Manager’s Shield</span></h2>
            <p className="text-xl text-gray-400 font-bold leading-relaxed italic">
              "We provide factual project history for national retail hubs and pharmacy chains. Our turn-key ADA audits and Armor-Kote™ applications keep your assets compliant and your brand out of the courtroom."
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-12 border-l-[10px] border-[#ffcc00] shadow-2xl">
             <div className="text-[#ffcc00] text-5xl font-black mb-4 uppercase italic tracking-tighter font-sans">804-446-1296</div>
             <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Direct Line to the Windsor Farms Corridor Specialist</p>
          </div>
        </div>
      </section>
    </main>
  ),
});
