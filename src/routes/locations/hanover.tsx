import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/hanover')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Hanover County Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            HANOVER <br /> <span className="text-white italic">ASPHALT EXPERTS</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            J. Worden & Sons Asphalt Paving: Bringing 4 generations of paving mastery to Hanover’s residential estates and rural corridors.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12 text-left">
            <h2 className="text-5xl font-black uppercase text-white leading-none italic">The <span className="text-[#ffcc00]">6-Inch</span> Rule</h2>
            <p className="text-xl text-gray-400 font-bold leading-relaxed">
              In Hanover, the ground can be unforgiving. We don't just "top-coat" and leave. We excavate and install a full 6-inch compacted stone base to ensure your driveway doesn't crack or sink under Virginia's weather.
            </p>
            <div className="bg-[#1a1a1a] p-8 border-l-4 border-[#ffcc00]">
              <h4 className="text-[#ffcc00] font-black uppercase text-sm mb-2">Hanover Services:</h4>
              <ul className="text-gray-300 font-bold space-y-2 uppercase text-xs tracking-widest">
                <li>• Farm Lane & Long Driveway Specialist</li>
                <li>• Industrial Sealcoating</li>
                <li>• Custom Cobblestone Aprons</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-12 border border-gray-800 self-center text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 mb-6 italic">Dispatching Legacy Crews to Hanover</p>
            <a href="tel:8044461296" className="text-5xl font-black text-[#ffcc00] hover:text-white transition-colors">804-446-1296</a>
          </div>
        </div>
      </section>
    </main>
  ),
})
