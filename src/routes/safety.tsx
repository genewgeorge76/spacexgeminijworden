import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/safety')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            OSHA 30 · Zero-Downtime Medical · EMR On Record
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            SAFETY &amp; <br /> <span className="text-white italic">COMPLIANCE</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            A strong safety culture isn't just policy — it's how we protect our crews, our clients, and our 40-year reputation on every jobsite.
          </p>
        </div>
      </section>

      {/* Safety Stats */}
      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { label: 'OSHA Certification', value: 'OSHA 30', sub: 'All Foremen Certified' },
              { label: 'Medical Compliance', value: 'Zero-Gap', sub: 'DOT Medical Cards Active' },
              { label: 'EMR Rating', value: 'On File', sub: 'Available on Request' },
              { label: 'Insurance', value: 'Full Stack', sub: 'GL · WC · Umbrella · BR' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1a1a1a] border-l-[6px] border-[#ffcc00] p-8">
                <div className="text-3xl font-black text-[#ffcc00]">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-1">{stat.sub}</div>
                <div className="text-xs text-gray-600 mt-3 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-5xl font-black uppercase text-white mb-12">
            Our Safety <span className="text-[#ffcc00]">Program</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Zero-Downtime Medical Compliance', desc: 'All CDL drivers and equipment operators maintain current DOT medical certification. We schedule renewals proactively to prevent operational gaps — no crew member operates without a current medical card.' },
              { title: 'OSHA 30 Certified Supervision', desc: 'Every foreman holds OSHA 30 Construction certification. Job hazard analyses (JHAs) are completed for each phase of work, and toolbox safety talks are conducted weekly.' },
              { title: 'Traffic Control Management', desc: 'Work zone traffic control per MUTCD Part 6 and VDOT standards. Flaggers are trained and certified. All active pavement projects use positive traffic protection measures.' },
              { title: 'Equipment Safety &amp; Geofencing', desc: 'GPS geofencing on all heavy equipment with automated after-hours alerts. Operators are trained per manufacturer requirements and OSHA 29 CFR 1926 Subpart O.' },
              { title: 'Insurance Coverage', desc: 'General Liability, Workers Compensation, Commercial Auto, Umbrella, and Builders Risk policies maintained at levels meeting or exceeding owner/agency requirements.' },
              { title: 'Incident Reporting &amp; EMR', desc: 'Experience Modification Rate (EMR) maintained and available for prequalification submissions. All incidents reported, investigated, and corrective actions documented.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#1a1a1a] border border-gray-800 p-8 hover:border-[#ffcc00]/40 transition-all">
                <h3 className="text-xl font-black text-[#ffcc00] uppercase mb-4" dangerouslySetInnerHTML={{ __html: item.title }} />
                <p className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black uppercase text-black mb-6">Request Safety Documentation</h2>
          <p className="text-xl text-black/70 font-bold mb-10 max-w-2xl mx-auto">EMR, insurance certificates, OSHA records, and prequalification documents available on request.</p>
          <a href="tel:8044461296" className="inline-block bg-black text-[#ffcc00] font-black uppercase tracking-widest px-12 py-5 text-xl hover:bg-zinc-900 transition-colors">
            804-446-1296
          </a>
        </div>
      </section>
    </main>
  ),
});
