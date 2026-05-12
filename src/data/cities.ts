/**
 * Single source of truth for every location-specific service page.
 * Adding a city = add one entry here + one tiny route file (npm run gen:locations).
 */
export interface CityEntry {
  /** URL slug. Will be used as `/locations/${slug}` */
  slug: string;
  /** Display name */
  name: string;
  /** State (full or abbreviation) — used in title, schema, and copy */
  state: string;
  /** Optional county for breadcrumbs and local schema */
  county?: string;
  /** Optional ZIP code list */
  zips?: string[];
  /** Region grouping for the footer / sitemaps */
  region:
    | 'Greater Richmond'
    | 'Tri-Cities'
    | 'Hampton Roads'
    | 'Northern Virginia'
    | 'Surrounding Counties'
    | 'Out-of-State';
  /** Optional one-liner that overrides the default description */
  blurb?: string;
}

export const CITIES: CityEntry[] = [
  // Greater Richmond
  { slug: 'richmond', name: 'Richmond', state: 'VA', county: 'Richmond City', region: 'Greater Richmond' },
  { slug: 'midlothian', name: 'Midlothian', state: 'VA', county: 'Chesterfield', region: 'Greater Richmond' },
  { slug: 'tuckahoe', name: 'Tuckahoe', state: 'VA', county: 'Henrico', region: 'Greater Richmond' },
  { slug: 'short-pump', name: 'Short Pump', state: 'VA', county: 'Henrico', region: 'Greater Richmond' },
  { slug: 'glen-allen', name: 'Glen Allen', state: 'VA', county: 'Henrico', region: 'Greater Richmond' },
  { slug: 'mechanicsville', name: 'Mechanicsville', state: 'VA', county: 'Hanover', region: 'Greater Richmond' },
  { slug: 'bon-air', name: 'Bon Air', state: 'VA', county: 'Chesterfield', region: 'Greater Richmond' },
  { slug: 'lakeside', name: 'Lakeside', state: 'VA', county: 'Henrico', region: 'Greater Richmond' },
  { slug: 'sandston', name: 'Sandston', state: 'VA', county: 'Henrico', region: 'Greater Richmond' },
  { slug: 'henrico', name: 'Henrico', state: 'VA', county: 'Henrico', region: 'Greater Richmond' },
  { slug: 'stratford-hills', name: 'Stratford Hills', state: 'VA', county: 'Richmond City', region: 'Greater Richmond' },
  { slug: 'westham-parkway', name: 'Westham Parkway', state: 'VA', county: 'Henrico', region: 'Greater Richmond' },
  { slug: 'windsor-farms', name: 'Windsor Farms', state: 'VA', county: 'Richmond City', region: 'Greater Richmond' },

  // Tri-Cities / Chesterfield
  { slug: 'chester', name: 'Chester', state: 'VA', county: 'Chesterfield', region: 'Tri-Cities' },
  { slug: 'chesterfield', name: 'Chesterfield', state: 'VA', county: 'Chesterfield', region: 'Tri-Cities' },
  { slug: 'petersburg', name: 'Petersburg', state: 'VA', county: 'Petersburg City', region: 'Tri-Cities' },
  { slug: 'hopewell', name: 'Hopewell', state: 'VA', county: 'Hopewell City', region: 'Tri-Cities' },
  { slug: 'colonial-heights', name: 'Colonial Heights', state: 'VA', region: 'Tri-Cities' },
  { slug: 'moseley', name: 'Moseley', state: 'VA', county: 'Chesterfield', region: 'Tri-Cities' },
  { slug: 'dinwiddie', name: 'Dinwiddie', state: 'VA', county: 'Dinwiddie', region: 'Tri-Cities' },
  { slug: 'prince-george', name: 'Prince George', state: 'VA', county: 'Prince George', region: 'Tri-Cities' },
  { slug: 'sussex', name: 'Sussex', state: 'VA', county: 'Sussex', region: 'Tri-Cities' },

  // Hampton Roads
  { slug: 'virginia-beach', name: 'Virginia Beach', state: 'VA', region: 'Hampton Roads' },
  { slug: 'norfolk', name: 'Norfolk', state: 'VA', region: 'Hampton Roads' },
  { slug: 'chesapeake', name: 'Chesapeake', state: 'VA', region: 'Hampton Roads' },
  { slug: 'newportnews', name: 'Newport News', state: 'VA', region: 'Hampton Roads' },
  { slug: 'hampton', name: 'Hampton', state: 'VA', region: 'Hampton Roads' },
  { slug: 'suffolk', name: 'Suffolk', state: 'VA', region: 'Hampton Roads' },
  { slug: 'portsmouth', name: 'Portsmouth', state: 'VA', region: 'Hampton Roads' },
  { slug: 'williamsburg', name: 'Williamsburg', state: 'VA', region: 'Hampton Roads' },

  // Northern Virginia
  { slug: 'mclean', name: 'McLean', state: 'VA', county: 'Fairfax', region: 'Northern Virginia' },
  { slug: 'warrenton', name: 'Warrenton', state: 'VA', county: 'Fauquier', region: 'Northern Virginia' },
  { slug: 'culpeper', name: 'Culpeper', state: 'VA', county: 'Culpeper', region: 'Northern Virginia' },
  { slug: 'fredericksburg', name: 'Fredericksburg', state: 'VA', region: 'Northern Virginia' },
  { slug: 'spotsylvania', name: 'Spotsylvania', state: 'VA', county: 'Spotsylvania', region: 'Northern Virginia' },
  { slug: 'stafford', name: 'Stafford', state: 'VA', county: 'Stafford', region: 'Northern Virginia' },
  { slug: 'caroline', name: 'Caroline', state: 'VA', county: 'Caroline', region: 'Northern Virginia' },
  { slug: 'king-george', name: 'King George', state: 'VA', county: 'King George', region: 'Northern Virginia' },
  { slug: 'orange', name: 'Orange', state: 'VA', county: 'Orange', region: 'Northern Virginia' },
  { slug: 'prince-william', name: 'Prince William', state: 'VA', county: 'Prince William', region: 'Northern Virginia' },

  // Surrounding Counties
  { slug: 'hanover', name: 'Hanover', state: 'VA', county: 'Hanover', region: 'Surrounding Counties' },
  { slug: 'powhatan', name: 'Powhatan', state: 'VA', county: 'Powhatan', region: 'Surrounding Counties' },
  { slug: 'goochland', name: 'Goochland', state: 'VA', county: 'Goochland', region: 'Surrounding Counties' },
  { slug: 'new-kent', name: 'New Kent', state: 'VA', county: 'New Kent', region: 'Surrounding Counties' },
  { slug: 'amelia', name: 'Amelia', state: 'VA', county: 'Amelia', region: 'Surrounding Counties' },
  { slug: 'ashland', name: 'Ashland', state: 'VA', county: 'Hanover', region: 'Surrounding Counties' },
  { slug: 'charles-city', name: 'Charles City', state: 'VA', county: 'Charles City', region: 'Surrounding Counties' },
  { slug: 'cumberland', name: 'Cumberland', state: 'VA', county: 'Cumberland', region: 'Surrounding Counties' },
  { slug: 'fluvanna', name: 'Fluvanna', state: 'VA', county: 'Fluvanna', region: 'Surrounding Counties' },
  { slug: 'louisa', name: 'Louisa', state: 'VA', county: 'Louisa', region: 'Surrounding Counties' },
  { slug: 'king-william', name: 'King William', state: 'VA', county: 'King William', region: 'Surrounding Counties' },
];

export const SLUGS = CITIES.map((c) => c.slug);

export function findCity(slug: string): CityEntry | undefined {
  return CITIES.find((c) => c.slug === slug);
}
