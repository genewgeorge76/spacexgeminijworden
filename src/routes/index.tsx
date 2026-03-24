import { createFileRoute } from '@tanstack/react-router'
import ContactForm from '../components/ContactForm'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

const stats = [
  { value: '1984', label: 'Year Founded' },
  { value: '4th Gen', label: 'Family Leadership' },
  { value: '41', label: 'Virginia Cities' },
  { value: '6"', label: 'Compacted Stone Base' },
  { value: '804-446-1296', label: 'Direct Line' },
]

const services = [
  {
    title: 'Corporate Parking Lots',
    detail: 'QSR, grocery, and retail anchors built to brand-approved specs with 6-inch compacted stone bases.',
  },
  {
    title: 'Restaurant Refresh & Rebuild',
    detail: 'Drive-thru lanes, ADA compliance, mill-and-overlay, and re-striping without closing your doors.',
  },
  {
    title: 'Commercial Asphalt Maintenance',
    detail: 'Crack sealing, sealcoating, and preventive maintenance programs that preserve capital budgets.',
  },
  {
    title: 'Residential Driveways',
    detail: 'Family driveways using the same engineering standard as our national-brand commercial projects.',
  },
  {
    title: 'Logistics & Industrial',
    detail: 'Heavy-load truck courts, loading areas, and grocery logistics pads engineered to stay tight and true.',
  },
  {
    title: 'Emergency & Weather Response',
    detail: 'Rapid-response repairs for storm washouts, potholes, and winter damage across our 41-city grid.',
  },
]

const vettedBrands = [
  { name: 'KFC', caption: 'National restaurant program', accent: 'bg-[#d11217] text-white' },
  { name: 'Taco Bell', caption: 'Drive-thru + parking rotation', accent: 'bg-[#5c2d91] text-white' },
  { name: 'Winn-Dixie', caption: 'Grocery logistics & resurfacing', accent: 'bg-[#c8102e] text-white' },
]

const differentiators = [
  'Corporate vetted by KFC, Taco Bell, and Winn-Dixie.',
  '6-inch compacted stone base on every build.',
  '4th-generation Virginia leadership with multi-state reach.',
  'Direct, owner-led communication at 804-446-1296.',
]

