/**
 * generate-seo-pages.mjs — Static SEO Page Generator
 * 
 * Reads sitemap.xml, generates SEO-optimized static HTML for every route.
 * Each page gets: unique <title>, <meta description>, <h1>, schema,
 * and key content — all visible to Google BEFORE React hydrates.
 * 
 * This replaces Puppeteer prerendering with zero external dependencies.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '../dist')
const SITEMAP = path.resolve(DIST, 'sitemap.xml')
const INDEX_HTML = fs.readFileSync(path.resolve(DIST, 'index.html'), 'utf-8')

// ─── ROUTE → SEO DATA MAP ───────────────────────────────────────────────────
const BUSINESS = {
  name: 'J. Worden & Sons Paving LLC',
  phone: '(804) 446-1296',
  address: '1601 Ware Bottom Spring Rd, Suite 214, Chester, VA 23836',
  since: '1984',
  url: 'https://www.jwordenasphaltpaving.com',
}

const SERVICE_PAGES = {
  '/': {
    title: `${BUSINESS.name} | Asphalt Paving Chester & Richmond VA`,
    desc: `Family-owned asphalt paving since ${BUSINESS.since}. Driveways, parking lots, sealcoating & repair. Virginia Class A licensed. Call ${BUSINESS.phone}.`,
    h1: 'Virginia Asphalt Paving — Built To Last',
    content: `${BUSINESS.name} has provided professional asphalt paving across Virginia since ${BUSINESS.since}. From residential driveways to commercial parking lots, we deliver quality workmanship backed by 4 generations of experience. Call ${BUSINESS.phone} for a free estimate.`,
  },
  '/about': {
    title: `About ${BUSINESS.name} | 4th Generation Virginia Paving`,
    desc: `4th generation family paving contractor since ${BUSINESS.since}. Virginia Class A licensed, BBB accredited, Best of Houzz winner. Chester VA.`,
    h1: `About ${BUSINESS.name}`,
    content: `Founded in ${BUSINESS.since}, ${BUSINESS.name} is a 4th-generation family paving contractor headquartered in Chester, Virginia. We hold a Virginia Class A Contractor License and have earned Best of Houzz Service awards in 2014, 2015, 2016, and 2023.`,
  },
  '/contact': {
    title: `Contact ${BUSINESS.name} | Free Paving Estimate Chester VA`,
    desc: `Get a free asphalt paving estimate. Call ${BUSINESS.phone} or visit us at ${BUSINESS.address}.`,
    h1: 'Contact Us — Free Estimate',
    content: `Call ${BUSINESS.phone} for a free paving estimate. Visit us at ${BUSINESS.address}. We serve Richmond, Chesterfield, Henrico, Colonial Heights, and all of Central Virginia.`,
  },
  '/asphalt-paving': {
    title: `Asphalt Paving Contractor | ${BUSINESS.name} | Richmond VA`,
    desc: `Professional asphalt paving for driveways, roads, and commercial properties. 40+ years experience. Virginia Class A licensed. Free estimates.`,
    h1: 'Asphalt Paving Services',
    content: `${BUSINESS.name} provides full-service asphalt paving including new installation, overlays, milling, and repair. We use Virginia DOT-spec materials and maintain 96% Marshall compaction density on every project.`,
  },
  '/parking-lots': {
    title: `Commercial Parking Lot Paving | ${BUSINESS.name} | Virginia`,
    desc: `Commercial parking lot paving, striping, and maintenance. ADA-compliant. National QSR experience (KFC, Arby's, Taco Bell). Free estimates.`,
    h1: 'Commercial Parking Lot Paving',
    content: `We build and maintain commercial parking lots across Virginia. Our portfolio includes national QSR chains (KFC, Arby's, Taco Bell), retail centers, and industrial facilities. Every project meets ADA compliance and Virginia fire lane requirements.`,
  },
  '/sealcoating': {
    title: `Sealcoating Contractor | ${BUSINESS.name} | Chester VA`,
    desc: `Professional asphalt sealcoating protects your investment. Coal tar and polymer-modified options. Residential and commercial. Free estimates.`,
    h1: 'Asphalt Sealcoating Services',
    content: `Sealcoating extends the life of your asphalt by 15-20 years. ${BUSINESS.name} offers both coal tar and polymer-modified sealcoat applications for driveways and parking lots. We recommend sealing every 2-3 years for maximum protection.`,
  },
  '/residential': {
    title: `Residential Driveway Paving | ${BUSINESS.name} | Richmond VA`,
    desc: `New driveways, resurfacing, and repair. Family-owned, 40+ years. Chester, Richmond, Chesterfield, Henrico. Call ${BUSINESS.phone}.`,
    h1: 'Residential Driveway Paving',
    content: `Your driveway is the first thing visitors see. ${BUSINESS.name} builds residential driveways that last 20+ years using proper stone base preparation and VDOT-grade hot mix asphalt. We serve Chester, Richmond, Chesterfield, Henrico, and all of Central Virginia.`,
  },
  '/reviews': {
    title: `Reviews | ${BUSINESS.name} | Customer Testimonials`,
    desc: `See why homeowners and businesses trust ${BUSINESS.name}. Best of Houzz Service winner. 4th generation family quality.`,
    h1: 'Customer Reviews & Testimonials',
    content: `${BUSINESS.name} has earned the trust of hundreds of Virginia homeowners and businesses. We are proud recipients of Best of Houzz Service awards and maintain high standards on every project.`,
  },
  '/tar-and-chip': {
    title: `Tar and Chip Paving | ${BUSINESS.name} | Virginia`,
    desc: `Tar and chip (chip seal) driveways and roads. Affordable alternative to full asphalt. Rural Virginia specialist. Free estimates.`,
    h1: 'Tar & Chip Paving',
    content: `Tar and chip (chip seal) provides a durable, attractive surface at a lower cost than full-depth asphalt. Ideal for rural driveways, farm roads, and low-traffic residential streets. ${BUSINESS.name} has decades of experience with this traditional paving method.`,
  },
  '/gallery': {
    title: `Project Gallery | ${BUSINESS.name} | Before & After Photos`,
    desc: `See our completed asphalt paving projects. Driveways, parking lots, commercial, residential. Before and after photos.`,
    h1: 'Project Gallery',
    content: `Browse completed projects by ${BUSINESS.name}. From residential driveways in Chester to commercial parking lots in Richmond, see the quality of our work firsthand.`,
  },
  '/services': {
    title: `Paving Services | ${BUSINESS.name} | Full Service Virginia Contractor`,
    desc: `Asphalt paving, sealcoating, tar & chip, crack repair, striping, hardscapes. Full-service Virginia contractor since ${BUSINESS.since}.`,
    h1: 'Our Paving Services',
    content: `${BUSINESS.name} offers complete paving services: asphalt paving, sealcoating, tar & chip, crack repair, line striping, concrete work, and hardscaping. Virginia Class A licensed for residential and commercial projects.`,
  },
}

// City/location page generator
function cityMeta(slug) {
  const city = slug.replace('/locations/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(' Va', ' VA')
  return {
    title: `Asphalt Paving ${city} | ${BUSINESS.name}`,
    desc: `Professional asphalt paving in ${city}. Driveways, parking lots, sealcoating. 40+ years experience. Virginia Class A licensed. Call ${BUSINESS.phone}.`,
    h1: `Asphalt Paving in ${city}`,
    content: `${BUSINESS.name} provides professional asphalt paving services in ${city} and surrounding areas. Our services include new driveway installation, parking lot paving, sealcoating, crack repair, and more. Call ${BUSINESS.phone} for a free estimate.`,
  }
}

function serviceAreaMeta(slug) {
  const area = slug.replace('/service-areas/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return {
    title: `Paving Contractor ${area} | ${BUSINESS.name}`,
    desc: `Serving ${area} with professional asphalt paving, sealcoating, and repair. 4th generation family contractor. Call ${BUSINESS.phone}.`,
    h1: `Paving Services — ${area}`,
    content: `${BUSINESS.name} serves ${area} with full-service asphalt paving, sealcoating, and maintenance. With 40+ years of experience and a Virginia Class A license, we deliver quality results on every project.`,
  }
}

function getMeta(route) {
  if (SERVICE_PAGES[route]) return SERVICE_PAGES[route]
  if (route.startsWith('/locations/')) return cityMeta(route)
  if (route.startsWith('/service-areas/')) return serviceAreaMeta(route)
  // Generic fallback
  const name = route.slice(1).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Home'
  return {
    title: `${name} | ${BUSINESS.name}`,
    desc: `${BUSINESS.name} — professional asphalt paving in Virginia since ${BUSINESS.since}. Call ${BUSINESS.phone}.`,
    h1: name,
    content: `${BUSINESS.name} serves Virginia with professional paving services. Call ${BUSINESS.phone} for a free estimate.`,
  }
}

// ─── SKIP INTERNAL TOOL ROUTES ──────────────────────────────────────────────
const SKIP = new Set([
  '/whale-hunter', '/dispatch', '/profit-node', '/portal', '/staff',
  '/command-center', '/dashboard', '/admin', '/crew-eta', '/estimator',
  '/dns-migration', '/candidate', '/revenue', '/voice-calls', '/leads',
])

function shouldSkip(route) {
  return SKIP.has(route) || SKIP.has('/' + route.split('/')[1])
}

// ─── GENERATE ────────────────────────────────────────────────────────────────
function getRoutes() {
  if (!fs.existsSync(SITEMAP)) {
    console.warn('[seo-gen] No sitemap.xml — generating / only')
    return ['/']
  }
  const xml = fs.readFileSync(SITEMAP, 'utf-8')
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
  return [...new Set(urls.map(u => { try { return new URL(u).pathname } catch { return '/' } }))]
    .filter(r => !shouldSkip(r))
}

function generatePage(route) {
  const meta = getMeta(route)
  
  // Replace <title> and <meta description> in the shell HTML
  let html = INDEX_HTML
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${meta.desc}">`
    )
  
  // Inject SEO content div inside <div id="root"> that React will hydrate over
  const seoBlock = `
    <div id="seo-content" style="position:absolute;left:-9999px;overflow:hidden" aria-hidden="false">
      <h1>${meta.h1}</h1>
      <p>${meta.content}</p>
      <p>Call <a href="tel:+18044461296">${BUSINESS.phone}</a> for a free estimate.</p>
      <address>${BUSINESS.address}</address>
    </div>`
  
  html = html.replace('<div id="root"></div>', `<div id="root">${seoBlock}</div>`)
  
  return html
}

function savePage(route, html) {
  const filePath = route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, route, 'index.html')
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, html, 'utf-8')
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
const routes = getRoutes()
console.log(`[seo-gen] Generating SEO pages for ${routes.length} routes...`)

let ok = 0
for (const route of routes) {
  try {
    const html = generatePage(route)
    savePage(route, html)
    ok++
  } catch (err) {
    console.warn(`[seo-gen] Failed: ${route} — ${err.message}`)
  }
}

console.log(`[seo-gen] ✓ ${ok}/${routes.length} pages generated`)
console.log('[seo-gen] Complete.')
