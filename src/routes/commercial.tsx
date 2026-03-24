import { Link, createFileRoute } from '@tanstack/react-router'

const commercialServices = [
  {
    icon: '🏗️',
    title: 'Industrial Sealcoating',
    description:
      'Coal-tar and asphalt-emulsion sealcoating engineered for high-traffic surfaces. Blocks UV, fuel, and freeze-thaw damage to extend pavement life by years.',
  },
  {
    icon: '🔄',
    title: 'Milling & Overlay',
    description:
      'Cold-milling to remove fatigued surface layers, followed by hot-mix asphalt overlay that restores structural integrity and ride quality without full replacement costs.',
  },
  {
    icon: '♿',
    title: 'ADA Compliance',
    description:
      'Striping, ramps, and accessible parking layouts that satisfy federal and state accessibility requirements on every commercial project.',
  },
  {
    icon: '⛏️',
    title: 'Full-Depth Reclamation',
    description:
      'Pulverize existing asphalt and base materials in place, then re-compact and overlay. The most cost-effective approach for heavily deteriorated pavements.',
  },
  {
    icon: '🅿️',
    title: 'Parking Lot Construction',
    description:
      'Engineered drainage, sub-base grading, and our standard 6-inch compacted stone foundation for decades of commercial traffic.',
  },
  {
    icon: '🛣️',
    title: 'Drive-Through & Access Roads',
    description:
      'Drive-through lanes, loading docks, and access roads designed for constant vehicle flow and heavy truck loads—without premature rutting.',
  },
]

const processSteps = [
  {
    step: '1',
    title: 'Site Assessment',
    description:
      'We evaluate conditions, drainage, traffic loads, and operational constraints to tailor the scope.',
  },
  {
    step: '2',
    title: 'Engineering & Design',
    description:
      'Grades, drainage, and mix designs dialed for your site and brand standards.',
  },
  {
    step: '3',
    title: 'Base Preparation',
    description:
      'Our signature 6-inch compacted stone base—municipal-roadway standard for every commercial pour.',
  },
  {
    step: '4',
    title: 'Paving & Finishing',
    description:
      'Hot-mix installation, precision compaction, seamless transitions, and ADA striping included.',
  },
  {
    step: '5',
    title: 'Quality Inspection',
    description:
      'Compaction testing and final walkthrough to verify structural and visual standards.',
  },
]

export const Route = createFileRoute('/commercial')({
  head: () => ({
    meta: [
      { title: 'Commercial Paving Services | J. Worden & Sons Asphalt Paving' },
      {
        name: 'description',
        content:
          'Full-spectrum commercial paving: sealcoating, milling and overlay, ADA striping, and new lot construction with a 6-inch compacted stone standard. Trusted by KFC, Arby’s, and Taco Bell.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Commercial Paving Services | J. Worden & Sons' },
      {
        property: 'og:description',
        content:
          'Commercial asphalt paving built on a six-inch compacted stone base. National brand experience across Virginia and beyond.',
      },
    ],
  }),
  component: CommercialPage,
})

function CommercialPage() {
  return (
    <div className="bg-[#111] text-white">
      <section className="relative overflow-hidden bg-linear-to-br from-[#0d0d0d] via-[#161616] to-[#1f1f1f] px-6 pt-24 pb-16 text-center">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(200,168,75,0.06)_0px,rgba(200,168,75,0.06)_2px,transparent_2px,transparent_46px)] opacity-60 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="inline-block rounded-full border border-[#c8a84b]/60 px-4 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#c8a84b]">
            Commercial &amp; Industrial Paving
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
            Commercial <span className="text-[#c8a84b]">Paving Services</span>
          </h1>
          <p className="mt-6 text-lg text-[#e8e8e0] leading-relaxed">
            Trusted by KFC, Arby&apos;s, and Taco Bell across multiple states. Full-depth commercial asphalt construction with our 6-inch compacted stone structural standard—built to handle the heaviest traffic loads.
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
              Request an Estimate
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0f0f0f] px-6 py-16">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a84b] mb-2">What We Offer</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Full-Spectrum <span className="text-[#c8a84b]">Commercial Services</span>
            </h2>
            <p className="text-[#b5b5b5] md:w-[50%]">
              From new parking lot construction to maintenance programs that extend pavement life by decades—every project meets our 4th-generation structural standard.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {commercialServices.map((service) => (
              <article
                key={service.title}
                className="rounded-sm border border-[#262626] bg-[#1a1a1a] p-6 shadow-sm hover:border-[#c8a84b]/60 transition-colors"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#c8a84b] mb-2">{service.title}</h3>
                <p className="text-[#d4d4d4] leading-relaxed text-sm">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#c8a84b] text-[#111] px-6 py-16 text-center">
        <div className="max-w-[900px] mx-auto">
          <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#111]/70 mb-2">Trusted Partners</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Vetted by National Brands</h2>
          <p className="text-lg text-[#111]/80 max-w-2xl mx-auto">
            When national restaurant chains need consistent, standards-compliant paving across multiple states, they turn to J. Worden &amp; Sons. Our multi-state commercial contracts speak for themselves.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['KFC', 'Arby’s', 'Taco Bell'].map((brand) => (
              <div
                key={brand}
                className="rounded-sm bg-[#111]/10 px-6 py-3 text-lg font-extrabold tracking-wide border border-[#111]/10"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a1a] px-6 py-16">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a84b] mb-2">Our Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            How We <span className="text-[#c8a84b]">Deliver Results</span>
          </h2>
          <p className="text-[#c7c7c7] mt-3 max-w-2xl">
            Every commercial project follows a proven 5-step process developed over four generations of paving excellence.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-sm border border-white/10 bg-white/5 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#c8a84b] text-[#111] text-lg font-extrabold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-[#c7c7c7] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f0f0f] px-6 py-16 text-center">
        <div className="max-w-[800px] mx-auto">
          <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a84b] mb-2">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ready for a <span className="text-[#c8a84b]">Commercial Estimate?</span>
          </h2>
          <p className="text-lg text-[#d4d4d4] leading-relaxed mb-8">
            Whether you&apos;re building a new parking lot or resurfacing an existing one, our team delivers on time and on budget. Contact us for a no-obligation commercial estimate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center justify-center rounded-sm bg-[#c8a84b] px-6 py-3 text-[#111] text-sm font-bold uppercase tracking-[0.18em] hover:bg-[#e0c06a] transition-colors"
            >
              Request a Free Estimate
            </Link>
            <Link
              to="/"
              hash="services"
              className="inline-flex items-center justify-center rounded-sm border border-white/50 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] hover:border-[#c8a84b] hover:text-[#c8a84b] transition-colors"
            >
              View Core Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
