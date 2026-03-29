import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sealcoating')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.3em] mb-8 inline-block shadow-xl">
            Industrial Maintenance Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter">
            ARMOR-KOTE™ <br /> <span className="text-white italic">MOLECULAR DEFENSE</span>
          </h1>
          <p className="text-2xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            We don't just "black out" a parking lot. We restore the bitumen oils that keep asphalt flexible, utilizing a triple-layer chemical defense.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-black border-y border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { name: "SealMaster", link: "https://sealmaster.net/", desc: "The global leader in pavement sealer technology." },
            { name: "Hercules", link: "https://herculessealcoat.com/", desc: "High-solids asphalt emulsion for a deep-black finish." },
            { name: "Crafco", link: "https://crafco.com/", desc: "Industrial hot-applied crack & joint welding." }
          ].map((brand) => (
            <div key={brand.name} className="p-10 bg-[#0a0a0a] hover:bg-[#111111] transition-all group">
              <h3 className="text-[#ffcc00] text-xl font-black mb-4 uppercase tracking-tighter group-hover:scale-105 transition-transform">{brand.name}</h3>
              <p className="text-gray-500 text-[11px] mb-6 leading-relaxed font-bold uppercase">{brand.desc}</p>
              <a href={brand.link} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-white border-b border-[#ffcc00] pb-1">Specs →</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  ),
});
