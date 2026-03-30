import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/amelia')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Amelia County Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            AMELIA <br /> <span className="text-white italic">PAVING PROS</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            J. Worden & Sons Asphalt Paving specializes in farm-grade foundations and luxury estate driveways throughout Amelia.
          </p>
        </div>
      </section>
      <section className="py-24 px-6 bg-black text-left">
        <p className="text-xl text-gray-400 uppercase tracking-widest italic mb-4 font-black">The Legacy of 26 Grandchildren</p>
        <p className="text-gray-300 text-3xl max-w-4xl italic font-bold">
          "We bring 4 generations of pride to every farm and estate, ensuring a foundation that outlasts the competition."
        </p>
      </section>
    </main>
  ),
})
