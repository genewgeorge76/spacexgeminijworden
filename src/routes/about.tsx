import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const ProofMap = lazy(() => import('@/components/ProofMap'));

export const Route = createFileRoute('/about')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            4th Generation · Since 1984
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter">
            OUR STORY <br /> <span className="text-white italic">40+ YEARS STRONG</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            J. Worden &amp; Sons was founded on one promise: pour every inch like it's the front of your own house — because our reputation is built on every driveway, parking lot, and highway we've ever touched.
          </p>
        </div>
      </section>

      {/* Heritage */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black uppercase text-white leading-none mb-6">
              4th Generation <span className="text-[#ffcc00]">Family Business</span>
            </h2>
            <p className="text-gray-300 font-bold leading-relaxed mb-6">
              Founded in 1984, J. Worden &amp; Sons began as a small Richmond-area paving crew with one roller, one crew cab, and an uncompromising standard for compaction density. Today we operate across 12 states as a Class A Virginia Licensed general contractor with a fleet of heavy equipment and a portfolio spanning KFC flagship remodels to VDOT highway rehabilitation.
            </p>
            <p className="text-gray-400 italic leading-relaxed">
              Every generation has added a new capability — and never once reduced a standard.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Year Founded', value: '1984' },
              { label: 'Generations', value: '4th' },
              { label: 'States Served', value: '12' },
              { label: 'Compaction Floor', value: '96%' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1a1a1a] border-l-[6px] border-[#ffcc00] p-8">
                <div className="text-4xl font-black text-[#ffcc00]">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License & Credentials */}
      <section className="py-24 px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black uppercase text-white mb-12">
            License &amp; <span className="text-[#ffcc00]">Credentials</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Virginia Class A Contractor', desc: 'The highest general contractor license classification in Virginia — qualifying us for unlimited project value on commercial, industrial, and government work.' },
              { title: 'SAM.gov Registered', desc: 'Active federal registration (UEI &amp; CAGE code) enabling direct federal agency contracting, GSA schedule pursuit, and Davis-Bacon compliance.' },
              { title: 'VDOT Prequalified', desc: 'Prequalified with the Virginia Department of Transportation for Asphalt Paving, Base &amp; Subbase, and Pavement Marking work categories.' },
            ].map((cred) => (
              <div key={cred.title} className="bg-black border border-gray-800 p-8 hover:border-[#ffcc00]/50 transition-colors">
                <h3 className="text-xl font-black text-[#ffcc00] uppercase mb-4">{cred.title}</h3>
                <p className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: cred.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of Performance Map */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black uppercase text-white mb-4">
            Nationwide <span className="text-[#ffcc00]">Proof of Performance</span>
          </h2>
          <p className="text-gray-400 font-bold mb-10 max-w-3xl">
            Every pin below is a GPS-verified job site — asphalt, paving, and construction work extracted directly from field photos. Replace <code className="bg-[#1a1a1a] px-1 text-[#ffcc00]">src/data/verified-pins.json</code> with your harvested data to see your full 40-year footprint light up the map.
          </p>
          <div className="overflow-hidden rounded-lg border-[4px] border-[#ffcc00] shadow-2xl">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-[500px] bg-[#1a1a1a] text-gray-400 text-lg font-bold">
                  Loading map…
                </div>
              }
            >
              <ProofMap />
            </Suspense>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black uppercase text-black mb-6">Ready to Work With the Best?</h2>
          <p className="text-xl text-black/70 font-bold mb-10 max-w-2xl mx-auto">Call our Chester, VA HQ or request a free estimate today.</p>
          <a href="tel:8044461296" className="inline-block bg-black text-[#ffcc00] font-black uppercase tracking-widest px-12 py-5 text-xl hover:bg-zinc-900 transition-colors">
            804-446-1296
          </a>
        </div>
      </section>
    </main>
  ),
});
