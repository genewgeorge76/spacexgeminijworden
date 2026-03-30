import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/chesterfield')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            County Seat & Suburban Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            CHESTERFIELD <br /> <span className="text-white italic">PREMIUM PAVING</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            J. Worden & Sons Asphalt Paving: Our home county. Delivering unmatched residential estate and heavy-duty commercial asphalt across Chesterfield.
          </p>
        </div>
      </section>
      <section className="py-24 px-6 bg-black text-left">
        <div className="bg-[#1a1a1a] p-12 border-l-[10px] border-[#ffcc00] grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-4xl font-black uppercase mb-6 italic text-left">The Hometown Standard</h3>
            <p className="text-xl text-gray-400 font-bold leading-relaxed text-left">
              As our headquarters' home base, Chesterfield gets our elite crews. We guarantee a 6-inch compacted stone foundation for every new driveway and retail lot, ensuring your investment outlasts the Virginia weather.
            </p>
          </div>
          <div className="border border-gray-800 p-8 text-center self-center bg-black/50">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 mb-2 italic">Direct Dispatch From HQ:</p>
            <p className="text-[#ffcc00] font-bold text-lg">1601 Ware Bottom Springs Rd, Suite 214<br/>Chester, VA 23836</p>
          </div>
        </div>
      </section>
    </main>
  ),
})
