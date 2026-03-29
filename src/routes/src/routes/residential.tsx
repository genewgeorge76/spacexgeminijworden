import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/residential')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            4th Generation Residential Authority
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter">
            ESTATE-GRADE <br /> <span className="text-white italic">RESIDENTIAL</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            Engineering high-load residential thoroughfares built on a 6-inch structural stone foundation.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-6xl font-black uppercase text-white leading-none italic">The <span className="text-[#ffcc00]">Premium</span> Build</h2>
            <div className="space-y-10">
              <div>
                <h4 className="text-xl font-black uppercase text-[#ffcc00] mb-2">01. Sub-Grade Stabilization</h4>
                <p className="text-gray-400 font-bold leading-relaxed">We assess Virginia's clay and soil density before the first stone is dropped to prevent the sinking and shifting common with "budget" contractors.</p>
              </div>
              <div>
                <h4 className="text-xl font-black uppercase text-[#ffcc00] mb-2">02. 6-Inch Compacted Stone Base</h4>
                <p className="text-gray-400 font-bold leading-relaxed">The skeleton of your driveway. We use heavy-duty compaction equipment to ensure a base that supports heavy SUVs and delivery trucks without rutting.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-12 border-l-[10px] border-[#ffcc00] shadow-2xl self-center">
            <h3 className="text-3xl font-black uppercase text-white mb-6 italic tracking-tighter">The J. Worden Vow:</h3>
            <p className="text-gray-300 font-bold leading-relaxed mb-8 uppercase tracking-tighter">
              "From Goochland to the 23221, the 6-inch stone standard is non-negotiable."
            </p>
            <a href="tel:8044461296" className="text-4xl font-black text-[#ffcc00] hover:text-white underline decoration-4 underline-offset-8 transition-colors">804-446-1296</a>
          </div>
        </div>
      </section>
    </main>
  ),
})
