import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/concrete')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            CSI Division 03 · ACI 318 · VDOT Road &amp; Bridge Specs
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            STRUCTURAL <br /> <span className="text-white italic">CONCRETE</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            From foundations to ADA ramps, curb &amp; gutter to retaining walls — every pour engineered to ACI 318 and VDOT Road &amp; Bridge specifications.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black uppercase text-white mb-12">
            Concrete <span className="text-[#ffcc00]">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Foundations &amp; Slabs', desc: 'Reinforced concrete foundations, flatwork slabs, and industrial floor pours for commercial and government projects.' },
              { title: 'Sidewalks &amp; Curb/Gutter', desc: 'ADA-compliant sidewalks, concrete curbs, gutters, and curb-ramp reconstructions per VDOT Road &amp; Bridge Specs.' },
              { title: 'ADA Ramps', desc: 'Compliant ADA pedestrian ramp construction and reconstruction including detectable warning surfaces and proper cross-slopes.' },
              { title: 'Retaining Walls', desc: 'Structural cast-in-place and masonry retaining walls designed per VDOT and municipal standards for cut/fill slopes.' },
              { title: 'Concrete Paving', desc: 'Portland cement concrete (PCC) pavement for driveways, parking areas, fire lanes, and truck courts.' },
              { title: 'Patching &amp; Repair', desc: 'Full-depth concrete repairs, partial-depth patches, and joint resealing for deteriorated pavement sections.' },
            ].map((svc) => (
              <div key={svc.title} className="bg-[#1a1a1a] border-l-[6px] border-[#ffcc00] p-8 hover:border-[#ffcc00] transition-all">
                <h3 className="text-xl font-black text-[#ffcc00] uppercase mb-4" dangerouslySetInnerHTML={{ __html: svc.title }} />
                <p className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: svc.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-24 px-6 bg-[#1a1a1a] text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
          <div className="text-left">
            <h2 className="text-5xl font-black uppercase text-white mb-6">
              Built to <span className="text-[#ffcc00]">The Standard</span>
            </h2>
            <div className="space-y-4">
              {[
                'ACI 318 — Building Code Requirements for Structural Concrete',
                'VDOT Road &amp; Bridge Specifications — Concrete Pavement',
                'ASTM C94 — Ready-Mixed Concrete',
                'ADA Standards for Accessible Design',
                'OSHA 29 CFR 1926 Subpart Q — Concrete &amp; Masonry',
              ].map((std) => (
                <div key={std} className="flex items-start gap-3">
                  <span className="text-[#ffcc00] font-black mt-1">▶</span>
                  <span className="text-gray-300 font-bold" dangerouslySetInnerHTML={{ __html: std }} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black border border-gray-800 p-12 text-left">
            <h3 className="text-3xl font-black text-[#ffcc00] uppercase mb-6">Request a Concrete Estimate</h3>
            <p className="text-gray-400 font-bold leading-relaxed mb-8">
              Call our Chester, VA HQ for a fast response on concrete foundations, flatwork, ADA compliance, and government work.
            </p>
            <a href="tel:8044461296" className="inline-block bg-[#ffcc00] text-black font-black uppercase tracking-widest px-10 py-4 text-lg hover:bg-white transition-colors">
              804-446-1296
            </a>
          </div>
        </div>
      </section>
    </main>
  ),
});
