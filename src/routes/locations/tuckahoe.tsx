import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/tuckahoe')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      {/* LOCAL AUTHORITY HERO */}
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm mb-6 inline-block tracking-widest">
            Tuckahoe Regional Authority
          </span>
          <h1 className="text-7xl md:text-8xl font-black uppercase text-[#ffcc00] leading-none mb-6">
            Tuckahoe <br /> Paving & Cobblestone
          </h1>
          <p className="text-3xl font-bold italic text-white max-w-4xl leading-tight mb-8">
            70+ Projects Completed in Tuckahoe This Month Alone. 
          </p>
          <a href="tel:8044461296" className="text-4xl font-black border-4 border-[#ffcc00] px-8 py-4 inline-block hover:bg-[#ffcc00] hover:text-black transition-all">
            804-446-1296
          </a>
        </div>
      </section>

      {/* THE TUCKAHOE ENHANCEMENT SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-black uppercase mb-6 leading-tight">
              Why We Own the <br /><span className="text-[#ffcc00]">Tuckahoe Market</span>
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              Tuckahoe homeowners demand more than just blacktop. We specialize in the **Asphalt-to-Cobblestone integration** that defines the neighborhood's aesthetic. Whether it's a Belgian block apron or a full cobblestone border, we build it on our signature **6-inch compacted stone base**.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center font-bold text-[#ffcc00]">
                <span className="mr-3">✔</span> 70+ Recent Local References
              </li>
              <li className="flex items-center font-bold">
                <span className="mr-3 text-[#ffcc00]">✔</span> Custom Cobblestone Edging & Aprons
              </li>
              <li className="flex items-center font-bold">
                <span className="mr-3 text-[#ffcc00]">✔</span> 4th Generation Structural Engineering
              </li>
            </ul>
          </div>
          <div className="border-8 border-gray-800 p-8 bg-black/50">
            <h3 className="text-3xl font-black uppercase text-[#ffcc00] mb-4 text-center">Tuckahoe Standard</h3>
            <p className="text-center italic text-gray-300">
              "In Tuckahoe, your driveway is your curb appeal. We ensure the transition between asphalt and cobblestone is seamless and structurally sound for 20+ years."
            </p>
          </div>
        </div>
      </section>
    </main>
  ),
});
