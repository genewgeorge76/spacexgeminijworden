import { createFileRoute } from '@tanstack/react-router'
import { Comparison } from '../components/Comparison'

export const Route = createFileRoute('/')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-sans text-white">
      <section className="flex flex-col md:flex-row min-h-[85vh] border-b-[10px] border-[#ffcc00]">
        
        {/* COMMERCIAL SECTION */}
        <div className="flex-1 bg-[#1a1a1a] p-12 border-r border-[#ffcc00]/20 flex flex-col justify-center">
          <h1 className="text-[#ffcc00] text-7xl mb-6 uppercase font-black tracking-tighter leading-none">
            Commercial <br /> Infrastructure
          </h1>
          <p className="text-xl mb-8 font-bold text-gray-300 uppercase italic">
            Vetted by KFC (The Big Chicken), Taco Bell, and National Developers.
          </p>
          <ul className="space-y-4 mb-10 text-sm">
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase tracking-tight text-[#ffcc00] animate-pulse">
              ✓ COMPLETE LOT REPAVE: BIG CHICKEN 2017 REMODEL
            </li>
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase tracking-tight">
              ✓ SITE PREP & PAVING: ELTON ST. FAST FOOD (JENNINGS, LA)
            </li>
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase tracking-tight text-gray-400">
              ✓ 80,000LB Load Capacity Engineering
            </li>
          </ul>
          <a href="tel:8044461296" className="bg-[#ffcc00] text-black text-center py-6 font-black uppercase text-3xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,204,0,0.3)]">
            804-446-1296
          </a>
        </div>

        {/* RESIDENTIAL SECTION */}
        <div className="flex-1 bg-white text-black p-12 flex flex-col justify-center">
          <h2 className="text-7xl mb-6 uppercase font-black tracking-tighter leading-none">
            Residential <br /> Estates
          </h2>
          <div className="items-center gap-6 mb-10 flex">
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

      {/* AWARDS & PROJECT GALLERY STRIP */}
      <section className="bg-[#111111] py-16 border-y border-[#ffcc00]/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-gray-500 font-black text-xl uppercase tracking-[0.2em] mb-8">Awarded Portfolio</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <a 
              href="https://www.houzz.com/pro/jwordandsonspaving/j-worden-sons-paving-l-l-c" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white font-black text-2xl uppercase italic hover:text-[#ffcc00] transition-colors"
            >
              Top Rated Contractor 2026
            </a>
            <div className="hidden md:block h-12 w-px bg-gray-800"></div>
            <a 
              href="https://www.houzz.com/hznb/projects/driveway-paving-pj-vj~361642" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-4 text-[#7ac142] font-black text-2xl border-2 border-[#7ac142] px-8 py-4 hover:bg-[#7ac142] hover:text-white transition-all"
            >
              VIEW HOUZZ PROJECT GALLERY
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>
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
