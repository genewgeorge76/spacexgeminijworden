import { createFileRoute, Link } from '@tanstack/react-router'
import products from '../data/products'
import ContactForm from '../components/ContactForm'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="bg-white">
      {/* Differentiator Banner */}
      <div className="bg-[#c8a84b] text-[#111] text-center py-3 px-6 text-[0.85rem] font-bold font-sans tracking-wide">
        ⚠ We are J. Worden & Sons Asphalt Paving — the original, 4th-generation family business. <span className="underline">Independent from all other Worden-named paving entities in Chester, VA.</span>
      </div>

      {/* Hero Section */}
      <section className="bg-linear-to-br from-[#111] to-[#3d3d3d] text-white pt-24 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_40px,rgba(255,255,255,0.015)_40px,rgba(255,255,255,0.015)_80px)] pointer-events-none"></div>
        <div className="inline-block border border-[#c8a84b] text-[#c8a84b] font-sans text-[0.7rem] tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6">
          4th-Generation • Since 1984 • Chester, Virginia
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.18] mb-4 max-w-4xl mx-auto">
          Virginia's Premier <br />
          <span className="text-[#c8a84b]">Asphalt Paving Legacy</span>
        </h1>
        <p className="text-[#e8e8e0] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Four generations of uncompromising craftsmanship. Trusted by Fortune-brand restaurant chains. Serving 41 cities across Virginia with a structural standard that outlasts the competition.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:8044461296" className="bg-[#c8a84b] text-[#111] px-8 py-3.5 rounded-sm font-sans font-bold text-[0.9rem] hover:bg-[#e0c06a] transition-colors">
            Get a Free Estimate
          </a>
          <a href="#about" className="bg-transparent border-2 border-white/45 text-white px-8 py-3 rounded-sm font-sans font-bold text-[0.9rem] hover:border-[#c8a84b] hover:text-[#c8a84b] transition-colors">
            Our Story
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-[#f5f5f0] border-b border-[#e8e8e0] py-10 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col">
            <strong className="text-3xl font-bold text-[#3d3d3d]">1984</strong>
            <span className="font-sans text-[0.7rem] text-[#888] tracking-widest uppercase">Year Founded</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-3xl font-bold text-[#3d3d3d]">4th</strong>
            <span className="font-sans text-[0.7rem] text-[#888] tracking-widest uppercase">Generation Family</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-3xl font-bold text-[#3d3d3d]">41</strong>
            <span className="font-sans text-[0.7rem] text-[#888] tracking-widest uppercase">VA Cities Served</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-3xl font-bold text-[#3d3d3d]">4×</strong>
            <span className="font-sans text-[0.7rem] text-[#888] tracking-widest uppercase">Best of Houzz</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-3xl font-bold text-[#3d3d3d]">3</strong>
            <span className="font-sans text-[0.7rem] text-[#888] tracking-widest uppercase">National Partners</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#c8a84b] mb-2">Our Story</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111] mb-6 leading-tight">Built on Four Generations of Family Craftsmanship</h2>
          <p className="text-[#2b2b2b] text-lg mb-4">
            J. Worden & Sons Asphalt Paving was founded in 1984 with a single commitment: deliver paving that holds up for decades, not just seasons.
          </p>
          <p className="text-[#2b2b2b] text-lg font-bold">
            Note: We are the original J. Worden family business and are entirely independent from any other Worden-named paving operations in Chester.
          </p>
          <ul className="mt-8 pl-6 border-l-3 border-[#c8a84b] space-y-6">
            <li className="relative">
              <span className="font-sans text-[0.75rem] font-bold text-[#c8a84b] tracking-widest uppercase">1984</span>
              <p className="text-[#2b2b2b]">J. Worden & Sons founded in Chester, Virginia. First-generation leadership sets the structural standards.</p>
            </li>
            <li className="relative">
              <span className="font-sans text-[0.75rem] font-bold text-[#c8a84b] tracking-widest uppercase">2015</span>
              <p className="text-[#2b2b2b]">4th-generation leadership transition. Modernized operations while preserving family structural standards.</p>
            </li>
            <li className="relative">
              <span className="font-sans text-[0.75rem] font-bold text-[#c8a84b] tracking-widest uppercase">Today</span>
              <p className="text-[#2b2b2b]">Multi-state commercial partner for KFC, Arby's, and Taco Bell. Serving 41 cities across Virginia.</p>
            </li>
          </ul>
        </div>
        <div className="bg-[#f5f5f0] border border-[#e8e8e0] rounded-sm p-12 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">🏗️</div>
          <p className="text-[#888] font-sans text-sm">Four Generations <br />of Asphalt Excellence</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#f5f5f0] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#c8a84b] mb-2">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111]">Full-Spectrum Paving Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((service) => (
              <Link
                key={service.id}
                to="/products/$productId"
                params={{ productId: service.id.toString() }}
                className="bg-white border border-[#e8e8e0] border-t-3 border-t-[#c8a84b] p-8 rounded-sm hover:shadow-lg transition-shadow group"
              >
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#c8a84b] transition-colors">{service.name}</h3>
                <p className="text-[#888] font-sans text-sm leading-relaxed mb-4">{service.shortDescription}</p>
                <span className="text-[#c8a84b] font-sans text-xs font-bold tracking-widest uppercase">View Details &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Clients Section */}
      <section id="commercial" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#c8a84b] mb-2">Commercial Trust</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111] mb-6">Vetted by National Brands</h2>
          <p className="text-[#2b2b2b] text-lg max-w-3xl mx-auto mb-12">
            J. Worden & Sons has earned and maintained multi-state commercial paving contracts with three of the most quality-conscious brands.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-[140px] h-[80px] bg-[#f5f5f0] border border-[#e8e8e0] rounded flex items-center justify-center font-bold text-xl text-[#3d3d3d]">KFC</div>
            <div className="w-[140px] h-[80px] bg-[#f5f5f0] border border-[#e8e8e0] rounded flex items-center justify-center font-bold text-xl text-[#3d3d3d]">Arby's</div>
            <div className="w-[140px] h-[80px] bg-[#f5f5f0] border border-[#e8e8e0] rounded flex items-center justify-center font-bold text-xl text-[#3d3d3d]">Taco Bell</div>
          </div>
        </div>
      </section>

      {/* Structural Standard Section */}
      <section id="standard" className="bg-[#111] text-white py-24 px-6">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#c8a84b] mb-2">Structural Standard</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The 6-Inch Compacted Stone Difference</h2>
            <p className="text-[#e8e8e0] text-lg mb-8 leading-relaxed">
              Every J. Worden & Sons project begins with a 6-inch compacted stone structural base — the same engineering standard used in municipal roadways.
            </p>
            <div className="bg-white/5 border border-[#c8a84b]/30 rounded-sm p-10 flex items-center gap-8">
              <span className="text-6xl font-bold text-[#c8a84b]">6"</span>
              <p className="text-sm text-[#e8e8e0] font-sans leading-relaxed">
                Compacted aggregate stone base layer applied on every project across our 41-city Virginia service grid. No shortcuts. No exceptions.
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-[#c8a84b]/20 rounded-sm h-[320px] flex flex-col items-center justify-center text-center">
             <div className="text-6xl mb-4">📐</div>
             <p className="text-[#c8a84b] font-sans">41 Virginia Cities <br />One Uncompromising Standard</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#2b2b2b] text-white py-24 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-[#c8a84b] mb-2">Reach Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Request a Free Estimate</h2>
          <p className="text-[#e8e8e0] text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
            Ready to discuss your commercial or residential paving project? Contact us for a no-obligation estimate. We serve all 41 cities in our Virginia grid and multi-state commercial clients.
          </p>
          
          <ContactForm />

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16 text-left">
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
              <p className="font-sans text-[0.7rem] tracking-widest uppercase text-[#c8a84b] mb-1">Phone</p>
              <p className="text-lg">804-446-1296</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
              <p className="font-sans text-[0.7rem] tracking-widest uppercase text-[#c8a84b] mb-1">Email</p>
              <p className="text-lg text-sm truncate">info@jwordenasphalt.com</p>
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
