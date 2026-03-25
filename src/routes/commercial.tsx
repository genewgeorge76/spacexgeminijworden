import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/commercial')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-sans text-white">
      {/* HERO SECTION */}
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[#ffcc00] text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Commercial <br /> Infrastructure
          </h1>
          <p className="text-2xl font-bold uppercase italic text-gray-400 max-w-3xl">
            National Brand Vetted. 90-Day QSR Fast-Track Specialists. ADA Compliance Experts.
          </p>
        </div>
      </section>

      {/* PROJECT VAULT SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* FEATURED: BIG CHICKEN */}
          <div className="bg-[#1a1a1a] p-8 border-l-8 border-[#ffcc00] shadow-2xl">
            <h2 className="text-4xl font-black uppercase mb-4 text-[#ffcc00]">The Big Chicken (KFC)</h2>
            <p className="text-gray-400 font-bold mb-6">OFFICIAL 2017 REMODEL REPAVE</p>
            <p className="mb-8 leading-relaxed">
              J. Worden & Sons was responsible for the complete lot repave, ADA parking restructuring, and site repairs during the $2.2M remodel of this national landmark.
            </p>
            <a 
              href="https://www.dropbox.com/scl/fi/698i3dtphbwfr6egjcppd/KFC-Responsibility-Matrix-GC-2.13.2018.xlsx?rlkey=byqlj2dnggo10zsjnllvau8co" 
              target="_blank" 
              className="inline-block border-2 border-[#ffcc00] text-[#ffcc00] px-6 py-3 font-black uppercase hover:bg-[#ffcc00] hover:text-black transition-all"
            >
              View Responsibility Matrix
            </a>
          </div>

          {/* FEATURED: JENNINGS LA */}
          <div className="bg-[#1a1a1a] p-8 border-l-8 border-[#ffcc00] shadow-2xl text-white">
            <h2 className="text-4xl font-black uppercase mb-4 text-[#ffcc00]">Jennings, LA Project</h2>
            <p className="text-gray-400 font-bold mb-6 text-white uppercase italic">ELTON ST. FAST FOOD INFRASTRUCTURE</p>
            <p className="mb-8 leading-relaxed">
              Major site prep and infrastructure development for high-volume fast food locations in Louisiana. Vetted through rigorous Phase I environmental standards.
            </p>
            <a 
              href="https://www.dropbox.com/scl/fi/qifo13kbofo8tda0oooqb/3380.17-Phase-I-Vacant-land-1424-Elton-Street-Jennings-LA.PDF?rlkey=if2imh89dy4983nwzu5220yo0" 
              target="_blank" 
              className="inline-block border-2 border-[#ffcc00] text-[#ffcc00] px-6 py-3 font-black uppercase hover:bg-[#ffcc00] hover:text-black transition-all"
            >
              View Environmental Assessment
            </a>
          </div>
        </div>
      </section>

      {/* QSR SPECIALTY SECTION */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-8">90-Day QSR Fast-Track</h2>
          <p className="text-xl font-bold max-w-4xl mx-auto leading-tight uppercase italic mb-12">
            We operate on a professional developer schedule. From raw land to striped asphalt in 90 days.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border-4 border-black">
              <h3 className="text-3xl font-black uppercase mb-2">KFC</h3>
              <p className="font-bold text-gray-600">Preferred Paving Partner</p>
            </div>
            <div className="p-6 border-4 border-black">
              <h3 className="text-3xl font-black uppercase mb-2">Taco Bell</h3>
              <p className="font-bold text-gray-600">Fast-Track Development</p>
            </div>
            <div className="p-6 border-4 border-black">
              <h3 className="text-3xl font-black uppercase mb-2">Winn-Dixie</h3>
              <p className="font-bold text-gray-600">Heavy Traffic Engineering</p>
            </div>
          </div>
        </div>
      </section>

      {/* KICKSERV FORM REDIRECT */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-5xl font-black uppercase mb-8">Ready to Pave?</h2>
        <a 
          href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new" 
          className="bg-[#ffcc00] text-black px-12 py-6 text-3xl font-black uppercase hover:bg-white transition-all shadow-2xl"
        >
          Request Commercial Estimate
        </a>
      </section>
    </main>
  ),
})
