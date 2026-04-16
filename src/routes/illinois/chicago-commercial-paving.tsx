import { createFileRoute, Link } from '@tanstack/react-router';
import { MapPin, Shield, HardHat, Phone } from 'lucide-react';

export const Route = createFileRoute('/illinois/chicago-commercial-paving')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#ffcc00] selection:text-black">
      {/* HERO SECTION */}
      <section className="relative py-32 px-6 lg:px-12 bg-[#1a1a1a] border-b-[8px] border-[#ffcc00] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-[#1a1a1a] z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="bg-[#ffcc00] text-black px-6 py-2 font-black uppercase text-xs tracking-[0.3em] mb-8 inline-block shadow-lg">
            Commercial Paving — Chicago, IL
          </span>
          <h1 className="text-6xl md:text-8xl font-black uppercase text-white leading-none tracking-tighter mb-6">
            Chicago Commercial <br />
            <span className="text-[#ffcc00]">Paving</span>
          </h1>
          <p className="text-2xl text-zinc-400 italic font-bold max-w-3xl mx-auto leading-relaxed">
            Industrial-grade commercial asphalt paving across Chicago and the greater metro area, engineered with our signature VDOT-grade structural stone base built to withstand Illinois's brutal freeze-thaw cycles and heavy commercial traffic loads.
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <a href="tel:8044461296" className="flex items-center gap-3 bg-[#ffcc00] text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors shadow-xl">
              <Phone size={20} fill="currentColor" />
              Call Now: 804-446-1296
            </a>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="py-24 px-6 lg:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter mb-4">
              Commercial Services in <span className="text-[#ffcc00]">Chicago</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#ffcc00] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] p-8 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all shadow-2xl">
              <HardHat className="text-[#ffcc00] w-12 h-12 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4 text-white">Industrial Lot Paving</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Heavy-load industrial parking lots, truck courts, and warehouse aprons across Chicago's industrial corridors. Our structural base exceeds IDOT requirements for sustained Class 9 and Class 10 truck traffic.
              </p>
              <Link to="/commercial" className="text-[#ffcc00] font-bold uppercase tracking-widest text-sm hover:text-white flex items-center gap-2">View Commercial &rarr;</Link>
            </div>

            <div className="bg-[#1a1a1a] p-8 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all shadow-2xl">
              <MapPin className="text-[#ffcc00] w-12 h-12 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4 text-white">QSR & Retail Parking Lots</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Fast-track QSR (Quick Service Restaurant) and retail parking lot replacements in Chicago's dense commercial corridors — ADA-compliant layouts, striping, and zero-downtime scheduling for KFC/KBP and national chain clients.
              </p>
              <Link to="/commercial" className="text-[#ffcc00] font-bold uppercase tracking-widest text-sm hover:text-white flex items-center gap-2">View Commercial &rarr;</Link>
            </div>

            <div className="bg-[#1a1a1a] p-8 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all shadow-2xl">
              <Shield className="text-[#ffcc00] w-12 h-12 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4 text-white">Crack Repair & Sealcoating</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Chicago's freeze-thaw cycles destroy inferior asphalt. Our hot-rubberized crack filling and coal tar–modified sealcoating protects commercial surfaces through Illinois winters, with the $9/ton oil-price shield built into every quote.
              </p>
              <Link to="/sealcoating" className="text-[#ffcc00] font-bold uppercase tracking-widest text-sm hover:text-white flex items-center gap-2">View Sealcoating &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6 lg:px-12 bg-[#1a1a1a] border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-6">
              Why Chicago Commercial Clients Choose <br /><span className="text-[#ffcc00]">J. Worden & Sons</span>
            </h2>
            <div className="space-y-6 text-lg text-zinc-300">
              <p>4th-generation family business since 1984. Our IDOT-compliant structural specifications and 96% Marshall Unit Weight compaction standard deliver commercial lots that outlast the Windy City's worst winters without premature cracking or rutting.</p>
              <ul className="space-y-4 font-bold mt-8">
                <li className="flex items-center gap-4 text-white">
                  <span className="w-3 h-3 bg-[#ffcc00] rounded-sm"></span> IDOT-Compliant Structural Stone Base
                </li>
                <li className="flex items-center gap-4 text-white">
                  <span className="w-3 h-3 bg-[#ffcc00] rounded-sm"></span> 96% Marshall Unit Weight Compaction
                </li>
                <li className="flex items-center gap-4 text-white">
                  <span className="w-3 h-3 bg-[#ffcc00] rounded-sm"></span> KBP/KFC Remodel Portfolio — Chicago Area
                </li>
                <li className="flex items-center gap-4 text-white">
                  <span className="w-3 h-3 bg-[#ffcc00] rounded-sm"></span> $9/Ton Oil-Price Shield on Every Quote
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2 bg-black p-10 border-l-[8px] border-[#ffcc00] shadow-2xl">
            <h3 className="text-3xl font-black uppercase text-white mb-4">Chicago Commercial Estimate</h3>
            <p className="text-zinc-400 mb-8 italic">Our dispatch team is ready. We provide detailed, written structural specifications for every Chicago commercial project — no surprises, no vague bids.</p>
            <a href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new" target="_blank" rel="noreferrer" className="block text-center bg-[#ffcc00] text-black px-8 py-5 font-black uppercase tracking-widest text-xl hover:bg-white transition-colors shadow-xl">
              Request Free Estimate
            </a>
          </div>
        </div>
      </section>
    </main>
  ),
});
