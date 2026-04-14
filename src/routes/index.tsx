import { createFileRoute, Link } from '@tanstack/react-router';
import ContactForm from '../components/ContactForm';
import PrecisionEstimator from '../components/PrecisionEstimator';
import AutonomousEstimator from '../components/AutonomousEstimator';
import XRayComparison from '../components/XRayComparison';
import TestimonialCarousel from '../components/TestimonialCarousel';
import CustomerQuoteForm from '../components/CustomerQuoteForm';
import CommandBotUI from '../components/CommandBot';
import PartnerPortal from '../components/PartnerPortal';

export const Route = createFileRoute('/')({
  component: () => (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* Hero Section — Video Background */}
      <section className="relative py-48 md:py-64 px-6 lg:px-12 overflow-hidden flex items-center justify-center min-h-[80vh] border-b border-amber-400/20">
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
        {/* Deep cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-zinc-950/95 z-[1]"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 z-[2] opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Neon glow accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[3] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_rgba(251,191,36,0.8)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
          <span className="inline-block text-amber-400 font-semibold uppercase tracking-[0.35em] text-xs mb-8 border border-amber-400/40 bg-amber-400/5 backdrop-blur-sm px-6 py-2.5 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
            4th Generation · Est. 1984 · Virginia Class A Licensed
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light uppercase text-white leading-[1.1] tracking-[0.08em] drop-shadow-2xl mb-2">
            J. WORDEN &amp; SONS —
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold uppercase leading-[1.1] tracking-[0.06em] drop-shadow-2xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent [text-shadow:none] mb-8">
            50-STATE COMMERCIAL ASPHALT INFRASTRUCTURE
          </h1>
          <p className="text-base md:text-lg text-zinc-300/90 max-w-2xl mx-auto font-light tracking-[0.05em] italic">
            Powered by <span className="text-amber-400 font-semibold not-italic tracking-widest">JWORDENAI™</span> Predictive Logistics &amp; Pricing Optimization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href="tel:804-446-1296"
              className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 text-black px-10 py-4 font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_45px_rgba(251,191,36,0.6)] transition-all duration-300"
            >
              ☎ 804-446-1296
            </a>
            <a
              href="#contact"
              className="inline-block border border-amber-400/50 bg-white/5 backdrop-blur-md text-amber-400 px-10 py-4 font-semibold uppercase tracking-[0.2em] text-sm hover:bg-amber-400/10 hover:border-amber-400 transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
            >
              Request Command Briefing →
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white/5 backdrop-blur-md border-b border-white/10 py-6 px-6 relative z-20 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="text-zinc-400 uppercase tracking-widest text-xs font-semibold">Recognized for Excellence</div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {['2023', '2016', '2015', '2014'].map((year) => (
              <div key={year} className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-[#7ac143] flex items-center justify-center font-bold text-white shadow-lg text-lg">
                  H
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 leading-none mb-1">Best of Houzz</span>
                  <span className="text-sm font-black leading-none">{year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Worden Standard & Awards Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-950 relative border-y border-amber-400/15 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-400/8 via-zinc-950 to-black z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block text-amber-400/70 uppercase tracking-[0.35em] text-xs font-semibold mb-6">The Standard</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light uppercase text-white tracking-[0.08em] drop-shadow-lg mb-3">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent font-semibold">The J. Worden &amp; Sons</span>
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light uppercase text-white tracking-[0.08em] drop-shadow-lg mb-8">Asphalt Standard</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
          </div>

          {/* The Awards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24 text-center">
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-400 to-yellow-400 shadow-[0_0_40px_rgba(251,191,36,0.35)] transform hover:-translate-y-2 transition-all duration-300">
              <p className="text-2xl md:text-3xl font-bold text-black uppercase leading-tight tracking-wide">
                Voted Best Asphalt Paving Company
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all duration-300">
              <p className="text-2xl md:text-3xl font-semibold text-amber-400 uppercase leading-tight tracking-wide drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                4-Time Best of Houzz Winner
              </p>
              <span className="text-xl font-light text-zinc-300 mt-4 tracking-wider">(2023, 2016, 2015, 2014)</span>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all duration-300">
              <p className="text-2xl md:text-3xl font-semibold text-amber-400 uppercase leading-tight tracking-wide drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                2026 Houzz Authority Certified
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all duration-300">
              <p className="text-2xl md:text-3xl font-semibold text-amber-400 uppercase leading-tight tracking-wide drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                Top Contractor Award Winner
              </p>
              <span className="text-lg font-light text-zinc-300 mt-4 tracking-wide">(Pavement &amp; Maintenance Magazine)</span>
            </div>
          </div>

          {/* Trust Badges Sub-section */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-16 shadow-[0_0_50px_rgba(251,191,36,0.06)] mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center text-center">
              <a href="https://www.houzz.com/pro/jwordenandsonspaving/j-worden-sons-paving-l-l-c" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center">
                <div className="w-20 h-20 mb-6 bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-amber-400/50 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all shadow-lg">
                  <span className="text-4xl font-black text-amber-400">H</span>
                </div>
                <span className="text-2xl md:text-3xl font-semibold text-white group-hover:text-amber-400 transition-colors mb-6 uppercase tracking-wide">Recommended on Houzz</span>
                <span className="inline-block px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-black text-lg font-bold uppercase tracking-[0.15em] shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:shadow-[0_0_35px_rgba(251,191,36,0.5)] transition-all">View Our Profile →</span>
              </a>

              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl md:text-7xl font-black text-amber-400 mb-4 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">500+</span>
                <span className="text-2xl md:text-3xl font-semibold text-white uppercase tracking-wide">Ideabook Saves</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-gradient-to-br from-amber-400 to-yellow-400 text-black px-10 py-8 shadow-[0_0_40px_rgba(251,191,36,0.4)] flex flex-col items-center transform hover:scale-105 transition-transform w-full max-w-md">
                  <span className="text-6xl md:text-7xl font-black mb-2 drop-shadow-md">A+</span>
                  <span className="text-2xl md:text-3xl font-bold uppercase text-center leading-tight tracking-wide">BBB Accredited<br /><span className="text-lg font-semibold opacity-80 mt-2 block">Since 1994</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Service Pillar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 shadow-2xl">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold uppercase text-white mb-6 border-b border-white/10 pb-4 tracking-widest">
                The 6-Inch Structural Base
              </h3>
              <div className="space-y-6 text-lg text-zinc-300 leading-relaxed font-light">
                <p>
                  While competitors cut corners, we establish the gold standard for longevity and drainage. The secret to an asphalt surface that lasts decades isn't just the blacktop—it's what lies beneath.
                </p>
                <p>
                  Our signature <strong className="text-amber-400 font-semibold">6-Inch Structural Stone Base</strong> provides unparalleled load-bearing capacity and superior water runoff management.
                </p>
                <ul className="mt-8 space-y-4 font-medium text-white text-base">
                  <li className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] flex-shrink-0"></span>
                    Maximum Weight Distribution &amp; Load Capacity
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] flex-shrink-0"></span>
                    Optimized Sub-Surface Drainage
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] flex-shrink-0"></span>
                    Immunity to Frost-Heave and Subsoil Shifting
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative">
              <div className="aspect-square md:aspect-video lg:aspect-square bg-zinc-950 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/asphalt-paving-with-paver.jpg')] bg-cover bg-center opacity-25 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/50"></div>
                <div className="text-center relative z-10 p-8">
                  <span className="block text-8xl font-black text-amber-400 mb-2 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">6"</span>
                  <span className="block text-2xl font-semibold uppercase tracking-widest text-white drop-shadow-md">Structural Base</span>
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
            <span className="inline-block text-amber-400/70 uppercase tracking-[0.35em] text-xs font-semibold mb-4">What We Build</span>
            <h2 className="text-3xl md:text-5xl font-light uppercase text-white tracking-[0.08em]">
              Our Premium <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent font-semibold">Services</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6 shadow-[0_0_8px_rgba(251,191,36,0.4)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.08)] transition-all duration-300 p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/3 -z-0 group-hover:bg-amber-400/5 transition-colors"></div>
              <h3 className="text-xl font-semibold uppercase text-white mb-4 relative z-10 group-hover:text-amber-400 transition-colors tracking-widest">Residential Estate Paving</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10 font-light">
                Transform your property's entrance with premium residential estate paving built on our structural stone base.
              </p>
            </div>

            <div className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.08)] transition-all duration-300 p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/3 -z-0 group-hover:bg-amber-400/5 transition-colors"></div>
              <h3 className="text-xl font-semibold uppercase text-white mb-4 relative z-10 group-hover:text-amber-400 transition-colors tracking-widest">Commercial Parking Lots</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10 font-light">
                High-traffic surfaces demand heavy-duty solutions. ADA-compliant, high-durability installations serving KFC, Arby's, CVS, and Taco Bell.
              </p>
            </div>

            <div className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.08)] transition-all duration-300 p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/3 -z-0 group-hover:bg-amber-400/5 transition-colors"></div>
              <h3 className="text-xl font-semibold uppercase text-white mb-4 relative z-10 group-hover:text-amber-400 transition-colors tracking-widest">Tar &amp; Chip Paving</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10 font-light">
                Achieve a rustic, elegant aesthetic without sacrificing durability. Excellent traction and minimal maintenance for long private roads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Showcase */}
      <section className="py-24 px-6 lg:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400/70 uppercase tracking-[0.35em] text-xs font-semibold mb-4">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-light uppercase text-white tracking-[0.08em]">
              Recent <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent font-semibold">Projects</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6 shadow-[0_0_8px_rgba(251,191,36,0.4)]"></div>
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
              <div key={project.title} className="group relative aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer shadow-xl border border-white/5 hover:border-amber-400/20 transition-all duration-300">
                <img src={project.src} alt={project.alt} loading={idx === 0 ? 'eager' : 'lazy'} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.category}</span>
                  <h3 className="text-xl font-semibold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 text-black px-10 py-4 font-bold uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel />

      {/* Expertise & Recognition Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400/70 uppercase tracking-[0.35em] text-xs font-semibold mb-4">Recognition</span>
            <h2 className="text-3xl md:text-5xl font-light uppercase text-white tracking-[0.08em]">
              National-Grade Excellence <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent font-semibold">in Every Category</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6 mb-12 shadow-[0_0_8px_rgba(251,191,36,0.4)]"></div>

            <div className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 text-black px-8 py-4 shadow-[0_0_30px_rgba(251,191,36,0.3)] transform hover:scale-105 transition-transform">
              <span className="text-xl md:text-2xl font-bold uppercase tracking-wider">
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
              <div key={index} className="flex flex-col items-center group bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.08)] transition-all shadow-xl">
                <div className="w-20 h-20 bg-black/50 border border-amber-400/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.15)] text-3xl group-hover:shadow-[0_0_25px_rgba(251,191,36,0.3)]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-6 tracking-widest uppercase">{service.title}</h3>
                <div className="bg-black/50 border border-white/10 px-4 py-3 w-full text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-lg drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]">★</span>)}
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-zinc-400 uppercase tracking-widest leading-tight block">
                    Pavement Top 75<br />National Excellence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Focus Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-12">
            <div className="md:w-1/2">
              <span className="inline-block text-amber-400/70 uppercase tracking-[0.35em] text-xs font-semibold mb-4">Command HQ</span>
              <h2 className="text-2xl md:text-3xl font-light uppercase text-white mb-6 tracking-widest">
                Headquartered in <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent font-semibold">Chester</span>
              </h2>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 inline-block mb-8 shadow-inner">
                <p className="text-lg font-semibold text-white tracking-wide">1601 Ware Bottom Springs Rd</p>
                <p className="text-zinc-400 mt-1 font-light">Chester, VA 23836</p>
              </div>
              <p className="text-base text-zinc-300 mb-6 max-w-lg leading-relaxed font-light">
                Strategically located to dispatch our heavy equipment fleet quickly across Central Virginia and beyond.
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
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-black px-6 py-3 font-bold uppercase tracking-[0.15em] text-sm hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all shadow-lg"
                >
                  📍 Get Directions
                </a>
                <a
                  href="https://www.google.com/maps/place/J.+Worden+%26+Sons+Paving+LLC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-amber-400/50 bg-white/5 backdrop-blur-sm text-amber-400 px-6 py-3 font-semibold uppercase tracking-[0.15em] text-sm hover:bg-amber-400/10 hover:border-amber-400 transition-all"
                >
                  ⭐ Google Business Profile
                </a>
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_10px_rgba(251,191,36,0.4)]"></div>
                <h3 className="text-base font-semibold uppercase text-white mb-8 tracking-widest pl-4">Primary Service Areas</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-base text-zinc-300 font-light pl-4">
                  {['Midlothian', 'Chesterfield', 'Powhatan', 'Richmond', 'Glen Allen', 'Mechanicsville'].map((city) => (
                    <div key={city} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] flex-shrink-0"></div>
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              title="J. Worden & Sons Paving — Chester VA Headquarters"
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
      <section className="py-24 px-6 lg:px-12 bg-zinc-950 border-t border-amber-400/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-400/70 uppercase tracking-[0.35em] text-xs font-semibold mb-4">JWORDENAI™ Powered</span>
            <h2 className="text-3xl md:text-5xl font-light uppercase text-white tracking-[0.08em] mb-4">
              Instant <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent font-semibold">Price Intelligence</span>
            </h2>
            <p className="text-base text-zinc-400 font-light max-w-2xl mx-auto">
              Get a real-time project estimate. No email required. No sales calls. Pure structural math.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <PrecisionEstimator />
          </div>
        </div>
      </section>

      {/* DISPATCH / CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 lg:px-12 bg-black border-t border-amber-400/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Bottom neon glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.4)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400/70 uppercase tracking-[0.35em] text-xs font-semibold mb-4">Deploy On-Site</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase text-white tracking-[0.08em] mb-4">
              Dispatch an <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent font-semibold">Estimator</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 font-light italic max-w-3xl mx-auto">
              Schedule an on-site structural evaluation for your next paving project.
            </p>
          </div>

          {/* J. WORDEN AUTONOMOUS ESTIMATOR */}
          <div className="max-w-2xl mx-auto mb-16">
            <AutonomousEstimator />
          </div>

          <ContactForm />
        </div>
      </section>

      {/* JWORDENAI Vision™ — Customer Quote Form */}
      <section className="py-20 px-6 lg:px-12 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-4">
              JWORDENAI <span className="text-[#ffcc00]">Vision™</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Enter your ZIP code to instantly load verified local paving projects near your address.
            </p>
          </div>
          <CustomerQuoteForm />
        </div>
      </section>

      {/* JWORDENAI Command Bot */}
      <section className="py-20 px-6 lg:px-12 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-4">
              Command <span className="text-[#ffcc00]">Bot</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Secure JWORDENAI terminal — query leads, sync photos, or pull live pricing.
            </p>
          </div>
          <CommandBotUI />
        </div>
      </section>

      {/* Crew Command: Partner Portal */}
      <section className="py-16 px-6 lg:px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-4">
              JWORDENAI <span className="text-[#ffcc00]">Vision™</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Enter your ZIP code to instantly load verified local paving projects near your address.
            </p>
          </div>
          <CustomerQuoteForm />
        </div>
      </section>

      {/* JWORDENAI Command Bot */}
      <section className="py-20 px-6 lg:px-12 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-4">
              Command <span className="text-[#ffcc00]">Bot</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Secure JWORDENAI terminal — query leads, sync photos, or pull live pricing.
            </p>
          </div>
          <CommandBotUI />
        </div>
      </section>
    </main>
  ),
});
