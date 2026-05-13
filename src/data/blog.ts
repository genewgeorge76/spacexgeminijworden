// SEO programmatic blog matrix.
// Generates one full blog post per (service × city) pair on demand.
// Slug pattern: `${service}-in-${city}`  e.g. "sealcoating-in-richmond"

export type Service = {
  slug: string;
  name: string;
  /** H1-style descriptor used in titles. */
  noun: string;
  /** Short hero blurb */
  blurb: string;
  /** 4 talking-point paragraphs, generic across cities */
  body: string[];
  /** Internal route the imprint links to in addition to the blog */
  parent: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'asphalt-paving',
    name: 'Asphalt Paving',
    noun: 'asphalt paving',
    blurb:
      'New driveways, parking lots, and overlays installed by a Class A contractor with 50 years of in-house crews.',
    parent: '/services',
    body: [
      'Asphalt is a structural system, not a surface. Every job starts with the subgrade — proof-rolled, compacted, and graded for positive drainage before a single ton of mix arrives. Skip that step and the prettiest mat in the world will alligator inside three winters.',
      'We run our own paver, our own rollers, and our own dump fleet. That means a single foreman owns the work from grade to final pass — no sub-of-a-sub. Mat temperatures are checked at the screed, behind the breakdown roller, and at finish, because compaction window in Virginia summer is unforgiving.',
      'For driveways we typically install 2 to 2.5 inches of compacted SM-9.5A surface mix over a properly prepared 6-inch CR-6 stone base. For commercial work we engineer the section to traffic — heavy delivery zones get 3 to 4 inches of binder under the surface course. Either way, density is non-negotiable.',
      'Edges are hand-raked and tamped, joints are tack-coated and tied, and the surface is broomed clean before traffic. Cure for 24 to 48 hours, sealcoat at the 6-to-12 month mark, and the mat will outlive the loan on the building.',
    ],
  },
  {
    slug: 'sealcoating',
    name: 'Sealcoating',
    noun: 'sealcoating',
    blurb:
      'Coal-tar and asphalt-emulsion sealers, sand-loaded, squeegee-and-spray applied. Doubles the life of a parking lot when applied on schedule.',
    parent: '/sealcoating',
    body: [
      'Sealcoating is the cheapest line item that keeps an asphalt mat alive. UV oxidizes the binder, water finds the open void structure, and freeze-thaw rips the mat apart from the inside. A properly applied seal restores the binder, fills surface voids, and resets the clock.',
      'We power-sweep, then power-blow every joint and edge before a drop of sealer touches the lot. Oil spots get primer, cracks get hot-pour rubberized fill at 380°F, and edges get cut in by hand. Only then does the squeegee coat go down.',
      'Two coats are standard — a tight squeegee coat to fill the void structure, and a spray finish coat for uniform color and texture. We sand-load the mix for slip resistance in commercial entrances and ADA paths.',
      'Cure is weather-dependent: 24 hours light traffic, 48 hours heavy traffic. We schedule weather windows aggressively to keep your lot down only as long as physics requires.',
    ],
  },
  {
    slug: 'tar-and-chip',
    name: 'Tar & Chip',
    noun: 'tar-and-chip surfacing',
    blurb:
      'Hot-applied liquid asphalt with embedded stone chip — a low-maintenance, naturally-textured surface ideal for long rural driveways and estate roads.',
    parent: '/services',
    body: [
      'Tar and chip — sometimes called chip-seal — gives a driveway the look of a country lane and the durability of a properly maintained asphalt road. The base goes down identical to traditional asphalt: compacted, graded, drained.',
      'A heated emulsion is then sprayed across the prepared surface, and a chip spreader follows immediately behind embedding 3/8-inch washed stone into the binder. A pneumatic roller sets the chip into the asphalt while it is still hot and tacky.',
      'After cure, loose chip is power-swept and recovered. The result is a textured, slip-resistant, naturally-quiet surface that hides oil drops, doesn\'t blacken in summer, and never needs sealcoating.',
      'The trade-off vs. paved asphalt is a slightly looser surface for the first 30 days and a heavier visual texture. For long driveways, equestrian properties, vineyards, and historic estates the look is unmatched.',
    ],
  },
  {
    slug: 'driveways',
    name: 'Residential Driveways',
    noun: 'residential driveway paving',
    blurb:
      'Single-pour residential driveways — straight, curved, gated, heated, or historic. Engineered for the soils we actually pave on.',
    parent: '/residential',
    body: [
      'A driveway is the single largest piece of asphalt most homeowners will ever buy. Get the base wrong and the mat fails before the loan is paid. Get it right and the driveway disappears — flat, quiet, no cracks, no patches, no calls.',
      'Every residential bid we write specifies the existing soil condition, the proposed base section, the lift count, the mix design, and the compaction target. Most competitors hand you a per-square-foot number and a verbal promise. We hand you the engineering.',
      'Apron tie-ins to county or state right-of-way are detailed to current VDOT spec. Garage transitions are sloped to drain away from the slab. Side flares respect existing grade and existing trees — we don\'t scalp roots to make a number work.',
      'We build access for cars, trucks, RVs, equestrian trailers, and historic carriage houses. Tell us the heaviest vehicle that will cross the mat and we engineer the section to it.',
    ],
  },
  {
    slug: 'parking-lots',
    name: 'Commercial Parking Lots',
    noun: 'commercial parking-lot paving',
    blurb:
      'New construction, full-depth reclamation, mill-and-overlay, sealcoat, striping. Single-source crew for the entire lot lifecycle.',
    parent: '/commercial',
    body: [
      'A commercial lot is a revenue surface. Every day it\'s closed is a day the tenant isn\'t paying you. We schedule night and weekend pours, lane-by-lane phasing, and accelerated mixes when the calendar demands it.',
      'Our standard new-construction section is engineered to the actual delivery and trash-truck load — typically 6 inches of compacted CR-6 base, 2.5 inches of BM-25 binder, and a 1.5-inch SM-9.5A surface. Heavy-duty zones step up from there.',
      'For tired lots we offer mill-and-overlay (preserve the base, replace the mat) and full-depth reclamation (rebuild the section in-place using the existing mat as base). FDR is the highest-value option for lots where the underlying soils are still sound.',
      'Striping, ADA, fire-lane markings, stop bars, and stencils are installed with thermoplastic or DOT-grade traffic paint. A single crew owns the entire lot from grade to first painted line.',
    ],
  },
  {
    slug: 'patching',
    name: 'Patching & Pothole Repair',
    noun: 'asphalt patching and pothole repair',
    blurb:
      'Hot-mix patching, full-depth saw-cut repair, and crack-fill — done right the first time so the failure does not chase the patch.',
    parent: '/services',
    body: [
      'A pothole is a symptom. The cause is almost always water reaching the subgrade through a failed surface or a failed joint. Throw cold-patch in it and you\'ll be patching the same hole every spring.',
      'We saw-cut a clean rectangular perimeter beyond the failed material, excavate to sound base, re-compact the subgrade, tack-coat the vertical faces, and place hot mix in lifts no greater than 2 inches compacted. The repair is rolled to density and the joint is sealed.',
      'For lots with widespread surface distress we recommend skin-patching only as triage. The right answer is usually a mill-and-overlay scheduled into the next maintenance cycle. We\'ll tell you that even when it costs us the patch ticket.',
      'Crack-fill is performed with hot-pour rubberized sealant at 380°F using a router-and-blow prep. Cold sealants and unprepared cracks are a waste of money — they bridge the surface but never bond to the joint walls.',
    ],
  },
];

