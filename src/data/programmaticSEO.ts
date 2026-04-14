/**
 * JWORDENAI Programmatic SEO Data Layer
 * Powers 50-state × city × service-type page generation.
 * Each entry generates a unique, indexable landing page with full JSON-LD.
 */

export interface ServiceAreaPage {
  state: string;
  stateAbbr: string;
  city: string;
  slug: string;
  serviceType: string;
  serviceSlug: string;
  path: string;
  title: string;
  h1: string;
  metaDescription: string;
  population?: number;
  priority: 'whale' | 'shark' | 'fish';
}

export const SERVICE_TYPES = [
  { name: 'Asphalt Paving', slug: 'asphalt-paving' },
  { name: 'Parking Lot Paving', slug: 'parking-lot-paving' },
  { name: 'Driveway Paving', slug: 'driveway-paving' },
  { name: 'Sealcoating', slug: 'sealcoating' },
  { name: 'Commercial Paving', slug: 'commercial-paving' },
  { name: 'Pothole Repair', slug: 'pothole-repair' },
] as const;

export const PRIORITY_MARKETS: Array<{
  state: string;
  stateAbbr: string;
  city: string;
  population: number;
  priority: 'whale' | 'shark' | 'fish';
}> = [
  // Virginia — Home State (Full Coverage)
  { state: 'Virginia', stateAbbr: 'VA', city: 'Richmond', population: 230000, priority: 'whale' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Chesterfield', population: 360000, priority: 'whale' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Henrico', population: 334000, priority: 'whale' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Virginia Beach', population: 459000, priority: 'whale' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Norfolk', population: 238000, priority: 'whale' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Chesapeake', population: 249000, priority: 'whale' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Arlington', population: 238000, priority: 'whale' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Newport News', population: 186000, priority: 'shark' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Alexandria', population: 161000, priority: 'shark' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Hampton', population: 133000, priority: 'shark' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Fredericksburg', population: 30000, priority: 'shark' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Roanoke', population: 100000, priority: 'shark' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Midlothian', population: 65000, priority: 'shark' },
  { state: 'Virginia', stateAbbr: 'VA', city: 'Glen Allen', population: 20000, priority: 'fish' },

  // Maryland — Regional Priority
  { state: 'Maryland', stateAbbr: 'MD', city: 'Baltimore', population: 585000, priority: 'whale' },
  { state: 'Maryland', stateAbbr: 'MD', city: 'Rockville', population: 68000, priority: 'shark' },
  { state: 'Maryland', stateAbbr: 'MD', city: 'Frederick', population: 82000, priority: 'shark' },
  { state: 'Maryland', stateAbbr: 'MD', city: 'Bethesda', population: 65000, priority: 'shark' },
  { state: 'Maryland', stateAbbr: 'MD', city: 'Annapolis', population: 40000, priority: 'fish' },

  // Washington DC
  { state: 'District of Columbia', stateAbbr: 'DC', city: 'Washington', population: 689000, priority: 'whale' },

  // North Carolina — Regional Priority
  { state: 'North Carolina', stateAbbr: 'NC', city: 'Charlotte', population: 879000, priority: 'whale' },
  { state: 'North Carolina', stateAbbr: 'NC', city: 'Raleigh', population: 467000, priority: 'whale' },
  { state: 'North Carolina', stateAbbr: 'NC', city: 'Durham', population: 278000, priority: 'shark' },
  { state: 'North Carolina', stateAbbr: 'NC', city: 'Greensboro', population: 296000, priority: 'shark' },

  // Pennsylvania — Regional Priority
  { state: 'Pennsylvania', stateAbbr: 'PA', city: 'Philadelphia', population: 1576000, priority: 'whale' },
  { state: 'Pennsylvania', stateAbbr: 'PA', city: 'Pittsburgh', population: 302000, priority: 'whale' },

  // West Virginia — Regional Priority
  { state: 'West Virginia', stateAbbr: 'WV', city: 'Charleston', population: 48000, priority: 'shark' },
  { state: 'West Virginia', stateAbbr: 'WV', city: 'Huntington', population: 46000, priority: 'fish' },

  // Delaware — Regional Priority
  { state: 'Delaware', stateAbbr: 'DE', city: 'Wilmington', population: 70000, priority: 'shark' },
  { state: 'Delaware', stateAbbr: 'DE', city: 'Dover', population: 37000, priority: 'fish' },

  // National Whale Markets
  { state: 'Texas', stateAbbr: 'TX', city: 'Houston', population: 2300000, priority: 'whale' },
  { state: 'Texas', stateAbbr: 'TX', city: 'Dallas', population: 1343000, priority: 'whale' },
  { state: 'Florida', stateAbbr: 'FL', city: 'Miami', population: 449000, priority: 'whale' },
  { state: 'Florida', stateAbbr: 'FL', city: 'Orlando', population: 307000, priority: 'whale' },
  { state: 'Georgia', stateAbbr: 'GA', city: 'Atlanta', population: 498000, priority: 'whale' },
  { state: 'Ohio', stateAbbr: 'OH', city: 'Columbus', population: 905000, priority: 'whale' },
  { state: 'Tennessee', stateAbbr: 'TN', city: 'Nashville', population: 689000, priority: 'whale' },
];