function LandingPage() {
  return (
    <div className="bg-white text-[#1f1f1a]">
      <div className="bg-[#c8a84b] text-[#0f0f0f] text-center py-3 px-6 text-[0.9rem] font-semibold font-sans tracking-wide">
        ⚠ J. Worden & Sons Asphalt Paving — the original, 4th-generation family business. Independent from all other Worden-named paving entities in Chester, VA.
      </div>

      <section className="bg-linear-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2b2b2b] text-white pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,168,75,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(200,168,75,0.08),transparent_30%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#c8a84b]/70 text-[#c8a84b] font-sans text-[0.75rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-6">
              Elite Asphalt Authority • Since 1984
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-4">
              Corporate-Vetted Asphalt Paving that Holds Up for Decades
            </h1>
            <p className="text-[#e8e8e0] text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
              J. Worden & Sons is the 4th-generation, Virginia-based contractor trusted by KFC, Taco Bell, and Winn-Dixie. Every project — commercial or residential — starts with a 6-inch compacted stone base.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="tel:8044461296"
                className="bg-[#c8a84b] text-[#0f0f0f] px-6 py-3 rounded-sm font-semibold tracking-wide text-[0.95rem] hover:bg-[#e0c06a] transition-colors"
              >
                Call 804-446-1296
              </a>
              <a
                href="#contact"
                className="border border-white/50 text-white px-6 py-3 rounded-sm font-semibold tracking-wide text-[0.95rem] hover:border-[#c8a84b] hover:text-[#c8a84b] transition-colors"
              >
                Request an Estimate
              </a>
            </div>
            <ul className="space-y-2 text-[#d9d9cf] text-sm">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#c8a84b] mt-[2px]">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-[#c8a84b]/20 rounded-sm p-6 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#0f0f0f]/60 border border-white/10 rounded-sm p-4 text-center">
                <div className="text-2xl font-bold text-[#c8a84b]">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-[#d9d9cf]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vetted" className="bg-[#f8f6ef] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-sans text-[0.75rem] tracking-[0.18em] uppercase text-[#c8a84b] mb-2">Corporate Vetted</p>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1a] mb-4">Locked into National Brand Standards</h2>
              <p className="text-lg text-[#2c2c26] leading-relaxed">
                Proof on the ground: the KFC, Taco Bell, and Winn-Dixie logos are locked into our corporate vetted section because those brands trust J. Worden & Sons to deliver their parking lots, drive-thru lanes, and logistics pads across Virginia and neighboring states.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center bg-[#0f0f0f] text-[#c8a84b] px-3 py-2 text-xs uppercase tracking-widest rounded-sm">
                3 Corporate Programs
              </span>
              <span className="inline-flex items-center bg-[#c8a84b]/15 text-[#2c2c26] px-3 py-2 text-xs uppercase tracking-widest rounded-sm">
                Brand-logo compliant
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {vettedBrands.map((brand) => (
              <div key={brand.name} className="border border-[#e2dfd4] rounded-sm overflow-hidden shadow-sm bg-white">
                <div className={`h-20 flex items-center justify-center text-2xl font-black ${brand.accent}`}>
                  {brand.name}
                </div>
                <div className="p-4 text-sm text-[#42413c] font-semibold uppercase tracking-wide">Corporate Vetted</div>
                <div className="px-4 pb-4 text-[#5a584f] text-sm leading-relaxed">{brand.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-sans text-[0.75rem] tracking-[0.18em] uppercase text-[#c8a84b] mb-2">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1a] mb-4">Four Generations of Proof-First Paving</h2>
            <p className="text-lg text-[#2c2c26] leading-relaxed mb-4">
              Founded in 1984, J. Worden & Sons Asphalt Paving has stayed in the same family for four generations. We built our reputation by delivering lots that stay tight, smooth, and safe long after the ribbon cutting.
            </p>
            <p className="text-lg text-[#2c2c26] leading-relaxed">
              We are the original J. Worden family business — fully independent from any other Worden-named paving operations in Chester.
            </p>
          </div>
          <div className="bg-[#0f0f0f] text-white rounded-sm p-8 space-y-6">
            <div>
              <p className="text-[#c8a84b] text-xs uppercase tracking-[0.18em] mb-1">1984</p>
              <p className="text-sm text-[#e8e8e0]">First-generation leadership establishes the 6-inch compacted stone requirement that still defines our work.</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-[#c8a84b] text-xs uppercase tracking-[0.18em] mb-1">2015</p>
              <p className="text-sm text-[#e8e8e0]">Fourth-generation leadership modernizes operations while preserving the structural standard and family-led accountability.</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-[#c8a84b] text-xs uppercase tracking-[0.18em] mb-1">Today</p>
              <p className="text-sm text-[#e8e8e0]">Multi-state work for KFC, Taco Bell, and Winn-Dixie plus residential driveways built with the same commercial-grade standard.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f8f6ef] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-sans text-[0.75rem] tracking-[0.18em] uppercase text-[#c8a84b] mb-2">What We Build</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1a]">Commercial-Grade Asphalt, Delivered Precisely</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white border border-[#e2dfd4] rounded-sm p-6 shadow-sm hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-bold mb-3 text-[#1f1f1a]">{service.title}</h3>
                <p className="text-sm text-[#5a584f] leading-relaxed">{service.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="standard" className="bg-[#0f0f0f] text-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="font-sans text-[0.75rem] tracking-[0.18em] uppercase text-[#c8a84b] mb-2">Structural Standard</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The 6-Inch Compacted Stone Difference</h2>
            <p className="text-lg text-[#e8e8e0] leading-relaxed mb-6">
              Every project begins with a six-inch compacted stone base — the same engineering requirement used on municipal roadways. It is why our lots stay smooth through freeze-thaw cycles and heavy truck traffic.
            </p>
            <div className="bg-white/5 border border-[#c8a84b]/25 rounded-sm p-6 flex flex-col sm:flex-row items-center gap-4">
              <span className="text-5xl font-black text-[#c8a84b]">6"</span>
              <p className="text-sm text-[#e8e8e0] leading-relaxed">
                One structural rule across 41 Virginia cities and every corporate site we pave. No shortcuts, no exceptions — just proof-driven performance.
              </p>
            </div>
          </div>
          <div className="bg-white text-[#1f1f1a] rounded-sm p-6 shadow-md space-y-4">
            <h3 className="text-lg font-bold">Why it Matters</h3>
            <ul className="space-y-3 text-sm text-[#3a392f]">
              <li className="flex gap-2">
                <span className="text-[#c8a84b] mt-[2px]">▸</span>
                Reduced settlement, rutting, and water intrusion for long-term durability.
              </li>
              <li className="flex gap-2">
                <span className="text-[#c8a84b] mt-[2px]">▸</span>
                Faster striping and turnover because the subgrade stays firm and true.
              </li>
              <li className="flex gap-2">
                <span className="text-[#c8a84b] mt-[2px]">▸</span>
                Lower lifetime maintenance costs for brand programs and local owners alike.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#1f1f1a] text-white py-20 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="font-sans text-[0.75rem] tracking-[0.18em] uppercase text-[#c8a84b] mb-2">Reach Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Talk with the Family That Builds It</h2>
          <p className="text-[#e8e8e0] text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Call 804-446-1296 or send the form below. Whether you manage corporate facilities or need a driveway that lasts, you will speak directly with J. Worden leadership.
          </p>

          <ContactForm />

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-14 text-left">
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
              <p className="font-sans text-[0.7rem] tracking-widest uppercase text-[#c8a84b] mb-1">Phone</p>
              <p className="text-lg">804-446-1296</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
              <p className="font-sans text-[0.7rem] tracking-widest uppercase text-[#c8a84b] mb-1">Email</p>
              <p className="text-sm truncate">info@jwordenasphalt.com</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
              <p className="font-sans text-[0.7rem] tracking-widest uppercase text-[#c8a84b] mb-1">Location</p>
              <p className="text-lg">Chester, Virginia</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
              <p className="font-sans text-[0.7rem] tracking-widest uppercase text-[#c8a84b] mb-1">Hours</p>
              <p className="text-lg">Mon–Fri, 7–5</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
