import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/residential')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            4th Generation Residential Authority
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter">
            ESTATE-GRADE <br /> <span className="text-white italic">DRIVEWAYS</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            Engineering high-load residential thoroughfares built on a 6-inch structural stone foundation.
          </p>
        </div>
      </section>
      {/* ... Rest of the Residential code provided earlier ... */}
    </main>
  ),
});