export const CITIES: { name: string; region: string }[] = [
  // Greater Richmond
  { name: 'Richmond', region: 'Greater Richmond' },
  { name: 'Midlothian', region: 'Greater Richmond' },
  { name: 'Tuckahoe', region: 'Greater Richmond' },
  { name: 'Short Pump', region: 'Greater Richmond' },
  { name: 'Glen Allen', region: 'Greater Richmond' },
  { name: 'Mechanicsville', region: 'Greater Richmond' },
  { name: 'Bon Air', region: 'Greater Richmond' },
  { name: 'Lakeside', region: 'Greater Richmond' },
  // Chesterfield & Tri-Cities
  { name: 'Chester', region: 'Chesterfield & Tri-Cities' },
  { name: 'Chesterfield', region: 'Chesterfield & Tri-Cities' },
  { name: 'Petersburg', region: 'Chesterfield & Tri-Cities' },
  { name: 'Hopewell', region: 'Chesterfield & Tri-Cities' },
  { name: 'Colonial Heights', region: 'Chesterfield & Tri-Cities' },
  { name: 'Moseley', region: 'Chesterfield & Tri-Cities' },
  { name: 'Dinwiddie', region: 'Chesterfield & Tri-Cities' },
  { name: 'Prince George', region: 'Chesterfield & Tri-Cities' },
  // Hampton Roads
  { name: 'Virginia Beach', region: 'Hampton Roads' },
  { name: 'Norfolk', region: 'Hampton Roads' },
  { name: 'Chesapeake', region: 'Hampton Roads' },
  { name: 'Newport News', region: 'Hampton Roads' },
  { name: 'Hampton', region: 'Hampton Roads' },
  { name: 'Suffolk', region: 'Hampton Roads' },
  { name: 'Portsmouth', region: 'Hampton Roads' },
  { name: 'Williamsburg', region: 'Hampton Roads' },
  // Surrounding Counties
  { name: 'Hanover', region: 'Surrounding Counties' },
  { name: 'Henrico', region: 'Surrounding Counties' },
  { name: 'Powhatan', region: 'Surrounding Counties' },
  { name: 'Goochland', region: 'Surrounding Counties' },
  { name: 'New Kent', region: 'Surrounding Counties' },
  { name: 'Amelia', region: 'Surrounding Counties' },
  { name: 'Ashland', region: 'Surrounding Counties' },
  { name: 'Charles City', region: 'Surrounding Counties' },
  // Expanded coverage (additional service-area cities)
  { name: 'Sandston', region: 'Greater Richmond' },
  { name: 'Highland Springs', region: 'Greater Richmond' },
  { name: 'Varina', region: 'Greater Richmond' },
  { name: 'Manakin-Sabot', region: 'Surrounding Counties' },
  { name: 'Crozier', region: 'Surrounding Counties' },
  { name: 'Maidens', region: 'Surrounding Counties' },
  { name: 'Beaverdam', region: 'Surrounding Counties' },
  { name: 'Doswell', region: 'Surrounding Counties' },
  { name: 'Rockville', region: 'Surrounding Counties' },
  { name: 'Quinton', region: 'Surrounding Counties' },
  { name: 'Providence Forge', region: 'Surrounding Counties' },
  { name: 'Disputanta', region: 'Chesterfield & Tri-Cities' },
  { name: 'Sutherland', region: 'Chesterfield & Tri-Cities' },
  { name: 'Carson', region: 'Chesterfield & Tri-Cities' },
  { name: 'McKenney', region: 'Chesterfield & Tri-Cities' },
  { name: 'Stony Creek', region: 'Chesterfield & Tri-Cities' },
  { name: 'Smithfield', region: 'Hampton Roads' },
  { name: 'Yorktown', region: 'Hampton Roads' },
  { name: 'Poquoson', region: 'Hampton Roads' },
  { name: 'Surry', region: 'Hampton Roads' },
  { name: 'Carrollton', region: 'Hampton Roads' },
  { name: 'West Point', region: 'Hampton Roads' },
];

