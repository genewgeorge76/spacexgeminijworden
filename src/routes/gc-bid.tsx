import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gc-bid')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            SAM.gov · State DOT · Municipal · Federal — 50-State Pursuit
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            GOVERNMENT <br /> <span className="text-white italic">BID PORTAL</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            J. Worden &amp; Sons pursues federal, state DOT, and municipal contracts across all 50 states. Virginia Class A licensed. SAM.gov active. Davis-Bacon compliant.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black uppercase text-white mb-12">
            Government <span className="text-[#ffcc00]">Contracting Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Federal Projects', items: ['SAM.gov active (UEI &amp; CAGE)', 'FAR 48 CFR compliance', 'Davis-Bacon prevailing wage', 'Buy American / BABA Act', 'USACE &amp; FHWA standards', 'GSA Schedule pursuit'] },
              { title: 'State DOT Projects', items: ['VDOT home state — full compliance', 'MDOT, PennDOT, NCDOT, DelDOT', 'All 50 state portals monitored', 'State prequalification tracking', 'DBE/MBE/WBE goal compliance', 'Certified payroll reporting'] },
              { title: 'Municipal &amp; County', items: ['Local bid board monitoring', 'CDBG-funded projects', 'School district construction', 'Parks &amp; recreation facilities', 'Water/sewer infrastructure', 'Airport authority (FAA)'] },
            ].map((cat) => (
              <div key={cat.title} className="bg-[#1a1a1a] border-l-[6px] border-[#ffcc00] p-8">
                <h3 className="text-xl font-black text-[#ffcc00] uppercase mb-6">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#ffcc00] font-black mt-0.5">▶</span>
                      <span className="text-gray-300 text-sm font-bold" dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="py-24 px-6 bg-[#1a1a1a] text-left">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black uppercase text-white mb-12">
            Every Proposal <span className="text-[#ffcc00]">Includes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Virginia Class A Contractor License Number',
              'SAM.gov UEI and CAGE Code (Federal)',
              'Prequalification status per agency',
              'Davis-Bacon wage determinations auto-pulled',
              'DBE participation plan (when goals specified)',
              'Past performance references from project database',
              'Safety EMR on every submittal',
              'Bonding letter or capacity statement',
              'Insurance certificates referenced',
              'Worden Heritage Statement — 4th Gen, Since 1984',
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 bg-black border border-gray-800 px-6 py-4">
                <span className="text-[#ffcc00] text-xl">✓</span>
                <span className="text-gray-300 font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black uppercase text-black mb-6">Submit a Bid Inquiry</h2>
          <p className="text-xl text-black/70 font-bold mb-10 max-w-2xl mx-auto">Government agencies and GC teams: contact us directly for prequalification packages, bonding letters, and proposal support.</p>
          <a href="tel:8044461296" className="inline-block bg-black text-[#ffcc00] font-black uppercase tracking-widest px-12 py-5 text-xl hover:bg-zinc-900 transition-colors">
            804-446-1296
          </a>
        </div>
      </section>
    </main>
  ),
});
