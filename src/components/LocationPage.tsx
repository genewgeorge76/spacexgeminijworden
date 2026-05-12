import { Link } from '@tanstack/react-router';
import { useSeo } from '../lib/useSeo';
import type { CityEntry } from '../data/cities';

const PHONE = '804-446-1296';
const PHONE_HREF = 'tel:+18044461296';
const HQ_ADDRESS = '1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836';

interface Props {
  city: CityEntry;
  /** Sibling cities for internal linking (4-8). */
  nearby: CityEntry[];
}

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

export default function LocationPage({ city, nearby }: Props) {
  const cityState = `${city.name}, ${city.state}`;
  const title = `Asphalt Paving in ${cityState}`;
  const description =
    `Family-owned asphalt paving in ${cityState}. Driveways, parking lots, and sealcoating on a 6-inch structural stone base. Free estimates. Call ${PHONE}.`;

  useSeo({
    title,
    description,
    path: `/locations/${city.slug}`,
  });

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://jwordenasphaltpaving.com/locations/${city.slug}#business`,
    name: `J. Worden & Sons Asphalt Paving — ${cityState}`,
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
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: city.county
        ? { '@type': 'AdministrativeArea', name: `${city.county} County, ${city.state}` }
        : { '@type': 'State', name: city.state },
    },
    url: `https://jwordenasphaltpaving.com/locations/${city.slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '07:00', closes: '17:00' },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jwordenasphaltpaving.com/' },
      { '@type': 'ListItem', position: 2, name: 'Service Area', item: 'https://jwordenasphaltpaving.com/services' },
      { '@type': 'ListItem', position: 3, name: cityState, item: `https://jwordenasphaltpaving.com/locations/${city.slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much does asphalt paving cost in ${cityState}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Asphalt paving in ${cityState} typically runs $3.50 to $7.00 per square foot for residential driveways, with commercial parking lot pricing depending on scope, base condition, and access. J. Worden & Sons provides free on-site estimates for ${city.name} property owners.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do you serve all of ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. We pave throughout ${cityState}${city.county ? ' and the broader ' + city.county + ' County area' : ''}, including driveways, parking lots, and sealcoating projects of every size.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Are you licensed and insured in Virginia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. J. Worden & Sons holds a Class A Virginia Contractor license, BBB A+ rating since 1994, and carries full liability and workers\u2019 compensation insurance.',
        },
      },
    ],
  };

  return (
    <main className="bg-black text-white">
      {/* Breadcrumbs */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 text-xs text-white/40">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-white">Service area</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{cityState}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            {city.county ? `${city.county} County` : city.state}
          </p>
          <h1 className="max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            Asphalt paving in {city.name}, {city.state}.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/60 md:text-xl">
            Family-owned for four generations. Driveways, parking lots, and sealcoating across {city.name} on the
            6-inch structural stone base that put us on the map.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={PHONE_HREF}
              onClick={() => {
                const w = window as unknown as { gtag?: (...args: unknown[]) => void };
                if (w.gtag) w.gtag('event', 'click', { event_category: 'phone_call', event_label: PHONE, page_location: city.slug });
              }}
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

      {/* Trust bar */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
          <Stat value="40+" label="Years in business" />
          <Stat value="100+" label="Franchise sites paved" />
          <Stat value="A+" label="BBB rating since 1994" />
          <Stat value="Class A" label="Virginia contractor" />
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Services in {city.name}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            What we pave for {city.name} property owners.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
            <ServiceCard
              to="/residential"
              title="Residential driveways"
              desc={`New asphalt driveways, replacements, and estate work throughout ${city.name}.`}
            />
            <ServiceCard
              to="/commercial"
              title="Commercial parking lots"
              desc={`Retail, restaurant, medical, and industrial parking lots across ${city.county || city.state}.`}
            />
            <ServiceCard
              to="/sealcoating"
              title="Sealcoating & striping"
              desc={`Coal-tar and emulsion sealcoat, crack-fill, and ADA striping in ${city.name}.`}
            />
          </div>
        </div>
      </section>

      {/* Local proof */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Why {city.name} calls Worden</p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/70">
            <p>
              J. Worden &amp; Sons has paved across {city.county ? `${city.county} County` : city.state} since 1984.
              Our crews have run jobs for national QSR brands like KFC, Taco Bell, and Arby&rsquo;s right alongside
              private estate driveways throughout the region.
            </p>
            <p>
              We don&rsquo;t cut the base to win the bid. Every {city.name} job gets a 6-inch compacted stone base,
              VDOT spec aggregate, and 96% Marshall density verified on site. That&rsquo;s the reason our work is
              still under warranty thirty years later.
            </p>
            <p>
              No call center. No commissioned salesman. A Worden walks the job and a Worden quotes the job.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">{city.name} questions</p>
          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="py-8">
                <dt className="text-lg font-medium">{q.name}</dt>
                <dd className="mt-3 text-base text-white/60">{q.acceptedAnswer.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Nearby cities (internal linking gold for local pack) */}
      {nearby.length > 0 && (
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Nearby cities we serve</p>
            <div className="mt-8 flex flex-wrap gap-2 text-sm">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  to={`/locations/${n.slug}` as string}
                  className="rounded-full border border-white/15 px-4 py-2 text-white/70 hover:bg-white/5 hover:text-white"
                >
                  Paving in {n.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NAP block (matches Google Business Profile exactly) */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Phone</p>
            <a href={PHONE_HREF} className="mt-3 block text-2xl font-medium hover:text-white/80">{PHONE}</a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Headquarters</p>
            <p className="mt-3 text-base text-white">{HQ_ADDRESS}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">Hours</p>
            <p className="mt-3 text-base text-white">Mon&ndash;Fri 7am&ndash;7pm</p>
            <p className="text-base text-white">Sat 7am&ndash;5pm</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-32">
          <h2 className="max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            Free estimate in {city.name}.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            Call {PHONE} and a Worden picks up. We&rsquo;ll come walk the job.
          </p>
          <a
            href={PHONE_HREF}
            className="mt-10 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
          >
            Call {PHONE}
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-black p-8">
      <div className="text-3xl font-medium tracking-tight md:text-4xl">{value}</div>
      <div className="mt-2 text-sm text-white/60">{label}</div>
    </div>
  );
}

function ServiceCard({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="group block bg-black p-10 transition hover:bg-white/[0.03] md:p-12">
      <div className="text-xl font-medium">{title}</div>
      <div className="mt-3 text-sm text-white/60">{desc}</div>
      <div className="mt-8 text-sm text-white/40 transition group-hover:text-white">Learn more &rarr;</div>
    </Link>
  );
}

// Reference unused imports for typecheck
void slug;
