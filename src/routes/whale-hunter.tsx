import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/whale-hunter')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans text-left">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden text-left">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Tier 1 National Accounts · $500K+ Projects · 50-State Pursuit
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter text-left">
            🐋 WHALE <br /> <span className="text-white italic">HUNTER</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug text-left">
            Automated bid intelligence hunting the largest infrastructure contracts — federal agencies, national chains, and state DOT projects — before the competition even sees them.
          </p>
        </div>
      </section>

      {/* Client Tiers */}
      <section className="py-24 px-6 bg-black text-left">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black uppercase text-white mb-12">
            Client <span className="text-[#ffcc00]">Tier Classification</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🐋',
                tier: 'Tier 1 — Whale',
                range: '$500K+',
                profile: 'National chains, federal agencies, large municipalities',
                priority: 'HIGHEST PRIORITY',
                examples: ['KFC / Taco Bell / QSR remodels', 'USACE highway projects', 'State DOT asphalt contracts', 'Large municipal parking'],
                color: 'border-[#ffcc00] bg-[#ffcc00]/5',
              },
              {
                icon: '🦈',
                tier: 'Tier 2 — Shark',
                range: '$100K–$499K',
                profile: 'Regional commercial, mid-size government',
                priority: 'HIGH PRIORITY',
                examples: ['County paving contracts', 'Regional retail chains', 'School district work', 'Mid-size government'],
                color: 'border-gray-600 bg-gray-900/30',
              },
              {
                icon: '🐟',
                tier: 'Tier 3 — Fish',
                range: 'Under $100K',
                profile: 'Residential, small commercial',
                priority: 'STANDARD',
                examples: ['Estate driveways', 'HOA parking lots', 'Small retail patches', 'Residential sealcoat'],
                color: 'border-gray-800 bg-black',
              },
            ].map((tier) => (
              <div key={tier.tier} className={`border-l-[6px] p-8 ${tier.color}`}>
                <div className="text-4xl mb-4">{tier.icon}</div>
                <h3 className="text-xl font-black text-[#ffcc00] uppercase mb-2">{tier.tier}</h3>
                <div className="text-2xl font-black text-white mb-1">{tier.range}</div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">{tier.priority}</div>
                <p className="text-gray-400 text-sm font-bold mb-6">{tier.profile}</p>
                <ul className="space-y-2">
                  {tier.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-[#ffcc00]">›</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bid Sources */}
      <section className="py-24 px-6 bg-[#1a1a1a] text-left">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-5xl font-black uppercase text-white mb-12">
            Automated <span className="text-[#ffcc00]">Bid Intelligence</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Dodge Data &amp; Analytics', desc: 'Commercial project leads and pre-construction intelligence. We monitor new hotel, QSR, retail, and mixed-use developments before they hit public bidding.' },
              { title: 'SAM.gov Federal Portal', desc: 'Active federal registration monitoring. Every USACE, GSA, FHWA, and federal agency solicitation matching our capabilities auto-alerts our bid team.' },
              { title: 'State DOT Portals — All 50 States', desc: 'Automated monitoring of all 50 state DOT bid boards. VDOT daily review. MDOT, PennDOT, NCDOT, DelDOT weekly review. All others monthly.' },
              { title: 'Local Bid Boards', desc: 'Municipal and county bid portals, CDBG-funded projects, school district construction, and utility authority projects tracked in our service footprint.' },
            ].map((src) => (
              <div key={src.title} className="bg-black border border-gray-800 p-8 hover:border-[#ffcc00]/40 transition-all">
                <h3 className="text-xl font-black text-[#ffcc00] uppercase mb-4" dangerouslySetInnerHTML={{ __html: src.title }} />
                <p className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: src.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black uppercase text-black mb-6">Are You a Whale?</h2>
          <p className="text-xl text-black/70 font-bold mb-10 max-w-2xl mx-auto">National account managers and government procurement officers — call our dedicated GC line for immediate response.</p>
          <a href="tel:8044461296" className="inline-block bg-black text-[#ffcc00] font-black uppercase tracking-widest px-12 py-5 text-xl hover:bg-zinc-900 transition-colors">
            804-446-1296 — Priority Line
          </a>
        </div>
      </section>
    </main>
  ),
});
