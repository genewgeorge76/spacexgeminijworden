import { Link, createFileRoute } from '@tanstack/react-router'

const mcleanHighlights = [
  'Six-inch compacted stone base on every driveway and private lane',
  'Quiet, low-dust crews with HOA-friendly staging and communication',
  'Precision drainage tuning for sloped drives and courtyard aprons',
  'Hand-finished edges and seamless tie-ins to garages and walkways',
]

const estateServices = [
  {
    title: 'Estate & Flagstone Tie-Ins',
    description:
      'Crisp asphalt-to-stone transitions that respect existing hardscapes, porte-cochères, and circular drives.',
  },
  {
    title: 'Steep & Curved Drives',
    description:
      'Grading, drainage, and compaction tailored for hillside access, gated entries, and sweeping curves.',
  },
  {
    title: 'HOA & Private Roads',
    description:
      'Phased work plans, resident communication, and overnight scheduling to keep traffic moving.',
  },
  {
    title: 'Protective Seal & Stripe',
    description:
      'Post-install sealcoating and elegant striping for guest parking, courtyards, and carriage house bays.',
  },
]

export const Route = createFileRoute('/mclean-residential-paving')({
  head: () => ({
    meta: [
      { title: 'McLean Residential Paving | Estate-Grade Driveways' },
      {
        name: 'description',
        content:
          'Estate-grade driveways and private roads in McLean with a six-inch compacted stone base, quiet crews, and hand-finished tie-ins.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'McLean Residential Paving | J. Worden & Sons' },
      {
        property: 'og:description',
        content:
          'Commercial-grade structure for McLean estates: drainage tuning, seamless aprons, and HOA-friendly scheduling.',
      },
    ],
  }),
  component: McLeanResidentialPaving,
})

function McLeanResidentialPaving() {
  return (
    <div className="bg-[#111] text-white">
      <section className="relative overflow-hidden bg-linear-to-br from-[#0f0f0f] via-[#1b1b1b] to-[#222] px-6 pt-24 pb-16 text-center">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(125deg,rgba(200,168,75,0.05)_0px,rgba(200,168,75,0.05)_2px,transparent_2px,transparent_42px)] opacity-60 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="inline-block rounded-full border border-[#c8a84b]/60 px-4 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#c8a84b]">
            McLean Residential Paving
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
            Estate-Grade <span className="text-[#c8a84b]">Driveways</span> &amp; Private Roads
          </h1>
          <p className="mt-6 text-lg text-[#e8e8e0] leading-relaxed">
            4th-generation paving built for McLean estates. Commercial-grade structure, concierge scheduling, and hand-finished details that respect your home&apos;s architecture.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:8044461296"
              className="rounded-sm bg-[#c8a84b] px-6 py-3 text-[#111] text-sm font-bold uppercase tracking-[0.18em] hover:bg-[#e0c06a] transition-colors"
            >
              Call 804-446-1296
            </a>
            <Link
              to="/"
              hash="contact"
              className="rounded-sm border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] hover:border-[#c8a84b] hover:text-[#c8a84b] transition-colors"
            >
              Schedule an On-Site Review
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0f0f0f] px-6 py-16">
        <div className="max-w-[1100px] mx-auto grid gap-10 md:grid-cols-[1.1fr,0.9fr] items-start">
          <div>
            <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a84b] mb-2">
              Structure First
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              The 6-Inch Compacted Stone <span className="text-[#c8a84b]">Residential Standard</span>
            </h2>
            <p className="text-[#c7c7c7] leading-relaxed">
              We apply our commercial structural spec to every McLean project. That means a true 6-inch compacted stone base, drainage tuning, and smooth aprons that keep water away from foundations.
            </p>
            <ul className="mt-6 space-y-3">
              {mcleanHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#e0e0e0]">
                  <span className="text-[#c8a84b] font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-[#262626] bg-[#1a1a1a] p-10 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-[#c8a84b] font-sans uppercase tracking-[0.18em] text-sm mb-2">
              McLean, Langley, Great Falls
            </p>
            <p className="text-[#e0e0e0] leading-relaxed">
              Circular drives, gated entries, guest courtyards, and carriage house approaches built to the same spec national brands trust.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a1a] px-6 py-16">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a84b] mb-2">
            Concierge Residential Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Quiet Crews, Clean Edges, <span className="text-[#c8a84b]">Zero Surprises</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {estateServices.map((service) => (
              <article
                key={service.title}
                className="rounded-sm border border-white/10 bg-white/5 p-6 hover:border-[#c8a84b]/60 transition-colors"
              >
                <h3 className="text-xl font-bold text-[#c8a84b] mb-2">{service.title}</h3>
                <p className="text-sm text-[#d4d4d4] leading-relaxed">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f0f0f] px-6 py-16 text-center">
        <div className="max-w-[800px] mx-auto">
          <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a84b] mb-2">Next Step</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Book a <span className="text-[#c8a84b]">Private Walkthrough</span>
          </h2>
          <p className="text-lg text-[#d4d4d4] leading-relaxed mb-8">
            We&apos;ll meet on-site, review drainage, grades, and tie-ins, then deliver a clear plan with our structural standard baked in.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center justify-center rounded-sm bg-[#c8a84b] px-6 py-3 text-[#111] text-sm font-bold uppercase tracking-[0.18em] hover:bg-[#e0c06a] transition-colors"
            >
              Request Your Estimate
            </Link>
            <a
              href="tel:8044461296"
              className="inline-flex items-center justify-center rounded-sm border border-white/50 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] hover:border-[#c8a84b] hover:text-[#c8a84b] transition-colors"
            >
              Call 804-446-1296
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