/**
 * Generate the full path for a programmatic SEO page.
 */
export function buildPagePath(stateAbbr: string, city: string, serviceSlug: string): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  return `/${stateAbbr.toLowerCase()}/${citySlug}/${serviceSlug}`;
}

/**
 * Generate a complete ServiceAreaPage object.
 */
export function generatePageData(
  market: (typeof PRIORITY_MARKETS)[number],
  service: (typeof SERVICE_TYPES)[number]
): ServiceAreaPage {
  const citySlug = market.city.toLowerCase().replace(/\s+/g, '-');
  const path = buildPagePath(market.stateAbbr, market.city, service.slug);

  return {
    state: market.state,
    stateAbbr: market.stateAbbr,
    city: market.city,
    slug: citySlug,
    serviceType: service.name,
    serviceSlug: service.slug,
    path,
    title: `${service.name} in ${market.city}, ${market.stateAbbr} | J. Worden & Sons`,
    h1: `${service.name} in ${market.city}, ${market.state}`,
    metaDescription: `J. Worden & Sons provides professional ${service.name.toLowerCase()} in ${market.city}, ${market.state}. 4th-generation contractor since 1984. 96% Marshall compaction standard. VDOT-grade structural stone base. Free estimates — call 804-446-1296.`,
    population: market.population,
    priority: market.priority,
  };
}

/**
 * Generate JSON-LD LocalBusiness schema for a service area page.
 */
export function generateLocalBusinessSchema(page: ServiceAreaPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `J. Worden & Sons — ${page.serviceType} in ${page.city}, ${page.stateAbbr}`,
    description: page.metaDescription,
    telephone: '804-446-1296',
    url: `https://jwordenasphaltpaving.com${page.path}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: page.city,
      addressRegion: page.stateAbbr,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: page.city,
      containedInPlace: { '@type': 'State', name: page.state },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: page.serviceType,
      itemListElement: [{
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: page.serviceType,
          serviceType: 'Paving',
          description: `Professional ${page.serviceType.toLowerCase()} in ${page.city}, ${page.state}. VDOT-grade materials. 96% Marshall compaction. 4th-generation since 1984.`,
        },
      }],
    },
  };
}

/** Get all pages sorted by priority (whales first). */
export function getAllSEOPages(): ServiceAreaPage[] {
  const pages: ServiceAreaPage[] = [];
  for (const market of PRIORITY_MARKETS) {
    for (const service of SERVICE_TYPES) {
      pages.push(generatePageData(market, service));
    }
  }
  const order = { whale: 0, shark: 1, fish: 2 };
  return pages.sort((a, b) => order[a.priority] - order[b.priority]);
}
