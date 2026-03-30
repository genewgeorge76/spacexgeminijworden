import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/goochland')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Estate & Farm Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            GOOCHLAND <br /> <span className="text-white italic">RURAL MASTERY</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            J. Worden & Sons Asphalt Paving: Engineering pristine, long-lasting asphalt farm lanes and luxury estate driveways for Goochland County.
          </p>
        </div>
      </section>
      <section className="py-24 px-6 bg-black text-left">
        <div className="bg-[#1a1a1a] p-12 border-l-[10px] border-[#ffcc00]">
          <h3 className="text-4xl font-black uppercase mb-6 italic text-left">The Long-Haul Foundation</h3>
          <p className="text-xl text-gray-400 font-bold leading-relaxed text-left">
            Goochland's sprawling properties require contractors who understand rural terrain. We utilize a rigid 6-inch compacted stone base to ensure your long driveway never washes out or sinks under heavy agricultural equipment.
          </p>
        </div>
      </section>
    </main>
  ),
})