export const citySlug = (city: string) =>
  city.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

export type Post = {
  slug: string;
  title: string;
  metaDescription: string;
  service: Service;
  city: string;
  region: string;
};

export function buildSlug(serviceSlug: string, city: string): string {
  return `${serviceSlug}-in-${citySlug(city)}`;
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];
  for (const s of SERVICES) {
    for (const c of CITIES) {
      posts.push({
        slug: buildSlug(s.slug, c.name),
        title: `${s.name} in ${c.name}, VA`,
        metaDescription: `${s.name} in ${c.name}, Virginia by J. Worden & Sons — a Class A asphalt contractor headquartered in Chester, VA. ${s.blurb}`,
        service: s,
        city: c.name,
        region: c.region,
      });
    }
  }
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  for (const s of SERVICES) {
    for (const c of CITIES) {
      if (buildSlug(s.slug, c.name) === slug) {
        return {
          slug,
          title: `${s.name} in ${c.name}, VA`,
          metaDescription: `${s.name} in ${c.name}, Virginia by J. Worden & Sons — a Class A asphalt contractor headquartered in Chester, VA. ${s.blurb}`,
          service: s,
          city: c.name,
          region: c.region,
        };
      }
    }
  }
  return null;
}

/**
 * Generates the rendered long-form copy for a (service × city) post.
 * Returns an array of paragraphs ready to render <p> per element.
 */
export function renderPostBody(post: Post): string[] {
  const { service, city, region } = post;
  const intro = `When ${city.toLowerCase()} property owners search for ${service.noun} in ${city}, Virginia, the results are mostly franchise sealers and seasonal contractors. J. Worden & Sons is the alternative: a Class A asphalt contractor headquartered in Chester, Virginia, that has been pouring mat across the ${region} market for fifty years under continuous family ownership. ${service.blurb}`;

  const local = `Every ${city} project is engineered to the soil, drainage, and traffic conditions of the property. ${region} has its own subgrade story — a mix of clay, sandy loam, and historic fill that punishes generic spec sheets. We test the section, design the mat, and document the proposal so you know exactly what is going under the surface and exactly what it will cost.`;

  const proof = `We are the same crew, with the same trucks and the same foremen, that has been pouring driveways and parking lots from Richmond to the Hampton Roads peninsula since 1984. Pavement Magazine named us a Top 75 Contractor in four separate categories. Houzz has awarded us Best of Service multiple years running. Our Google Business Profile holds a 4.9 rating across nearly a hundred verified reviews.`;

  const close = `If you are evaluating ${service.noun.toLowerCase()} in ${city}, ask the bidders three questions: Are you a Class A licensed contractor? Will the same crew that bid the job pour the job? And what is the engineered section, lift by lift, that you intend to install? J. Worden & Sons answers all three in writing on every estimate.`;

  return [intro, ...service.body, local, proof, close];
}
