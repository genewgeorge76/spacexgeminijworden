import { Link, createFileRoute } from '@tanstack/react-router'
import NeighborhoodPage from '@/components/NeighborhoodPage'

const neighborhoodFocus = [
  'Windsor Farms: brick-lined estates and sweeping circular drives',
  'Westham Parkway: steep grades, shade-heavy tree canopies, and tight turn-ins',
  'Stratford Hills: river-adjacent slopes with drainage-sensitive soils',
]

const richmondServices = [
  {
    title: 'Historic Tie-Ins',
    description:
      'Respect masonry borders, cobblestone accents, and original walkups with hand-finished asphalt transitions.',
  },
  {
    title: 'River Grade Management',
    description:
      'Drainage tuning, crown adjustments, and water-shedding finishes for river-adjacent slopes and shaded lanes.',
  },
  {
    title: 'Tree Canopy Coordination',
    description:
      'Low-profile equipment, protection mats, and careful staging around mature trees and root systems.',
  },
  {
    title: 'Quiet Residential Staging',
    description:
      'Crew schedules that minimize noise windows, keep driveways accessible, and communicate with neighbors.',
  },
]

export const Route = createFileRoute('/windsor-farms')({
  head: () => ({
    meta: [
      { title: 'Windsor Farms, Westham, Stratford Hills Paving | J. Worden & Sons' },
      {
        name: 'description',
        content:
          'Estate-grade paving for Windsor Farms, Westham Parkway, and Stratford Hills with six-inch compacted stone, drainage tuning, and quiet crews.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Richmond Neighborhood Paving | J. Worden & Sons' },
      {
        property: 'og:description',
        content:
          'Circular drives, steep aprons, and canopy-lined streets built to commercial standards across Richmond’s premier neighborhoods.',
      },
    ],
  }),
  component: WindsorFarmsPage,
})

function WindsorFarmsPage() {
  return (
    <div className="bg-[#111] text-white">
      <NeighborhoodPage
        name="Windsor Farms"
        neighborhood="Richmond Power Routes"
        landmarks={[
          'Windsor Farms: Oxford Circle, Sulgrave Rd, Charmian Rd',
          'Westham Parkway: River Road approaches and steep grades',
          'Stratford Hills: Riverside slopes and canopy-lined lanes',
        ]}
        zipCodes={['23221', '23229', '23235']}
      />

      <section className="bg-[#0f0f0f] px-6 py-16">
        <div className="max-w-[1100px] mx-auto grid gap-10 md:grid-cols-[1.05fr,0.95fr] items-start">
          <div>
            <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a84b] mb-2">Neighborhood Focus</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              One Standard Across <span className="text-[#c8a84b]">Three Neighborhoods</span>
            </h2>
            <p className="text-[#c7c7c7] leading-relaxed">
              The same 6-inch compacted stone base we use for national brands—applied to Richmond&apos;s most design-sensitive streets.
            </p>
            <ul className="mt-6 space-y-3">
              {neighborhoodFocus.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#e0e0e0]">
                  <span className="text-[#c8a84b] font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-[#262626] bg-[#1a1a1a] p-10 text-center">
            <div className="text-6xl mb-4">🛤️</div>
            <p className="text-[#c8a84b] font-sans uppercase tracking-[0.18em] text-sm mb-2">
              Richmond, VA
            </p>
            <p className="text-[#e0e0e0] leading-relaxed">
              Circular drives, steep aprons, and canopy-lined streets built to hold up for decades without sacrificing curb appeal.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a1a] px-6 py-16">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-sans text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a84b] mb-2">
            Precision Residential Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Quiet Crews, <span className="text-[#c8a84b]">Clean Lines</span>, Fast Turnarounds
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {richmondServices.map((service) => (
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
            Let&apos;s Lock Your <span className="text-[#c8a84b]">Schedule</span>
          </h2>
          <p className="text-lg text-[#d4d4d4] leading-relaxed mb-8">
            We coordinate with neighbors, HOAs, and property managers to keep access open while we pave. Get a tailored plan for your block.
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
