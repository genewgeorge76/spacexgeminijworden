import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/midlothian')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Midlothian Elite Division
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter">
            MIDLOTHIAN <br /> <span className="text-white italic">ESTATE PAVING</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            Premium asphalt solutions for Midlothian’s luxury estates, golf communities, and commercial corridors.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-5xl font-black uppercase text-white leading-none italic">The <span className="text-[#ffcc00]">Structural</span> Standard</h2>
            <p className="text-xl text-gray-400 font-bold leading-relaxed">
              We don't do "builder grade." Every Midlothian project is engineered on our signature 6-inch stone base, ensuring your investment outlasts the competition.
            </p>
            <div className="bg-[#1a1a1a] p-8 border-l-4 border-[#ffcc00]">
              <h4 className="text-[#ffcc00] font-black uppercase text-sm mb-2">Midlothian Specialties:</h4>
              <ul className="text-gray-300 font-bold space-y-2 uppercase text-xs tracking-widest">
                <li>• Luxury Driveway Resurfacing</li>
                <li>• HOA Parking Maintenance</li>
                <li>• Belgian Block Transitions</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-12 border border-gray-800 self-center text-center">
             <p className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 mb-6 italic">Dispatching Legacy Crews from Chester HQ</p>
             <a href="tel:8044461296" className="text-5xl font-black text-[#ffcc00] hover:text-white transition-colors">804-446-1296</a>
          </div>
        </div>
      </section>
    </main>
  ),
});
