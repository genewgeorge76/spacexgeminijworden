import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/windsor-farms')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-xs mb-8 inline-block shadow-2xl">Elite Residential Division</span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-none tracking-tighter">WINDSOR FARMS <br /><span className="text-white italic">CORRIDOR</span></h1>
          <p className="text-2xl mt-8 font-bold text-gray-400 italic max-w-3xl">"The 6-Inch Structural Standard for Richmond’s most historic estates."</p>
        </div>
      </section>
      <section className="py-20 px-6 bg-black">
        <div className="max-w-3xl mx-auto border-l-4 border-[#ffcc00] p-10 bg-[#111111]">
          <h2 className="text-3xl font-black uppercase mb-6 text-white">The Windsor Requirement</h2>
          <p className="text-gray-400 font-bold leading-relaxed mb-6">
            We utilize the same **Hercules** and **SealMaster** emulsions used on national retail hubs to ensure a deep-black, lasting finish for 23221's elite estates.
          </p>
          <a href="tel:8044461296" className="text-[#ffcc00] text-2xl font-black underline decoration-4">804-446-1296</a>
        </div>
      </section>
    </main>
  ),
});
