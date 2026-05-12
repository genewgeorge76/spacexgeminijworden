import { createFileRoute, Link } from '@tanstack/react-router';
import { useSeo } from '../lib/useSeo';
import { CITIES } from '../data/cities';

export const Route = createFileRoute('/services')({
  component: ServicesPage,
});

const PHONE = '804-446-1296';
const PHONE_HREF = 'tel:+18044461296';

const SERVICES = [
  {
    name: 'Commercial parking lots',
    desc: 'Retail, restaurant, medical, industrial. Multi-site rollouts. Phased after-hours work to keep the business open.',
    to: '/commercial',
    keywords: 'parking lot paving Richmond, commercial asphalt Chesterfield',
  },
  {
    name: 'Residential driveways',
    desc: 'New asphalt driveways, replacements, and estate work across the Greater Richmond region.',
    to: '/residential',
    keywords: 'driveway paving Midlothian, residential asphalt Chester VA',
  },
  {
    name: 'Sealcoating & striping',
    desc: 'Coal-tar and asphalt-emulsion sealcoat, crack-fill, ADA striping, parking-lot restoration.',
    to: '/sealcoating',
    keywords: 'sealcoating Richmond VA, parking lot striping Chesterfield',
  },
  {
    name: 'Tar & chip / chip seal',
    desc: 'The right surface for long farm lanes, ranch driveways, and country roads. Lower cost than full asphalt with a rugged, traction-rich finish that handles tractors, trailers, and trucks.',
    to: '/services',
    keywords: 'tar and chip driveway Powhatan, chip seal Goochland farm road, rural driveway Hanover',
  },
  {
    name: 'Patching & pothole repair',
    desc: 'Saw-cut full-depth patches, base-failure remediation, and drive-thru lane repair without ripping the whole lot.',
    to: '/services',
    keywords: 'asphalt patching Henrico, pothole repair Richmond VA',
  },
  {
    name: 'Milling & overlay',
    desc: 'Mill-and-fill resurfacing for parking lots and roadways. Tied-in transitions, no lip, no trip hazard.',
    to: '/services',
    keywords: 'asphalt milling Chesterfield, parking lot overlay Richmond',
  },
  {
    name: 'Line striping & ADA layout',
    desc: 'Latex traffic paint, thermoplastic on request, ADA van-accessible stalls done to code the first time.',
    to: '/services',
    keywords: 'parking lot striping Richmond, ADA striping Virginia',
  },
];

const NEAR_HQ = ['chester', 'chesterfield', 'midlothian', 'richmond', 'henrico', 'mechanicsville', 'glen-allen', 'short-pump', 'bon-air', 'colonial-heights', 'petersburg', 'hopewell'];
const RURAL = ['powhatan', 'goochland', 'hanover', 'new-kent', 'amelia', 'cumberland', 'fluvanna', 'louisa', 'orange', 'king-william', 'charles-city', 'dinwiddie'];

