import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/services')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Virginia Class A General Contractor · CSI Divisions 01–33
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            ALL <br /> <span className="text-white italic">SERVICES</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            Full-service general contracting capability spanning all CSI MasterFormat divisions. One contractor. One standard. Every trade.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black uppercase text-white mb-12">
            Core <span className="text-[#ffcc00]">Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { route: '/commercial', title: 'Commercial Paving', desc: 'High-traffic parking lots, drive-thrus, and national brand partner projects. KFC, Taco Bell, Food Lion.' },
              { route: '/residential', title: 'Residential Paving', desc: 'Estate driveways and subdivision streets. 6" structural stone base, 96% Marshall compaction — guaranteed.' },
              { route: '/sealcoating', title: 'Sealcoating', desc: 'Armor-Kote™ molecular defense sealant. Penetrates aggregate to restore bitumen oils and extend pavement life.' },
              { route: '/masonry', title: 'Masonry', desc: 'CMU block, brick veneer, stone, mortar (ASTM C270). Structural and decorative masonry for all project types.' },
              { route: '/concrete', title: 'Concrete', desc: 'Foundations, slabs, sidewalks, curb &amp; gutter, ADA ramps, retaining walls — ACI 318 &amp; VDOT specs.' },
              { route: '/roofing', title: 'Commercial Roofing', desc: 'TPO, EPDM, and modified bitumen systems. FM Global RoofNav approved, UL Listed assemblies.' },
              { route: '/gallery', title: 'Project Gallery', desc: 'Before-and-after photos from completed paving, masonry, and GC projects across Virginia and beyond.' },
              { route: '/portal', title: 'GC Portal', desc: 'Insurance certificates, W-9, KFC responsibility matrix, and vendor documents for national brand procurement.' },
              { route: '/gc-bid', title: 'Government Bids', desc: 'SAM.gov, state DOT, and municipal bid pursuit. Davis-Bacon, DBE compliance, FAR, BABA-ready proposals.' },
            ].map((svc) => (
              <a key={svc.route} href={svc.route} className="block bg-[#1a1a1a] border-l-[6px] border-[#ffcc00] p-8 hover:bg-zinc-900 transition-colors group">
                <h3 className="text-xl font-black text-[#ffcc00] uppercase mb-4 group-hover:text-white transition-colors">{svc.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: svc.desc }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CSI Divisions */}
      <section className="py-24 px-6 bg-[#1a1a1a] text-left">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black uppercase text-white mb-4">
            CSI <span className="text-[#ffcc00]">MasterFormat Coverage</span>
          </h2>
          <p className="text-gray-400 font-bold mb-12 text-lg">All divisions self-performed or managed under our Virginia Class A license:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Div 01 — General Requirements', 'Div 02 — Existing Conditions', 'Div 03 — Concrete',
              'Div 04 — Masonry', 'Div 05 — Metals', 'Div 06 — Carpentry',
              'Div 07 — Roofing &amp; Waterproofing', 'Div 08 — Openings', 'Div 09 — Finishes',
              'Div 10 — Specialties', 'Div 11 — Equipment', 'Div 22 — Plumbing',
              'Div 23 — HVAC', 'Div 26 — Electrical', 'Div 31 — Earthwork',
              'Div 32 — Exterior Improvements', 'Div 33 — Utilities', 'Div 21 — Fire Suppression',
            ].map((div) => (
              <div key={div} className="bg-black border border-gray-800 px-4 py-3 text-xs font-bold text-gray-400 hover:border-[#ffcc00]/40 hover:text-[#ffcc00] transition-all" dangerouslySetInnerHTML={{ __html: div }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black uppercase text-black mb-6">One Call. Every Trade.</h2>
          <p className="text-xl text-black/70 font-bold mb-10 max-w-2xl mx-auto">Our Class A license and 40 years of experience means you never need a second contractor.</p>
          <a href="tel:8044461296" className="inline-block bg-black text-[#ffcc00] font-black uppercase tracking-widest px-12 py-5 text-xl hover:bg-zinc-900 transition-colors">
            804-446-1296
          </a>
        </div>
      </section>
    </main>
  ),
});
