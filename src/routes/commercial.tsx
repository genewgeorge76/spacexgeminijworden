import { createFileRoute } from '@tanstack/react-router'

const COMMERCIAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://jwordenasphaltpaving.com/commercial#service',
  name: 'Commercial Asphalt Paving',
  description: 'National commercial asphalt paving for parking lots, QSR fast-track developments, and municipal infrastructure. VDOT Section 315 compliant with 96% Marshall compaction standard.',
  url: 'https://jwordenasphaltpaving.com/commercial',
  serviceType: 'Commercial Asphalt Paving',
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
    name: 'Commercial Paving Services',
    itemListElement: [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Commercial Parking Lot Installation', description: 'Full-depth commercial asphalt parking lot installation to VDOT Section 315 specifications with 96% Marshall compaction.' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: "QSR Fast-Track Development (90-Day)", description: "90-day turnkey paving for quick-service restaurant developments (KFC, Arby's, Taco Bell)." } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'ADA Compliance Paving', description: 'ADA-compliant paving including accessible parking, curb cuts, and surface grading.' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Municipal-Grade Sealcoating', description: 'Coal-tar or asphalt emulsion sealcoating for commercial surfaces.' } },
    ],
  },
};

export const Route = createFileRoute('/commercial')({
  component: () => (
    <main className="min-h-screen bg-zinc-950 font-sans text-white selection:bg-[#ffcc00] selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COMMERCIAL_SCHEMA) }} />

      {/* COMMERCIAL HERO: NATIONAL SCALE */}
      <section className="relative py-36 px-6 lg:px-12 bg-black border-b-[12px] border-[#ffcc00] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/cvs-asphalt-paving.jpg')] bg-cover bg-center mix-blend-luminosity"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="inline-block text-[#ffcc00] font-black uppercase tracking-[0.3em] text-sm mb-6 bg-white/5 px-4 py-2 rounded-sm border border-[#ffcc00]/20">
            Infrastructure Authority
          </span>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-white mb-8 speakable">
            National Brand <br />
            <span className="text-[#ffcc00]">Vetted.</span>
          </h1>
          <p className="text-2xl md:text-3xl font-bold uppercase italic text-zinc-500 max-w-4xl leading-tight border-l-8 border-[#ffcc00] pl-8">
            90-Day QSR Fast-Track Specialists. ADA Compliance Experts. <br />
            The Standard for KFC, Arby's, and Taco Bell Development.
          </p>
        </div>
      </section>

      {/* THE PROOF VAULT */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black uppercase tracking-tight text-white mb-4">
                The Commercial <span className="text-[#ffcc00]">Vault</span>
              </h2>
              <p className="text-xl text-zinc-400 font-medium">
                Verifiable proof of high-capacity infrastructure delivery for national quick-service restaurant (QSR) brands.
              </p>
            </div>
            <div className="bg-zinc-900 px-8 py-4 border border-zinc-800 rounded-xl shrink-0">
              <span className="text-[#ffcc00] font-black text-4xl block">1984</span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Continuous Operations</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">

            {/* PROJECT: THE BIG CHICKEN (KFC) */}
            <div className="group bg-zinc-900 border-2 border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-4xl font-black uppercase text-white tracking-tighter">
                    The Big Chicken <br /><span className="text-[#ffcc00] text-2xl">(KFC Landmark)</span>
                  </h3>
                  <span className="bg-[#ffcc00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase shrink-0 ml-4">Official Remodel</span>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  J. Worden & Sons executed the complete lot repave and ADA parking restructuring for this national landmark. Vetted by high-level GCs for a $2.2M facility overhaul.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider">
                    <div className="w-2 h-2 bg-[#ffcc00] rounded-full"></div>
                    Responsibility Matrix Certified
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider">
                    <div className="w-2 h-2 bg-[#ffcc00] rounded-full"></div>
                    Heavy Traffic Engineering
                  </div>
                </div>
                <a
                  href="https://www.dropbox.com/scl/fi/698i3dtphbwfr6egjcppd/KFC-Responsibility-Matrix-GC-2.13.2018.xlsx?rlkey=byqlj2dnggo10zsjnllvau8co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-black text-[#ffcc00] border-2 border-[#ffcc00] py-4 font-black uppercase tracking-widest hover:bg-[#ffcc00] hover:text-black transition-all"
                >
                  View Vetting Documents
                </a>
              </div>
            </div>

            {/* PROJECT: ARBY'S / QSR GRID */}
            <div className="group bg-zinc-900 border-2 border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-4xl font-black uppercase text-white tracking-tighter">
                    Arby's & Taco Bell <br /><span className="text-[#ffcc00] text-2xl">QSR Infrastructure</span>
                  </h3>
                  <span className="bg-[#ffcc00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase shrink-0 ml-4">90-Day Build</span>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  Specialists in rapid-response infrastructure for major QSR chains. We deliver site prep, heavy-duty asphalt, and ADA-compliant striping within tight franchise deadlines.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider">
                    <div className="w-2 h-2 bg-[#ffcc00] rounded-full"></div>
                    Environmental Phase I Compliant
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider">
                    <div className="w-2 h-2 bg-[#ffcc00] rounded-full"></div>
                    Municipal-Grade Materials Only
                  </div>
                </div>
                <a
                  href="https://www.dropbox.com/scl/fi/qifo13kbofo8tda0oooqb/3380.17-Phase-I-Vacant-land-1424-Elton-Street-Jennings-LA.PDF?rlkey=if2imh89dy4983nwzu5220yo0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-black text-[#ffcc00] border-2 border-[#ffcc00] py-4 font-black uppercase tracking-widest hover:bg-[#ffcc00] hover:text-black transition-all"
                >
                  View Environmental Proof
                </a>
              </div>
            </div>

          </div>

          {/* QSR BRAND TRUST ROW */}
          <div className="grid grid-cols-3 gap-6 text-center">
            {['KFC', "Arby's", 'Taco Bell'].map((brand) => (
              <div key={brand} className="bg-zinc-900 border border-zinc-800 rounded-xl py-8 px-4">
                <p className="text-3xl font-black uppercase text-[#ffcc00]">{brand}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mt-2">Preferred Partner</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION: DIRECT KICKSERV DISPATCH */}
      <section className="py-32 px-6 text-center bg-[#ffcc00] text-black border-y-8 border-white">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
          Professional <br /> Developers Only.
        </h2>
        <p className="text-xl md:text-2xl font-bold uppercase italic mb-12 max-w-3xl mx-auto">
          We operate on your timeline. Get your commercial estimate through our official dispatch point.
        </p>
        <a
          href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-16 py-8 text-3xl font-black uppercase hover:bg-zinc-800 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-b-8 border-zinc-700"
        >
          Request Commercial Dispatch
        </a>
        <p className="mt-12 text-xs font-black uppercase tracking-[0.4em] opacity-40">
          Authorized Kickserv® Municipal Point
        </p>
      </section>

    </main>
  ),
})
