import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/CITY_NAME_HERE')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Premium Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            CITY_NAME <br /> <span className="text-white italic">ASPHALT EXPERTS</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            J. Worden & Sons Asphalt Paving: Bringing 4 generations of paving mastery and a 6-inch stone base to every project.
          </p>
        </div>
      </section>
      <section className="py-24 px-6 bg-black text-left">
        <p className="text-gray-300 text-3xl max-w-4xl italic font-bold">
          "We build it right the first time so you don't have to pave it a second time. That is the Worden Promise."
        </p>
      </section>
    </main>
  ),
})
