import { createFileRoute, Link } from '@tanstack/react-router'
import { Comparison } from '../components/Comparison'

export const Route = createFileRoute('/')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-sans text-white">
      <section className="flex flex-col md:flex-row min-h-[85vh] border-b-[10px] border-[#ffcc00]">
        
        {/* COMMERCIAL INFRASTRUCTURE SECTION */}
        <div className="flex-1 bg-[#1a1a1a] p-12 border-r border-[#ffcc00]/20 flex flex-col justify-center">
          <h1 className="text-[#ffcc00] text-7xl mb-6 uppercase font-black tracking-tighter leading-none">
            Commercial <br /> Infrastructure
          </h1>
          <p className="text-xl mb-8 font-bold text-gray-300 uppercase italic">
            Years of Dedicated Service for KFC, Taco Bell, and National Brands.
          </p>
          <ul className="space-y-4 mb-10 text-sm">
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase tracking-tight text-[#ffcc00] animate-pulse">
              ✓ 90-DAY QSR FAST-TRACK SPECIALISTS (KFC & TACO BELL)
            </li>
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase tracking-tight">
              ✓ ADA COMPLIANCE, SEALCOATING & REMODEL REPAIRS
            </li>
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase tracking-tight">
              ✓ BIG CHICKEN 2017 REMODEL: COMPLETE LOT REPAVE
            </li>
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase tracking-tight text-gray-400">
              ✓ JENNINGS, LA: ELTON ST. SITE PREP & INFRASTRUCTURE
            </li>
          </ul>
          <a href="tel:8044461296" className="bg-[#ffcc00] text-black text-center py-6 font-black uppercase text-3xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,204,0,0.3)]">
            804-446-1296
          </a>
        </div>

        {/* RESIDENTIAL ESTATES SECTION */}
        <div className="flex-1 bg-white text-black p-12 flex flex-col justify-center">
          <h2 className="text-7xl mb-6 uppercase font-black tracking-tighter leading-none">
            Residential <br /> Estates
          </h2>
          <div className="flex items-center gap-6 mb-10">
            <a 
              href="https://www.houzz.com/pro/jwordandsonspaving/j-worden-sons-paving-l-l-c" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#7ac142] text-white p-6 text-center leading-none font-black rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              HOUZZ PRO<br/>2024-2026
            </a>
            <p className="font-black text-2xl tracking-tighter uppercase text-gray-800 italic">
              The 6-Inch Structural Standard
            </p>
          </div>
          <p className="text-lg mb-10 text-gray-600 font-bold leading-tight uppercase">
            Corporate-grade foundations for Virginia's finest home driveways.
          </p>
          <a href="tel:8044461296" className="bg-black text-white text-center py-6 font-black uppercase text-3xl hover:bg-[#ffcc00] hover:text-black transition-all shadow-xl">
            804-446-1296
          </a>
        </div>
      </section>

      {/* AWARDS & PROJECT STRIP */}
      <section className="bg-[#111111] py-16 border-y border-[#ffcc00]/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-gray-500 font-black text-xl uppercase tracking-[0.2em] mb-8">Vetted Authority</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <span className="text-white font-black text-2xl uppercase italic">OFFICIAL KFC BIG CHICKEN REPAVE (2017)</span>
            <div className="hidden md:block h-12 w-px bg-gray-800"></div>
            <a 
              href="https://www.houzz.com/hznb/projects/driveway-paving-pj-vj~361642" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-4 text-[#7ac142] font-black text-2xl border-2 border-[#7ac142] px-8 py-4 hover:bg-[#7ac142] hover:text-white transition-all"
            >
              VIEW HOUZZ PROJECTS
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* COMMERCIAL PORTFOLIO TEASER (NEW!) */}
      <section className="relative py-32 px-6 overflow-hidden border-t-[10px] border-[#ffcc00]">
        <img 
          src="https://img.monica.im/chat/image/v1/498260407/68e219ba-3b03-4554-9467-33a824151756.jpg" 
          alt="KFC Landmark Paving Portfolio" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-[#ffcc00] text-7xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
            View The <br/> Authority Gallery
          </h2>
          <p className="text-xl md:text-2xl font-bold uppercase italic text-gray-300 mb-10 max-w-3xl mx-auto border-l-4 border-[#ffcc00] pl-6">
            Review our 90-Day QSR Fast-Track specs, national brand receipts, and the legacy history of J. Worden & Sons.
          </p>
          <Link to="/commercial" className="bg-[#ffcc00] text-black px-12 py-6 text-3xl font-black uppercase hover:bg-white transition-all shadow-[0_0_40px_rgba(255,204,0,0.5)] inline-block">
            Enter Commercial Vault
          </Link>
        </div>
      </section>

      <Comparison />

      {/* KICKSERV ESTIMATE SECTION */}
      <section id="contact" className="py-24 px-6 bg-white text-black border-t-8 border-[#ffcc00]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-black uppercase tracking-tighter text-center mb-12">Request Your Free Estimate</h2>
          <div className="bg-white rounded-xl shadow-2xl p-1 border border-gray-100 overflow-hidden">
            <iframe 
              src="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new?iframe=true" 
              style={{ border: 'none', minHeight: '850px' }} 
              width="100%" 
              height="1000" 
              scrolling="auto"
              title="Kickserv Estimate Request Form"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  ),
})
