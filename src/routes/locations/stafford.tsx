import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/stafford')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Northern Commuter Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            STAFFORD <br /> <span className="text-white italic">HEAVY DUTY</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            J. Worden & Sons Asphalt Paving: High-torque industrial asphalt and luxury residential paving engineered for Stafford County.
          </p>
        </div>
      </section>
      <section className="py-24 px-6 bg-black text-left">
        <p className="text-gray-300 text-3xl max-w-4xl italic font-bold">
          "From commercial logistics centers to long commuter driveways, we bring 4 generations of precision engineering and a mandatory 6-inch stone base to every Stafford project."
        </p>
      </section>
    </main>
  ),
})
