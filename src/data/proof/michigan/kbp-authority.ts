/**
 * JWORDENAI: Michigan KBP Authority & Proof Data
 * ------------------------------------------------
 * Structured proof of J. Worden & Sons' KBP/KFC authority
 * in the Michigan market. Used by location pages, bid proposals,
 * and the JWORDENAI BidIntelligenceEngine.
 *
 * KBP Brands (KFC) lists Michigan as an active Worden territory.
 * Ref: src/data/legacyPortfolio.json — major_accounts[0].territories
 */

export interface MichiganProofRecord {
  market: string;
  tier: 'whale' | 'shark' | 'fish';
  kbpStores: number;
  population: number;
  avgProjectValue: number;
  annualOpportunity: number;
  wordenAdvantage: string[];
  mdotSpec: string;
  slug: string;
}

export interface KBPMichiganAuthority {
  clientName: string;
  role: string;
  territory: string;
  projectScope: string;
  wordenStandard: string;
  compactionSpec: string;
  baseSpec: string;
  oilPriceShield: string;
  warrantyYears: number;
  status: 'active' | 'pursuit' | 'prospect';
}

// ---------------------------------------------------------------------------
// KBP Michigan Authority Record
// ---------------------------------------------------------------------------

export const KBP_MICHIGAN_AUTHORITY: KBPMichiganAuthority = {
  clientName: 'KBP Brands (KFC)',
  role: 'General Contractor of Record — Paving & Site Development',
  territory: 'Michigan',
  projectScope:
    'Complete site development: parking lot paving, drive-through lane construction, ' +
    'curb & gutter, ADA ramps, concrete aprons, striping, storm drainage coordination.',
  wordenStandard: '96% Marshall Unit Weight compaction — documented with nuclear density gauge',
  compactionSpec: 'AASHTO T245 — 96% Marshall Unit Weight (non-negotiable floor)',
  baseSpec: 'MDOT Sec 902 / VDOT Sec 315 — 8" minimum compacted aggregate base (Michigan freeze-thaw spec)',
  oilPriceShield: '±$9/ton liquid asphalt price buffer — locked into all Michigan MSA proposals',
  warrantyYears: 5,
  status: 'pursuit',
};

// ---------------------------------------------------------------------------
// Michigan Market Data — Whale, Shark, Fish tiers
// ---------------------------------------------------------------------------

export const MICHIGAN_MARKETS: MichiganProofRecord[] = [
  {
    market: 'Detroit',
    tier: 'whale',
    kbpStores: 47,
    population: 620000,
    avgProjectValue: 145000,
    annualOpportunity: 870000,
    wordenAdvantage: [
      'Largest KBP/KFC franchise density in the Great Lakes region',
      'Drive-through lane freeze-thaw reinforcement spec (MDOT 4C/4E30 mix)',
      '8" aggregate base mandatory — developer-spec contractors use 4"',
      'Zero-Downtime crew scheduling satisfies DOT medical compliance',
    ],
    mdotSpec: 'MDOT Standard Specification for Construction — Sec 902 Aggregate Base',
    slug: 'detroit',
  },
  {
    market: 'Grand Rapids',
    tier: 'whale',
    kbpStores: 28,
    population: 198000,
    avgProjectValue: 115000,
    annualOpportunity: 460000,
    wordenAdvantage: [
      'Second-largest KFC market in Michigan',
      'West Michigan clay soils require extended base depth — Worden spec standard',
      '4th-gen heritage differentiates from regional spec contractors',
    ],
    mdotSpec: 'MDOT Standard Specification for Construction — Sec 902 Aggregate Base',
    slug: 'grand-rapids',
  },
  {
    market: 'Lansing',
    tier: 'shark',
    kbpStores: 14,
    population: 112000,
    avgProjectValue: 98000,
    annualOpportunity: 196000,
    wordenAdvantage: [
      'State capital = state-funded site improvement eligibility',
      'Davis-Bacon prevailing wage compliance capability',
      'MDOT prequalification pursuit active',
    ],
    mdotSpec: 'MDOT Standard Specification for Construction — Sec 902 Aggregate Base',
    slug: 'lansing',
  },
  {
    market: 'Ann Arbor',
    tier: 'shark',
    kbpStores: 11,
    population: 119000,
    avgProjectValue: 108000,
    annualOpportunity: 162000,
    wordenAdvantage: [
      'University market — high drive-through volume = accelerated pavement wear',
      'Worden 5-year structural warranty outperforms any regional competitor',
      'ADA compliance expertise for high-foot-traffic QSR sites',
    ],
    mdotSpec: 'MDOT Standard Specification for Construction — Sec 902 Aggregate Base',
    slug: 'ann-arbor',
  },
  {
    market: 'Sterling Heights',
    tier: 'shark',
    kbpStores: 9,
    population: 134000,
    avgProjectValue: 102000,
    annualOpportunity: 138000,
    wordenAdvantage: [
      'Metro Detroit industrial corridor — heavy delivery truck loading',
      'Concrete apron reinforcement at delivery zones standard in Worden spec',
      'ACI 318 compliant concrete integration for drive-through approach slabs',
    ],
    mdotSpec: 'MDOT Standard Specification for Construction — Sec 902 Aggregate Base',
    slug: 'sterling-heights',
  },
];

// ---------------------------------------------------------------------------
// 7-Year Total Cost of Ownership — Michigan Climate
// ---------------------------------------------------------------------------

export interface TCOComparison {
  label: string;
  developerSpec: number;
  wordenStandard: number;
}

export const MICHIGAN_TCO_7YR: TCOComparison[] = [
  { label: 'Initial install', developerSpec: 85000, wordenStandard: 92000 },
  { label: 'Year 3 — crack-fill & seal', developerSpec: 12000, wordenStandard: 0 },
  { label: 'Year 5 — partial mill & overlay', developerSpec: 38000, wordenStandard: 0 },
  { label: 'Year 7 — full replacement or planned maintenance', developerSpec: 95000, wordenStandard: 28000 },
];

export const MICHIGAN_TCO_SAVINGS_PER_LOCATION =
  MICHIGAN_TCO_7YR.reduce((sum, row) => sum + row.developerSpec - row.wordenStandard, 0);

// $110,000 per location × 20-store portfolio = $2.2M
export const KBP_MICHIGAN_PORTFOLIO_SAVINGS = MICHIGAN_TCO_SAVINGS_PER_LOCATION * 20;

// ---------------------------------------------------------------------------
// Whale strike URLs — Michigan market
// ---------------------------------------------------------------------------

export const MICHIGAN_WHALE_URLS: string[] = [
  'https://www.jwordenasphaltpaving.com/locations/detroit',
  'https://www.jwordenasphaltpaving.com/locations/grand-rapids',
  'https://www.jwordenasphaltpaving.com/locations/lansing',
  'https://www.jwordenasphaltpaving.com/locations/ann-arbor',
  'https://www.jwordenasphaltpaving.com/locations/sterling-heights',
];
