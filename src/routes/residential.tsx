import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/residential')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            4th Generation Residential Authority | Dispatching from Chester HQ
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            ESTATE-GRADE <br /> <span className="text-white italic">DRIVEWAYS</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            From our Chester headquarters to the estates of Windsor Farms and Fairfax, we engineer high-load thoroughfares built on a 6-inch structural stone foundation.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-6xl font-black uppercase text-white leading-none italic underline decoration-[#ffcc00] underline-offset-8">The <span className="text-[#ffcc00]">Premium</span> Build</h2>
            <div className="space-y-10">
              <div className="text-left font-bold">
                <h4 className="text-xl font-black uppercase text-[#ffcc00] mb-2">01. Sub-Grade Stabilization</h4>
                <p className="text-gray-400 leading-relaxed">We assess local soil density—from Chester clay to Richmond urban fill—before the first stone is dropped to prevent sinking.</p>
              </div>
              <div className="text-left font-bold">
                <h4 className="text-xl font-black uppercase text-[#ffcc00] mb-2">02. 6-Inch Compacted Stone Base</h4>
                <p className="text-gray-400 leading-relaxed">Our structural standard across the 41-city circle. We use heavy-duty compaction for a base that supports heavy SUVs without rutting.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-12 border-l-[10px] border-[#ffcc00] shadow-2xl self-center text-left">
            <h3 className="text-3xl font-black uppercase text-white mb-6 italic tracking-tighter">The J. Worden Vow:</h3>
            <p className="text-gray-300 font-bold leading-relaxed mb-8 uppercase tracking-tighter italic">
              "We aren't a 'drive-by' crew. We are a Chester-based legacy business that treats every project like a long-term structural investment."
            </p>
            <div className="text-left font-black">
               <a href="tel:8044461296" className="text-4xl font-black text-[#ffcc00] hover:text-white underline decoration-4 underline-offset-8 transition-colors">804-446-1296</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  ),
});
