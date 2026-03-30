import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/fluvanna')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Central Rural Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            FLUVANNA <br /> <span className="text-white italic">ESTATE PAVING</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            J. Worden & Sons Asphalt Paving: Flawless farm lanes and pristine estate driveways engineered to withstand the elements of Fluvanna County.
          </p>
        </div>
      </section>
      <section className="py-24 px-6 bg-black text-left">
        <p className="text-gray-300 text-3xl max-w-4xl italic font-bold">
          "We bring 4 generations of Worden family pride to Fluvanna. When we install a heavy-duty asphalt lane, we build it right the first time so you never have to pave it twice."
        </p>
      </section>
    </main>
  ),
})
