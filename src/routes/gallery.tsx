import { createFileRoute } from '@tanstack/react-router';
import { ExternalLink, Award, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/gallery')({
  component: AuthorityVault,
});

const projectProof = [
  { src: '/asphalt-driveway-chesterfield-va.jpg', city: 'Chesterfield', type: 'Residential Estate', detail: '6" Structural Base Implementation' },
  { src: '/asphalt-paving-car-lot-on-midlothian.jpg', city: 'Midlothian', type: 'Commercial Heavy-Duty', detail: 'High-Load Capacity Paving' },
  { src: '/cvs-asphalt-paving.jpg', city: 'Richmond', type: 'National Brand QSR', detail: '90-Day Fast-Track Delivery' },
  { src: '/cobblestone-paver-driveway.jpg', city: 'Richmond', type: 'Masonry Overlay', detail: 'Precision Hand-Laid Stone' },
  { src: '/asphalt-paving-with-paver.jpg', city: 'Chester', type: 'Industrial Paving', detail: 'Municipal-Grade Equipment' },
  { src: '/parking-lot-pave-richmond-va.jpg', city: 'Richmond', type: 'Commercial Parking', detail: 'ADA-Compliant Striping' },
  { src: '/jwordenandsonspaving-maidstone-photo.jpeg', city: 'Henrico', type: 'Residential Drive', detail: 'Premium Finish Surface' },
];

function AuthorityVault() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-36 pb-24 px-6 selection:bg-[#ffcc00] selection:text-black">
      <div className="max-w-7xl mx-auto">

        {/* HEADER: AUTHORITY SIGNALS */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20 border-b-2 border-zinc-900 pb-16">
          <div className="max-w-3xl">
            <span className="text-[#ffcc00] font-black uppercase tracking-[0.3em] text-sm">Visual Verification</span>
            <h1 className="text-7xl md:text-8xl font-black uppercase text-white leading-none mt-4 tracking-tighter">
              Structural <span className="text-[#ffcc00]">Authority Vault</span>
            </h1>
            <p className="text-2xl text-zinc-500 mt-8 font-bold italic border-l-8 border-[#ffcc00] pl-8 speakable">
              Verifiable proof of 4th-generation paving standards. Vetted by National Brands and the Asphalt Index.
            </p>
          </div>

          {/* EXTERNAL AUTHORITY LINKS */}
          <div className="grid grid-cols-1 gap-4 w-full md:w-72">
            <a
              href="https://asphaltindex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-[#ffcc00] transition-all group"
            >
              <span className="font-black uppercase tracking-widest text-sm group-hover:text-[#ffcc00]">Asphalt Index Authority</span>
              <ExternalLink className="w-5 h-5 text-[#ffcc00]" />
            </a>
            <a
              href="https://www.houzz.com/pro/jwordenandsonspaving/j-worden-sons-paving-l-l-c"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-6 bg-white text-black p-6 rounded-xl hover:bg-[#ffcc00] transition-all group"
            >
              <span className="font-black uppercase tracking-widest text-sm">Live Houzz Profile</span>
              <Award className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {projectProof.map((project, i) => (
            <div key={i} className="group relative bg-zinc-900 rounded-3xl overflow-hidden border-2 border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-500">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.src}
                  alt={`${project.city} ${project.type}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="bg-[#ffcc00] text-black px-3 py-1 text-[10px] font-black uppercase rounded-full mb-2 inline-block">Vetted Site</span>
                  <h3 className="text-2xl font-black uppercase text-white tracking-tighter">{project.city} Project</h3>
                </div>
              </div>
              <div className="p-6 flex justify-between items-center bg-black/50">
                <div>
                  <p className="text-[#ffcc00] font-bold uppercase text-xs tracking-widest">{project.type}</p>
                  <p className="text-zinc-500 text-sm mt-1">{project.detail}</p>
                </div>
                <CheckCircle className="text-[#ffcc00] w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* HOUZZ AUTHORITY SECTION */}
        <section className="bg-zinc-900 p-12 rounded-3xl border-4 border-white/5 text-center mb-12">
          <h2 className="text-4xl font-black uppercase mb-6">Houzz <span className="text-[#ffcc00]">Recommended</span> Since 2014</h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto font-medium">
            Over 500+ Ideabook saves and 4 Best of Houzz awards. The region's most vetted residential paving contractor.
          </p>
          <a
            href="https://www.houzz.com/pro/jwordenandsonspaving/j-worden-sons-paving-l-l-c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ffcc00] text-black px-10 py-5 font-black uppercase tracking-widest text-lg rounded-xl hover:bg-white transition-colors shadow-[0_0_30px_rgba(255,204,0,0.3)]"
          >
            View Our Houzz Profile →
          </a>
        </section>

        {/* ASPHALT INDEX LINK */}
        <section className="bg-black border border-zinc-800 p-10 rounded-3xl text-center">
          <h2 className="text-3xl font-black uppercase mb-4">Industry <span className="text-[#ffcc00]">Indexed</span></h2>
          <p className="text-zinc-500 mb-8 max-w-lg mx-auto">
            J. Worden & Sons is listed with the Asphalt Index — the industry's premier directory for verified paving contractors.
          </p>
          <a
            href="https://asphaltindex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#ffcc00] text-[#ffcc00] px-8 py-4 font-black uppercase tracking-widest hover:bg-[#ffcc00] hover:text-black transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Asphalt Index Authority Listing
          </a>
        </section>

      </div>
    </main>
  );
}
