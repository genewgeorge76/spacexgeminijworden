import { createFileRoute } from '@tanstack/react-router';

const ROOFING_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://jwordenasphaltpaving.com/roofing#service',
  name: 'Commercial Roofing — TPO, EPDM & Modified Bitumen',
  description: 'Commercial and industrial roofing systems including TPO, EPDM, and modified bitumen membranes. FM Global RoofNav compliant. UL Listed assemblies. CSI Division 07 thermal & moisture protection.',
  url: 'https://jwordenasphaltpaving.com/roofing',
  serviceType: 'Commercial Roofing',
  provider: {
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://jwordenasphaltpaving.com/#business',
    name: 'J. Worden & Sons Asphalt Paving',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Roofing Services',
    itemListElement: [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'TPO Roofing Installation', description: 'Thermoplastic polyolefin (TPO) single-ply roofing membrane installation for commercial buildings.' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'EPDM Roofing Installation', description: 'Ethylene propylene diene monomer (EPDM) rubber roofing for flat and low-slope commercial roofs.' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Modified Bitumen Roofing', description: 'Modified bitumen roofing system installation — torch-applied and cold-applied options.' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Roof Waterproofing & Insulation', description: 'Commercial roof insulation and waterproofing per NRCA guidelines.' } },
    ],
  },
};

export const Route = createFileRoute('/roofing')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ROOFING_SCHEMA) }} />
      {/* Hero */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            CSI Division 07 · FM Global RoofNav · UL Listed Assemblies
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            COMMERCIAL <br /> <span className="text-white italic">ROOFING</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            TPO, EPDM, and modified bitumen roofing systems installed to FM Global RoofNav and UL Listed assembly standards for commercial and government buildings.
          </p>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black uppercase text-white mb-12">
            Roofing <span className="text-[#ffcc00]">Systems</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'TPO — Thermoplastic Polyolefin',
                desc: 'Energy-efficient single-ply membrane ideal for commercial flat roofs. FM Global-approved and ENERGY STAR certified. Hot-air welded seams for superior water resistance.',
                tags: ['FM Global', 'ENERGY STAR', 'ASTM D6878'],
              },
              {
                title: 'EPDM — Rubber Membrane',
                desc: 'Durable ethylene propylene diene monomer membrane for long-life commercial applications. Resists UV degradation, hail, and freeze-thaw cycles. Ideal for schools and warehouses.',
                tags: ['ASTM D4637', 'UL Listed', '20-Year Warranty'],
              },
              {
                title: 'Modified Bitumen',
                desc: 'Two-ply APP or SBS modified bitumen systems for superior tear strength. Used on restaurant chains, government buildings, and facilities with rooftop equipment loads.',
                tags: ['APP / SBS', 'Class A Fire Rating', 'NRCA Guidelines'],
              },
            ].map((sys) => (
              <div key={sys.title} className="bg-[#1a1a1a] border-l-[6px] border-[#ffcc00] p-8">
                <h3 className="text-xl font-black text-[#ffcc00] uppercase mb-4">{sys.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{sys.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {sys.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-black px-3 py-1 bg-black border border-gray-800 text-[#ffcc00]">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Worden */}
      <section className="py-24 px-6 bg-[#1a1a1a] text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
          <div className="text-left">
            <h2 className="text-5xl font-black uppercase text-white mb-6">
              Why <span className="text-[#ffcc00]">Worden Roofing?</span>
            </h2>
            <ul className="space-y-4">
              {[
                'General Contractor–managed projects — one point of accountability',
                'FM Global RoofNav assemblies for insurance compliance',
                'Warranty-backed systems up to 20 years NDL',
                'KFC, Taco Bell, and QSR remodel experience',
                'OSHA 30 certified crews, full insurance &amp; bonding',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <span className="text-[#ffcc00] font-black mt-1">▶</span>
                  <span className="text-gray-300 font-bold" dangerouslySetInnerHTML={{ __html: pt }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black border border-gray-800 p-12 text-left">
            <h3 className="text-3xl font-black text-[#ffcc00] uppercase mb-6">Request a Roofing Estimate</h3>
            <p className="text-gray-400 font-bold leading-relaxed mb-8">
              Commercial roofing inspections and estimates from our Chester, VA team. Serving Virginia and 12 states.
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
