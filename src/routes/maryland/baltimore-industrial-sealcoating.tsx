import { createFileRoute, Link } from '@tanstack/react-router';
import { MapPin, Shield, HardHat, Phone } from 'lucide-react';

export const Route = createFileRoute('/maryland/baltimore-industrial-sealcoating')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#ffcc00] selection:text-black">
      {/* HERO SECTION */}
      <section className="relative py-32 px-6 lg:px-12 bg-[#1a1a1a] border-b-[8px] border-[#ffcc00] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-[#1a1a1a] z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="bg-[#ffcc00] text-black px-6 py-2 font-black uppercase text-xs tracking-[0.3em] mb-8 inline-block shadow-lg">
            Industrial Sealcoating — Baltimore, MD
          </span>
          <h1 className="text-6xl md:text-8xl font-black uppercase text-white leading-none tracking-tighter mb-6">
            Baltimore Industrial <br />
            <span className="text-[#ffcc00]">Sealcoating</span>
          </h1>
          <p className="text-2xl text-zinc-400 italic font-bold max-w-3xl mx-auto leading-relaxed">
            Heavy-duty industrial sealcoating and asphalt preservation for Baltimore's port-adjacent facilities, distribution centers, and manufacturing campuses — formulated to resist petroleum spills, heavy axle loads, and the Chesapeake region's moisture-heavy climate.
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
              Industrial Services in <span className="text-[#ffcc00]">Baltimore</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#ffcc00] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] p-8 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all shadow-2xl">
              <Shield className="text-[#ffcc00] w-12 h-12 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4 text-white">Industrial Sealcoating</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Coal tar–modified and asphalt emulsion sealcoat systems engineered for Baltimore's industrial zones — oil-resistant formulas for port facilities, fuel depots, and heavy manufacturing yards where petroleum exposure is constant.
              </p>
              <Link to="/sealcoating" className="text-[#ffcc00] font-bold uppercase tracking-widest text-sm hover:text-white flex items-center gap-2">View Sealcoating &rarr;</Link>
            </div>

            <div className="bg-[#1a1a1a] p-8 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all shadow-2xl">
              <HardHat className="text-[#ffcc00] w-12 h-12 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4 text-white">Structural Paving & Overlays</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Full-depth reclamation, base stabilization, and mill-and-overlay services for Baltimore's aging industrial lots. Our VDOT-grade structural stone base and 96% Marshall compaction outlast the competition on high-tonnage truck routes.
              </p>
              <Link to="/commercial" className="text-[#ffcc00] font-bold uppercase tracking-widest text-sm hover:text-white flex items-center gap-2">View Commercial &rarr;</Link>
            </div>

            <div className="bg-[#1a1a1a] p-8 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all shadow-2xl">
              <MapPin className="text-[#ffcc00] w-12 h-12 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4 text-white">Port & Logistics Facilities</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Asphalt maintenance programs for the Port of Baltimore-adjacent warehouses, intermodal yards, and container staging areas — zero-downtime scheduling keeps your supply chain moving while we work.
              </p>
              <Link to="/commercial" className="text-[#ffcc00] font-bold uppercase tracking-widest text-sm hover:text-white flex items-center gap-2">View Commercial &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6 lg:px-12 bg-[#1a1a1a] border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-6">
              Why Baltimore Chooses <br /><span className="text-[#ffcc00]">J. Worden & Sons</span>
            </h2>
            <div className="space-y-6 text-lg text-zinc-300">
              <p>4th-generation family business since 1984. Virginia Class A Licensed with MDOT prequalification pursuit underway. Our proximity to Baltimore and established Chesapeake-region track record makes us the trusted choice for industrial sealcoating and structural paving contracts.</p>
              <ul className="space-y-4 font-bold mt-8">
                <li className="flex items-center gap-4 text-white">
                  <span className="w-3 h-3 bg-[#ffcc00] rounded-sm"></span> MDOT-Specification Compliant Mixes
                </li>
                <li className="flex items-center gap-4 text-white">
                  <span className="w-3 h-3 bg-[#ffcc00] rounded-sm"></span> 96% Marshall Unit Weight Compaction
                </li>
                <li className="flex items-center gap-4 text-white">
                  <span className="w-3 h-3 bg-[#ffcc00] rounded-sm"></span> Oil-Resistant Industrial Sealcoat Formulas
                </li>
                <li className="flex items-center gap-4 text-white">
                  <span className="w-3 h-3 bg-[#ffcc00] rounded-sm"></span> $9/Ton Oil-Price Shield on Every Quote
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2 bg-black p-10 border-l-[8px] border-[#ffcc00] shadow-2xl">
            <h3 className="text-3xl font-black uppercase text-white mb-4">Baltimore Industrial Estimate</h3>
            <p className="text-zinc-400 mb-8 italic">Our dispatch team is ready. We provide detailed, written structural specifications for every Baltimore industrial project — protecting your facility and your budget.</p>
            <a href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new" target="_blank" rel="noreferrer" className="block text-center bg-[#ffcc00] text-black px-8 py-5 font-black uppercase tracking-widest text-xl hover:bg-white transition-colors shadow-xl">
              Request Free Estimate
            </a>
          </div>
        </div>
      </section>
    </main>
  ),
});
