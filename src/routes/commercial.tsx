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

      {/* VETTED BY GIANTS SECTION */}
      <section className="py-20 px-6 bg-zinc-950 border-b border-[#ffcc00]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 border-2 border-[#ffcc00]/30 rounded-full text-[#ffcc00] font-black uppercase text-xs tracking-widest mb-6">
              National Brand Certification
            </span>
            <h2 className="text-6xl font-black uppercase tracking-tighter text-white mb-4">
              Vetted by <span className="text-[#ffcc00]">Giants</span>
            </h2>
            <p className="text-xl text-zinc-400 font-bold max-w-3xl mx-auto">
              Our official project documentation — responsibility matrices and environmental assessments —
              are on file for KFC, Arby's, and Taco Bell. These aren't logos on a page. They're proof of performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* KFC */}
            <div className="bg-[#1a1a1a] p-8 border-l-8 border-[#ffcc00] shadow-2xl flex flex-col">
              <h3 className="text-3xl font-black uppercase mb-2 text-[#ffcc00]">KFC</h3>
              <p className="text-gray-400 font-bold mb-4 uppercase text-sm">The Big Chicken · 2017 Remodel Repave</p>
              <p className="mb-6 leading-relaxed text-zinc-300 flex-grow">
                Complete lot repave, ADA parking restructuring, and site repairs during the $2.2M remodel of this national landmark.
              </p>
              <a
                href="https://www.dropbox.com/scl/fi/698i3dtphbwfr6egjcppd/KFC-Responsibility-Matrix-GC-2.13.2018.xlsx?rlkey=byqlj2dnggo10zsjnllvau8co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-[#ffcc00] text-[#ffcc00] px-6 py-3 font-black uppercase hover:bg-[#ffcc00] hover:text-black transition-all text-center text-sm"
              >
                📄 Responsibility Matrix
              </a>
            </div>

            {/* ARBY'S */}
            <div className="bg-[#1a1a1a] p-8 border-l-8 border-[#ffcc00] shadow-2xl flex flex-col">
              <h3 className="text-3xl font-black uppercase mb-2 text-[#ffcc00]">Arby's</h3>
              <p className="text-gray-400 font-bold mb-4 uppercase text-sm">Jennings, LA · Fast Food Infrastructure</p>
              <p className="mb-6 leading-relaxed text-zinc-300 flex-grow">
                Major site prep and infrastructure development for high-volume fast food locations. Vetted through rigorous Phase I environmental standards on Elton Street.
              </p>
              <a
                href="https://www.dropbox.com/scl/fi/qifo13kbofo8tda0oooqb/3380.17-Phase-I-Vacant-land-1424-Elton-Street-Jennings-LA.PDF?rlkey=if2imh89dy4983nwzu5220yo0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-[#ffcc00] text-[#ffcc00] px-6 py-3 font-black uppercase hover:bg-[#ffcc00] hover:text-black transition-all text-center text-sm"
              >
                📄 Environmental Phase I
              </a>
            </div>

            {/* TACO BELL */}
            <div className="bg-[#1a1a1a] p-8 border-l-8 border-[#ffcc00] shadow-2xl flex flex-col">
              <h3 className="text-3xl font-black uppercase mb-2 text-[#ffcc00]">Taco Bell</h3>
              <p className="text-gray-400 font-bold mb-4 uppercase text-sm">Fast-Track Development · QSR Standard</p>
              <p className="mb-6 leading-relaxed text-zinc-300 flex-grow">
                Delivered to the QSR 90-day fast-track schedule. Full lot installation, striping, and ADA compliance engineering to brand specification.
              </p>
              <span className="inline-block border-2 border-zinc-700 text-zinc-500 px-6 py-3 font-black uppercase text-center text-sm cursor-default">
                On-File Documentation
              </span>
            </div>
          </div>
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
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
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
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 border-4 border-black">
              <h3 className="text-3xl font-black uppercase mb-2">KFC</h3>
              <p className="font-bold text-gray-600">Preferred Paving Partner</p>
            </div>
            <div className="p-6 border-4 border-black">
              <h3 className="text-3xl font-black uppercase mb-2">Arby's</h3>
              <p className="font-bold text-gray-600">Fast-Track Development</p>
            </div>
            <div className="p-6 border-4 border-black">
              <h3 className="text-3xl font-black uppercase mb-2">Taco Bell</h3>
              <p className="font-bold text-gray-600">QSR Infrastructure Standard</p>
            </div>
          </div>

          {/* 90-Day Timeline */}
          <div className="max-w-4xl mx-auto text-left mt-16">
            <h3 className="text-4xl font-black uppercase mb-8 text-center">Developer Fast-Track Timeline</h3>
            <div className="grid md:grid-cols-3 gap-0 relative">
              <div className="hidden md:block absolute top-8 left-[16.666%] right-[16.666%] h-1 bg-black z-0"></div>
              {[
                { day: 'Days 1–30', label: 'Site Prep & Base', desc: 'Grading, demolition, 6" compacted aggregate base installation' },
                { day: 'Days 31–60', label: 'Asphalt Installation', desc: 'Binder course, surface course, compaction to municipal spec' },
                { day: 'Days 61–90', label: 'Striping & Punch List', desc: 'ADA striping, signage, final inspection, permit sign-off' },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-black text-2xl mb-4 border-4 border-white shadow-lg">
                    {i + 1}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{step.day}</span>
                  <h4 className="text-xl font-black uppercase mb-2">{step.label}</h4>
                  <p className="text-gray-600 font-medium text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KICKSERV FORM REDIRECT */}
      <section className="py-24 px-6 text-center bg-zinc-950">
        <h2 className="text-5xl font-black uppercase mb-4 text-white">Ready to Pave?</h2>
        <p className="text-zinc-400 font-bold mb-10 text-lg max-w-2xl mx-auto">
          Stop waiting for no-show paving companies. Dispatch a commercial estimator today.
        </p>
        <a 
          href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#ffcc00] text-black px-12 py-6 text-3xl font-black uppercase hover:bg-white transition-all shadow-[0_0_40px_rgba(255,204,0,0.4)] border-4 border-transparent hover:border-[#ffcc00]"
        >
          ⚡ Get Your Estimate Now — Stop Waiting
        </a>
      </section>
    </main>
  ),
})
