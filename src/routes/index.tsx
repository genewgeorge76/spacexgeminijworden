import { createFileRoute } from '@tanstack/react-router';
import ContactForm from '../components/ContactForm';
import PrecisionEstimator from '../components/PrecisionEstimator';
import XRayComparison from '../components/XRayComparison';
import TestimonialCarousel from '../components/TestimonialCarousel';

export const Route = createFileRoute('/')({
  component: () => (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#ffcc00] selection:text-black">
      {/* Hero Section — Video Background */}
      <section className="relative py-48 md:py-64 px-6 lg:px-12 border-b-[8px] border-[#ffcc00] overflow-hidden flex items-center justify-center min-h-[70vh]">
        {/* 4K Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster="/asphalt-paving-with-paver.jpg"
        >
          <source src="/videos/industrial-paving-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-[1]"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block text-[#ffcc00] font-bold uppercase tracking-[0.2em] text-sm mb-6 border border-[#ffcc00]/30 px-4 py-2 rounded-full">
            4th Generation · Since 1984
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white leading-[1.1] tracking-tight drop-shadow-2xl">
            4th Generation<br />
            <span className="text-[#ffcc00]">Paving Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mt-8 max-w-3xl mx-auto font-medium leading-relaxed border-l-4 border-[#ffcc00] pl-6 text-left">
            Delivering uncompromising quality serving Richmond 23221 and 41 surrounding cities with premium paving solutions.
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-zinc-900 border-b border-zinc-800 py-6 px-6 relative z-20 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="text-zinc-400 uppercase tracking-widest text-sm font-bold">Recognized for Excellence</div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {['2023', '2016', '2015', '2014'].map((year) => (
              <div key={year} className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-[#7ac143] flex items-center justify-center font-bold text-white shadow-lg text-lg">
                  H
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 leading-none mb-1">Best of Houzz</span>
                  <span className="text-sm font-black leading-none">{year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Worden Standard & Awards Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-950 relative border-y border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#ffcc00]/10 via-zinc-950 to-black z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight drop-shadow-lg mb-6">
              <span className="text-[#ffcc00]">The J. Worden & Sons</span><br />Asphalt Standard
            </h2>
            <div className="w-32 h-1.5 bg-[#ffcc00] mx-auto"></div>
          </div>

          {/* The Awards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24 text-center">
            <div className="flex flex-col items-center justify-center p-8 bg-[#ffcc00] rounded-2xl border-4 border-white shadow-[0_0_30px_rgba(255,204,0,0.4)] transform hover:-translate-y-2 transition-transform">
              <p className="text-3xl md:text-4xl font-black text-black uppercase leading-tight drop-shadow-sm">
                Voted Best Asphalt Paving Company
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl border border-zinc-800 shadow-2xl hover:border-[#ffcc00]/50 transition-all">
              <p className="text-3xl md:text-4xl font-black text-[#ffcc00] uppercase leading-tight drop-shadow-[0_2px_10px_rgba(255,204,0,0.3)]">
                4-Time Best of Houzz Winner
              </p>
              <span className="text-2xl font-bold text-white mt-4 tracking-wider">(2023, 2016, 2015, 2014)</span>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl border border-zinc-800 shadow-2xl hover:border-[#ffcc00]/50 transition-all">
              <p className="text-3xl md:text-4xl font-black text-[#ffcc00] uppercase leading-tight drop-shadow-[0_2px_10px_rgba(255,204,0,0.3)]">
                2026 Houzz Authority Certified
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl border border-zinc-800 shadow-2xl hover:border-[#ffcc00]/50 transition-all">
              <p className="text-3xl md:text-4xl font-black text-[#ffcc00] uppercase leading-tight drop-shadow-[0_2px_10px_rgba(255,204,0,0.3)]">
                Top Contractor Award Winner
              </p>
              <span className="text-xl font-bold text-zinc-300 mt-4 tracking-wide">(Pavement & Maintenance Magazine)</span>
            </div>
          </div>

          {/* Trust Badges Sub-section */}
          <div className="bg-black/80 border border-[#ffcc00]/30 rounded-3xl p-10 md:p-16 shadow-[0_0_50px_rgba(255,204,0,0.1)] mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center text-center">
              <a href="https://www.houzz.com/pro/jwordenandsonspaving/j-worden-sons-paving-l-l-c" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center">
                <div className="w-20 h-20 mb-6 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center group-hover:border-[#ffcc00] transition-colors shadow-lg">
                  <span className="text-4xl font-black text-[#ffcc00]">H</span>
                </div>
                <span className="text-3xl md:text-4xl font-black text-white group-hover:text-[#ffcc00] transition-colors mb-6">Recommended on Houzz</span>
                <span className="inline-block px-8 py-4 bg-[#ffcc00] text-black text-xl font-black uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(255,204,0,0.3)] group-hover:bg-white transition-colors">View Our Profile →</span>
              </a>

              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl md:text-7xl font-black text-[#ffcc00] mb-4 drop-shadow-[0_2px_15px_rgba(255,204,0,0.4)]">500+</span>
                <span className="text-3xl md:text-4xl font-black text-white">Ideabook Saves</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#ffcc00] text-black px-10 py-8 rounded-3xl shadow-[0_0_40px_rgba(255,204,0,0.4)] border-4 border-white flex flex-col items-center transform hover:scale-105 transition-transform w-full max-w-md">
                  <span className="text-6xl md:text-7xl font-black mb-2 drop-shadow-md">A+</span>
                  <span className="text-3xl md:text-4xl font-black uppercase text-center leading-tight">BBB Accredited<br /><span className="text-xl font-bold opacity-80 mt-2 block">Since 1994</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Service Pillar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl">
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase text-white mb-6 border-b-2 border-zinc-800 pb-4">
                The 6-Inch Structural Base
              </h3>
              <div className="space-y-6 text-xl text-zinc-300 leading-relaxed">
                <p>
                  While competitors cut corners, we establish the gold standard for longevity and drainage. The secret to an asphalt surface that lasts decades isn't just the blacktop—it's what lies beneath.
                </p>
                <p>
                  Our signature <strong className="text-[#ffcc00] font-bold">6-Inch Structural Stone Base</strong> provides unparalleled load-bearing capacity and superior water runoff management.
                </p>
                <ul className="mt-8 space-y-4 font-bold text-white text-lg">
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-[#ffcc00] rounded-sm shadow-[0_0_8px_rgba(255,204,0,0.8)]"></span>
                    Maximum Weight Distribution & Load Capacity
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-[#ffcc00] rounded-sm shadow-[0_0_8px_rgba(255,204,0,0.8)]"></span>
                    Optimized Sub-Surface Drainage
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-[#ffcc00] rounded-sm shadow-[0_0_8px_rgba(255,204,0,0.8)]"></span>
                    Immunity to Frost-Heave and Subsoil Shifting
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-black p-2 rounded-xl border border-zinc-800 shadow-2xl relative">
              <div className="aspect-square md:aspect-video lg:aspect-square bg-zinc-950 rounded-lg relative flex items-center justify-center border border-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/asphalt-paving-with-paver.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
                <div className="text-center relative z-10 p-8">
                  <span className="block text-8xl font-black text-[#ffcc00] mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">6"</span>
                  <span className="block text-3xl font-black uppercase tracking-widest text-white drop-shadow-md">Structural Base</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              Our Premium <span className="text-[#ffcc00]">Services</span>
            </h2>
            <div className="w-24 h-1 bg-[#ffcc00] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-zinc-900 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-300 p-8 rounded-xl relative overflow-hidden shadow-lg hover:shadow-[#ffcc00]/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcc00]/5 rounded-bl-full -z-0 group-hover:bg-[#ffcc00]/10 transition-colors"></div>
              <h3 className="text-2xl font-bold uppercase text-white mb-4 relative z-10 group-hover:text-[#ffcc00] transition-colors">Residential Estate Paving</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                Transform your property's entrance with premium residential estate paving built on our structural stone base.
              </p>
            </div>

            <div className="group bg-zinc-900 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-300 p-8 rounded-xl relative overflow-hidden shadow-lg hover:shadow-[#ffcc00]/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcc00]/5 rounded-bl-full -z-0 group-hover:bg-[#ffcc00]/10 transition-colors"></div>
              <h3 className="text-2xl font-bold uppercase text-white mb-4 relative z-10 group-hover:text-[#ffcc00] transition-colors">Commercial Parking Lots</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                High-traffic surfaces demand heavy-duty solutions. ADA-compliant, high-durability installations serving KFC, Arby's, CVS, and Taco Bell.
              </p>
            </div>

            <div className="group bg-zinc-900 border border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-300 p-8 rounded-xl relative overflow-hidden shadow-lg hover:shadow-[#ffcc00]/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcc00]/5 rounded-bl-full -z-0 group-hover:bg-[#ffcc00]/10 transition-colors"></div>
              <h3 className="text-2xl font-bold uppercase text-white mb-4 relative z-10 group-hover:text-[#ffcc00] transition-colors">Tar & Chip Paving</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                Achieve a rustic, elegant aesthetic without sacrificing durability. Excellent traction and minimal maintenance for long private roads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Showcase */}
      <section className="py-24 px-6 lg:px-12 bg-black border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              Recent <span className="text-[#ffcc00]">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-[#ffcc00] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/cvs-asphalt-paving.jpg', alt: 'Commercial Parking Lot - Richmond', category: 'Commercial', title: 'Retail Parking Lot - Richmond' },
              { src: '/asphalt-driveway-chesterfield-va.jpg', alt: 'Residential Estate - Chesterfield', category: 'Residential', title: 'Estate Driveway - Chesterfield' },
              { src: '/asphalt-paving-car-lot-on-midlothian.jpg', alt: 'Commercial Auto Lot - Midlothian', category: 'Commercial', title: 'Auto Lot - Midlothian' },
              { src: '/jwordenandsonspaving-maidstone-photo.jpeg', alt: 'Residential Estate - Maidstone', category: 'Residential', title: 'Estate Driveway - Maidstone' },
              { src: '/parking-lot-pave-richmond-va.jpg', alt: 'Commercial Parking Lot - Richmond', category: 'Commercial', title: 'Office Park - Richmond' },
              { src: '/asphalt-paving-with-paver.jpg', alt: 'Paving Operations - Central Virginia', category: 'Operations', title: 'Heavy Paving - Central Virginia' },
            ].map((project, idx) => (
              <div key={project.title} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900 cursor-pointer shadow-xl">
                <img src={project.src} alt={project.alt} loading={idx === 0 ? 'eager' : 'lazy'} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-[#ffcc00] text-sm font-bold uppercase tracking-widest mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.category}</span>
                  <h3 className="text-2xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel />

      {/* Expertise & Recognition Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              National-Grade Excellence <span className="text-[#ffcc00]">in Every Category</span>
            </h2>
            <div className="w-24 h-1 bg-[#ffcc00] mx-auto mt-6 mb-12"></div>

            <div className="inline-block bg-[#ffcc00] text-black px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(255,204,0,0.3)] border-2 border-white transform hover:scale-105 transition-transform">
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider">
                🏆 Voted Best Asphalt Paving Company — Richmond, VA
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { title: 'PAVING', icon: '🛣️' },
              { title: 'SEALCOATING', icon: '🛡️' },
              { title: 'STRIPING', icon: '📏' },
              { title: 'REPAIR', icon: '🔧' }
            ].map((service, index) => (
              <div key={index} className="flex flex-col items-center group bg-zinc-900 border border-zinc-800 p-8 rounded-xl hover:border-[#ffcc00]/50 transition-all shadow-xl hover:shadow-[#ffcc00]/10">
                <div className="w-20 h-20 bg-black border-2 border-[#ffcc00] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,204,0,0.2)] text-3xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 tracking-wide">{service.title}</h3>
                <div className="bg-black/60 border border-zinc-800 px-4 py-3 rounded-lg w-full text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-[#ffcc00] text-lg">★</span>)}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-tight block">
                    Pavement Top 75<br />National Excellence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Focus Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-6">
                Headquartered in <span className="text-[#ffcc00]">Chester</span>
              </h2>
              <div className="bg-black/50 p-6 rounded-xl border border-zinc-800 inline-block mb-8 shadow-inner">
                <p className="text-xl font-bold text-white tracking-wide">1601 Ware Bottom Springs Rd</p>
                <p className="text-zinc-400 mt-1">Chester, VA 23836</p>
              </div>
              <p className="text-lg text-zinc-300 mb-6 max-w-lg leading-relaxed">
                Strategically located to dispatch our heavy equipment fleet quickly across Central Virginia.
              </p>
              <div className="flex flex-wrap gap-4 mb-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=1601+Ware+Bottom+Springs+Rd+Chester+VA+23836"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
                    if (w.gtag) w.gtag('event', 'click', { event_category: 'directions', event_label: 'google_maps' });
                  }}
                  className="flex items-center gap-2 bg-[#ffcc00] text-black px-6 py-3 font-black uppercase tracking-widest text-sm hover:bg-white transition-colors shadow-lg"
                >
                  📍 Get Directions
                </a>
                <a
                  href="https://www.google.com/maps/place/J.+Worden+%26+Sons+Paving+LLC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-[#ffcc00] text-[#ffcc00] px-6 py-3 font-black uppercase tracking-widest text-sm hover:bg-[#ffcc00] hover:text-black transition-colors"
                >
                  ⭐ Google Business Profile
                </a>
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <div className="bg-black border border-zinc-800 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#ffcc00]"></div>
                <h3 className="text-xl font-bold uppercase text-white mb-8 tracking-wider">Primary Service Areas</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-lg text-zinc-300 font-medium">
                  {['Midlothian', 'Chesterfield', 'Powhatan', 'Richmond', 'Glen Allen', 'Mechanicsville'].map((city) => (
                    <div key={city} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#ffcc00] rounded-full shadow-[0_0_8px_rgba(255,204,0,0.8)]"></div>
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl">
            <iframe
              title="J. Worden &amp; Sons Paving — Chester VA Headquarters"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.5!2d-77.3986!3d37.3592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1601+Ware+Bottom+Springs+Rd%2C+Chester%2C+VA+23836!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="350"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* X-Ray Comparison Section */}
      <XRayComparison />

      {/* PRECISION ESTIMATOR SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-900 border-t border-[#ffcc00]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tighter mb-4">
              Instant <span className="text-[#ffcc00]">Price Intelligence</span>
            </h2>
            <p className="text-lg text-zinc-400 font-bold max-w-2xl mx-auto">
              Get a real-time project estimate. No email required. No sales calls. Pure structural math.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <PrecisionEstimator />
          </div>
        </div>
      </section>

      {/* DISPATCH / CONTACT SECTION */}
      <section className="py-32 px-6 lg:px-12 bg-black border-t border-[#ffcc00]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tighter mb-4">
              Dispatch an <span className="text-[#ffcc00]">Estimator</span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-bold italic max-w-3xl mx-auto">
              Schedule an on-site structural evaluation for your next paving project.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  ),
});
