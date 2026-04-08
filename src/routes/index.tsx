import { createFileRoute } from '@tanstack/react-router';
import ContactForm from '../components/ContactForm';

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

      {/* The Worden Standard & Awards Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-950 relative border-y border-zinc-800 overflow-hidden">
        {/* Dark High-End Background with Gold Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#ffcc00]/10 via-zinc-950 to-black z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight drop-shadow-lg mb-6">
              <span className="text-[#ffcc00]">The J. Worden & Sons</span><br />Asphalt Standard
            </h2>
            <div className="w-32 h-1.5 bg-[#ffcc00] mx-auto"></div>
          </div>

          {/* The Awards Row (3xl Gold Text) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24 text-center">
            <div className="flex flex-col items-center justify-center p-8 bg-[#ffcc00] rounded-2xl border-4 border-white shadow-[0_0_30px_rgba(255,204,0,0.4)] transform hover:-translate-y-2 transition-transform">
              <p className="text-3xl md:text-4xl font-black text-black uppercase leading-tight drop-shadow-sm">
                Voted Best Asphalt Paving Company
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl border border-zinc-800 shadow-2xl hover:border-[#ffcc00]/50 transition-all">
              <p className="text-3xl md:text-4xl font-black text-[#ffcc00] uppercase leading-tight drop-shadow-[0_2px_10px_rgba(255,204,0,0.3)]">
                4-Time Best of Houzz Winner
              </p>
              <span className="text-2xl font-bold text-white mt-4 tracking-wider">(2023, 2016, 2015, 2014)</span>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl border border-zinc-800 shadow-2xl hover:border-[#ffcc00]/50 transition-all">
              <p className="text-3xl md:text-4xl font-black text-[#ffcc00] uppercase leading-tight drop-shadow-[0_2px_10px_rgba(255,204,0,0.3)]">
                2026 Houzz Authority Certified
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl border border-zinc-800 shadow-2xl hover:border-[#ffcc00]/50 transition-all">
              <p className="text-3xl md:text-4xl font-black text-[#ffcc00] uppercase leading-tight drop-shadow-[0_2px_10px_rgba(255,204,0,0.3)]">
                Top Contractor Award Winner
              </p>
              <span className="text-xl font-bold text-zinc-300 mt-4 tracking-wide">(Pavement & Maintenance Magazine)</span>
            </div>
          </div>

          {/* Trust Badges Sub-section */}
          <div className="bg-black/80 border border-[#ffcc00]/30 rounded-3xl p-10 md:p-16 shadow-[0_0_50px_rgba(255,204,0,0.1)] mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center text-center">
              <a href="https://www.houzz.com/pro/jwordenandsonspaving/j-worden-sons-paving-l-l-c" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center">
                <div className="w-20 h-20 mb-6 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center group-hover:border-[#ffcc00] transition-colors shadow-lg">
                  <span className="text-4xl font-black text-[#ffcc00]">H</span>
                </div>
                <span className="text-3xl md:text-4xl font-black text-white group-hover:text-[#ffcc00] transition-colors mb-6">Recommended on Houzz</span>
                <span className="inline-block px-8 py-4 bg-[#ffcc00] text-black text-xl font-black uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(255,204,0,0.3)] group-hover:bg-white transition-colors">View Our Profile →</span>
              </a>

              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl md:text-7xl font-black text-[#ffcc00] mb-4 drop-shadow-[0_2px_15px_rgba(255,204,0,0.4)]">500+</span>
                <span className="text-3xl md:text-4xl font-black text-white">Ideabook Saves</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#ffcc00] text-black px-10 py-8 rounded-3xl shadow-[0_0_40px_rgba(255,204,0,0.4)] border-4 border-white flex flex-col items-center transform hover:scale-105 transition-transform w-full max-w-md">
                  <span className="text-6xl md:text-7xl font-black mb-2 drop-shadow-md">A+</span>
                  <span className="text-3xl md:text-4xl font-black uppercase text-center leading-tight">BBB Accredited<br /><span className="text-xl font-bold opacity-80 mt-2 block">Since 1994</span></span>
                </div>
              </div>
            </div>
          </div>
          {/* Core Service Pillar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl">
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase text-white mb-6 border-b-2 border-zinc-800 pb-4">
                The 6-Inch Structural Base
              </h3>
              <div className="space-y-6 text-xl text-zinc-300 leading-relaxed">
                <p>
                  While competitors cut corners, we establish the gold standard for longevity and drainage. The secret to an asphalt surface that lasts decades isn't just the blacktop—it's what lies beneath.
                </p>
                <p>
                  Our signature <strong className="text-[#ffcc00] font-bold">6-Inch Structural Stone Base</strong> provides unparalleled load-bearing capacity and superior water runoff management. This engineered foundation prevents cracking, settling, and water damage, consistently outperforming standard industry installations.
                </p>
                <ul className="mt-8 space-y-4 font-bold text-white text-lg">
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-[#ffcc00] rounded-sm shadow-[0_0_8px_rgba(255,204,0,0.8)]"></span>
                    Maximum Weight Distribution & Load Capacity
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-[#ffcc00] rounded-sm shadow-[0_0_8px_rgba(255,204,0,0.8)]"></span>
                    Optimized Sub-Surface Drainage
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-[#ffcc00] rounded-sm shadow-[0_0_8px_rgba(255,204,0,0.8)]"></span>
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
                  <span className="block text-8xl font-black text-[#ffcc00] mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">6"</span>
                  <span className="block text-3xl font-black uppercase tracking-widest text-white drop-shadow-md">Structural Base</span>
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

      {/* DISPATCH / CONTACT SECTION */}
      <section className="py-32 px-6 lg:px-12 bg-black border-t border-[#ffcc00]/20 relative overflow-hidden">
        {/* Subtle grid pattern for construction feel */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tighter mb-4">
              Dispatch an <span className="text-[#ffcc00]">Estimator</span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-bold italic max-w-3xl mx-auto">
              Schedule an on-site structural evaluation for your next paving project.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </section>
    </main>
  ),
});
