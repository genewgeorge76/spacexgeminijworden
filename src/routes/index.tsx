import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#ffcc00] selection:text-black">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 px-6 lg:px-12 border-b-[8px] border-[#ffcc00] overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black z-0"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="inline-block text-[#ffcc00] font-bold uppercase tracking-[0.2em] text-sm mb-6 border border-[#ffcc00]/30 px-4 py-2 rounded-full">
            3 Generations of Excellence
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white leading-[1.1] tracking-tight">
            Elite Asphalt Paving &<br />
            <span className="text-[#ffcc00]">Structural Foundation Specialists</span><br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-zinc-400">in Richmond, VA</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mt-8 max-w-3xl font-medium leading-relaxed border-l-4 border-[#ffcc00] pl-6">
            Delivering uncompromising quality and 3 generations of excellence serving Richmond 23221 and 41 surrounding cities with premium paving solutions.
          </p>
        </div>
      </section>

      {/* The Worden Standard Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-8 border-b-2 border-zinc-800 pb-6">
                The Worden Standard
              </h2>
              <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
                <p>
                  While competitors cut corners, we establish the gold standard for longevity and drainage. The secret to an asphalt surface that lasts decades isn't just the blacktop—it's what lies beneath.
                </p>
                <p>
                  Our signature <strong className="text-[#ffcc00] font-bold">6-Inch Structural Stone Base</strong> provides unparalleled load-bearing capacity and superior water runoff management. This engineered foundation prevents cracking, settling, and water damage, consistently outperforming standard industry installations.
                </p>
                <ul className="mt-8 space-y-4 font-semibold text-white">
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-[#ffcc00] rounded-sm"></span>
                    Maximum Weight Distribution & Load Capacity
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-[#ffcc00] rounded-sm"></span>
                    Optimized Sub-Surface Drainage
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-[#ffcc00] rounded-sm"></span>
                    Immunity to Frost-Heave and Subsoil Shifting
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-black p-2 rounded-xl border border-zinc-800 shadow-2xl relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ffcc00]/20 to-transparent blur-lg opacity-50 rounded-xl"></div>
              <div className="aspect-square md:aspect-video lg:aspect-square bg-zinc-950 rounded-lg relative flex items-center justify-center border border-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/asphalt-paving-with-paver.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
                <div className="text-center relative z-10 p-8">
                  <span className="block text-7xl font-black text-[#ffcc00] mb-2 drop-shadow-md">6"</span>
                  <span className="block text-2xl font-bold uppercase tracking-widest text-white drop-shadow-md">Structural Base</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              Our Premium <span className="text-[#ffcc00]">Services</span>
            </h2>
            <div className="w-24 h-1 bg-[#ffcc00] mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group bg-zinc-900 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-300 p-8 rounded-xl relative overflow-hidden shadow-lg hover:shadow-[#ffcc00]/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcc00]/5 rounded-bl-full -z-0 group-hover:bg-[#ffcc00]/10 transition-colors"></div>
              <h3 className="text-2xl font-bold uppercase text-white mb-4 relative z-10 group-hover:text-[#ffcc00] transition-colors">Residential Estate Paving</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                Transform your property's entrance with our premium residential estate paving. We deliver meticulously graded, aesthetically flawless driveways built on our structural stone base, ensuring your investment enhances your home's curb appeal for decades.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group bg-zinc-900 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-300 p-8 rounded-xl relative overflow-hidden shadow-lg hover:shadow-[#ffcc00]/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcc00]/5 rounded-bl-full -z-0 group-hover:bg-[#ffcc00]/10 transition-colors"></div>
              <h3 className="text-2xl font-bold uppercase text-white mb-4 relative z-10 group-hover:text-[#ffcc00] transition-colors">Commercial Parking Lots</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                High-traffic surfaces demand heavy-duty solutions. From the precision-graded <strong>CVS project</strong> to the expansive, heavy-load capable <strong>Car Lot in Midlothian</strong>, our commercial division executes ADA-compliant, high-durability installations that keep your business running smoothly.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group bg-zinc-900 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-300 p-8 rounded-xl relative overflow-hidden shadow-lg hover:shadow-[#ffcc00]/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcc00]/5 rounded-bl-full -z-0 group-hover:bg-[#ffcc00]/10 transition-colors"></div>
              <h3 className="text-2xl font-bold uppercase text-white mb-4 relative z-10 group-hover:text-[#ffcc00] transition-colors">Tar & Chip Paving</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                Achieve a rustic, elegant aesthetic without sacrificing durability. Our Tar & Chip (Macadam) surfaces provide excellent traction, require minimal maintenance, and offer a classic textured finish ideal for long private roads and sweeping estate drives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Focus Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-6">
              Headquartered in <span className="text-[#ffcc00]">Chester</span>
            </h2>
            <div className="bg-black/50 p-6 rounded-xl border border-zinc-800 inline-block mb-8 shadow-inner">
              <p className="text-xl font-bold text-white tracking-wide">1601 Ware Bottom Springs Rd</p>
              <p className="text-zinc-400 mt-1">Chester, VA 23836</p>
            </div>
            <p className="text-lg text-zinc-300 mb-4 max-w-lg leading-relaxed">
              Strategically located to dispatch our heavy equipment fleet quickly and efficiently across Central Virginia.
            </p>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="bg-black border border-zinc-800 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#ffcc00]"></div>
              <h3 className="text-xl font-bold uppercase text-white mb-8 tracking-wider">Primary Service Areas</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-lg text-zinc-300 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ffcc00] rounded-full shadow-[0_0_8px_rgba(255,204,0,0.8)]"></div>
                  <span>Midlothian</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ffcc00] rounded-full shadow-[0_0_8px_rgba(255,204,0,0.8)]"></div>
                  <span>Chesterfield</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ffcc00] rounded-full shadow-[0_0_8px_rgba(255,204,0,0.8)]"></div>
                  <span>Powhatan</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ffcc00] rounded-full shadow-[0_0_8px_rgba(255,204,0,0.8)]"></div>
                  <span>Richmond</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ffcc00] rounded-full shadow-[0_0_8px_rgba(255,204,0,0.8)]"></div>
                  <span>Glen Allen</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ffcc00] rounded-full shadow-[0_0_8px_rgba(255,204,0,0.8)]"></div>
                  <span>Mechanicsville</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  ),
});