function ServicesPage() {
  useSeo({
    title: 'Asphalt Paving Services in Chester & Greater Richmond, VA',
    description:
      'Family-owned asphalt paving in Chester, VA serving Chesterfield, Richmond, Midlothian, Henrico and surrounding counties. Driveways, parking lots, sealcoating, tar & chip for farms. Call 804-446-1296.',
    path: '/services',
  });

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'PavingContractor',
    '@id': 'https://jwordenasphaltpaving.com/services#contractor',
    name: 'J. Worden & Sons Asphalt Paving',
    image: 'https://jwordenasphaltpaving.com/parking-lot-pave-richmond-va.jpg',
    telephone: '+1-804-446-1296',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1601 Ware Bottom Springs Rd, Suite 214',
      addressLocality: 'Chester',
      addressRegion: 'VA',
      postalCode: '23836',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Chester' },
      { '@type': 'City', name: 'Chesterfield' },
      { '@type': 'City', name: 'Richmond' },
      { '@type': 'City', name: 'Midlothian' },
      { '@type': 'City', name: 'Henrico' },
      { '@type': 'AdministrativeArea', name: 'Chesterfield County, Virginia' },
      { '@type': 'AdministrativeArea', name: 'Henrico County, Virginia' },
      { '@type': 'AdministrativeArea', name: 'Powhatan County, Virginia' },
      { '@type': 'AdministrativeArea', name: 'Goochland County, Virginia' },
      { '@type': 'AdministrativeArea', name: 'Hanover County, Virginia' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Asphalt Paving Services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.desc },
      })),
    },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127' },
  };

  return (
    <main className="bg-black text-white">
      {/* Hero — local-pack signal: city + county + service in H1 */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            Chester, VA &middot; Chesterfield County HQ
          </p>
          <h1 className="max-w-5xl text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            Asphalt paving services in Chester, Chesterfield, Richmond &amp; the surrounding counties.
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-white/60 md:text-xl">
            Family-owned since 1984. Headquartered at 1601 Ware Bottom Springs Rd in Chester, VA. Driveways,
            parking lots, sealcoating, milling, striping, and tar &amp; chip for the farms and country roads
            from Powhatan to Hanover.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={PHONE_HREF}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Call {PHONE}
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/5"
            >
              Free estimate &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Service grid */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Link
              key={s.name}
              to={s.to}
              className="group block bg-black p-10 transition hover:bg-white/[0.03] md:p-12"
            >
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                0{i + 1}
              </div>
              <div className="mt-6 text-2xl font-medium tracking-tight">{s.name}</div>
              <div className="mt-3 text-sm text-white/60">{s.desc}</div>
              <div className="mt-8 text-sm text-white/40 transition group-hover:text-white">
                Details &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tar & chip dedicated block — captures rural search intent */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            Built for the country
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
            Tar &amp; chip driveways for farms, ranches &amp; rural property.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/70">
            <p>
              A 600-foot farm lane doesn&rsquo;t need a city parking lot. Tar &amp; chip (also called chip seal)
              gives you a rugged, locked-in driving surface for a fraction of the cost of full-depth asphalt.
              The aggregate gives traction in mud and ice, the binder seals out water, and tractors,
              skid-steers, and grain trucks roll over it without spitting it apart.
            </p>
            <p>
              We run tar &amp; chip across Powhatan, Goochland, Hanover, New Kent, Amelia, Cumberland,
              Fluvanna, Louisa, Orange, and the rest of the rural counties around our Chester, VA shop.
              If you&rsquo;ve got a long lane, a horse barn, an equipment yard, or a private road that won&rsquo;t
              justify a hot-mix bid, this is the right surface.
            </p>
            <p className="text-white">
              <strong className="font-medium text-white">Call {PHONE}</strong> and we&rsquo;ll come walk it.
              No salesman. A Worden quotes the job.
            </p>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            The Worden standard
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
            What you get on every job, no exceptions.
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              ['6-inch structural stone base', 'Compacted #21A. Not optional. Not an upsell.'],
              ['96% Marshall density', 'Verified on site, not estimated on paper.'],
              ['VDOT Section 315 spec', 'Aggregate gradation matches Virginia DOT highway standard.'],
              ['Zero subcontracted crews', 'A Worden walks the job. A Worden runs the job.'],
              ['Class A Virginia contractor', 'Licensed in Virginia, Maryland, and North Carolina.'],
              ['BBB A+ since 1994', '4-time Best of Houzz. KFC and Taco Bell preferred contractor.'],
            ].map(([h, b]) => (
              <li key={h} className="border-t border-white/10 pt-6">
                <div className="text-base font-medium">{h}</div>
                <div className="mt-2 text-sm text-white/60">{b}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Local pack: nearby cities + rural counties */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            Cities we pave from our Chester shop
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight md:text-4xl">
            Local crews. Local trucks. Local response.
          </h2>
          <div className="mt-10 flex flex-wrap gap-2 text-sm">
            {NEAR_HQ.map((slug) => {
              const c = CITIES.find((x) => x.slug === slug);
              if (!c) return null;
              return (
                <Link
                  key={slug}
                  to={`/locations/${slug}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-white/70 hover:bg-white/5 hover:text-white"
                >
                  Paving in {c.name}
                </Link>
              );
            })}
          </div>

          <p className="mt-16 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            Tar &amp; chip + rural service area
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {RURAL.map((slug) => {
              const c = CITIES.find((x) => x.slug === slug);
              if (!c) return null;
              return (
                <Link
                  key={slug}
                  to={`/locations/${slug}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {c.name}
                  {c.county ? <span className="text-white/40"> &middot; {c.county} Co.</span> : null}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NAP block — matches Google Business Profile */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Phone</p>
            <a href={PHONE_HREF} className="mt-3 block text-2xl font-medium hover:text-white/80">
              {PHONE}
            </a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Headquarters</p>
            <p className="mt-3 text-base text-white">
              1601 Ware Bottom Springs Rd, Suite 214
              <br />
              Chester, VA 23836
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Hours</p>
            <p className="mt-3 text-base text-white">Mon&ndash;Fri 7am&ndash;7pm</p>
            <p className="text-base text-white">Sat 7am&ndash;5pm</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-32">
          <h2 className="max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            Want a real number, not a guess?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            Call {PHONE} and a Worden picks up. We&rsquo;ll come walk the job.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={PHONE_HREF}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Call {PHONE}
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/5"
            >
              Request estimate &rarr;
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </main>
  );
}
