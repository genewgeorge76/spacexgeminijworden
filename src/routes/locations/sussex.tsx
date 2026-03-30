import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/sussex')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Southern Rural Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            SUSSEX <br /> <span className="text-white italic">LONG HAUL PAVING</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            J. Worden & Sons Asphalt Paving: Bringing Richmond’s elite paving standards to Sussex County farms, estates, and commercial facilities.
          </p>
        </div>
      </section>
      <section className="py-24 px-6 bg-black text-left">
        <p className="text-gray-300 text-3xl max-w-4xl italic font-bold">
          "We build infrastructure for the long haul. From deep-strength 6-inch bases to flawless surface coats, your Sussex property is in the hands of 4th-generation experts."
        </p>
      </section>
    </main>
  ),
})
