import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/spotsylvania')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Expansion & Estate Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            SPOTSYLVANIA <br /> <span className="text-white italic">ESTATE PAVING</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            J. Worden & Sons Asphalt Paving: Providing the foundational strength for Spotsylvania's booming commercial retail pads and luxury rural estates.
          </p>
        </div>
      </section>
      <section className="py-24 px-6 bg-black text-left">
        <div className="bg-[#1a1a1a] p-12 border-l-[10px] border-[#ffcc00]">
          <h3 className="text-4xl font-black uppercase mb-6 italic text-left">The Rural & Retail Standard</h3>
          <p className="text-xl text-gray-400 font-bold leading-relaxed text-left">
            First impressions are permanent. We execute high-speed, zero-defect commercial paving, ADA-compliant line striping, and premium estate driveway installations built on our signature deep-strength base.
          </p>
        </div>
      </section>
    </main>
  ),
})
