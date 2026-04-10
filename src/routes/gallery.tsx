import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ExternalLink, Award, CheckCircle, X } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export const Route = createFileRoute('/gallery')({
  component: AuthorityVault,
});

type Category = 'All' | 'Residential' | 'Commercial' | 'Sealcoating';

interface Project {
  src: string;
  city: string;
  type: string;
  detail: string;
  category: Exclude<Category, 'All'>;
  alt: string;
}

const projectProof: Project[] = [
  {
    src: '/asphalt-driveway-chesterfield-va.jpg',
    city: 'Chesterfield',
    type: 'Residential Estate',
    detail: '6" Structural Base Implementation',
    category: 'Residential',
    alt: 'asphalt paving residential driveway Chesterfield VA - J. Worden & Sons',
  },
  {
    src: '/asphalt-paving-car-lot-on-midlothian.jpg',
    city: 'Midlothian',
    type: 'Commercial Heavy-Duty',
    detail: 'High-Load Capacity Paving',
    category: 'Commercial',
    alt: 'asphalt paving commercial car lot Midlothian VA - J. Worden & Sons',
  },
  {
    src: '/cvs-asphalt-paving.jpg',
    city: 'Richmond',
    type: 'National Brand QSR',
    detail: '90-Day Fast-Track Delivery',
    category: 'Commercial',
    alt: 'asphalt paving commercial CVS parking lot Richmond VA - J. Worden & Sons',
  },
  {
    src: '/asphalt-paving-with-paver.jpg',
    city: 'Chester',
    type: 'Industrial Paving',
    detail: 'Municipal-Grade Equipment',
    category: 'Commercial',
    alt: 'asphalt paving industrial Chester VA municipal grade - J. Worden & Sons',
  },
  {
    src: '/parking-lot-pave-richmond-va.jpg',
    city: 'Richmond',
    type: 'Commercial Parking',
    detail: 'ADA-Compliant Striping',
    category: 'Commercial',
    alt: 'asphalt paving commercial parking lot Richmond VA ADA compliant - J. Worden & Sons',
  },
  {
    src: '/jwordenandsonspaving-maidstone-photo.jpeg',
    city: 'Henrico',
    type: 'Residential Drive',
    detail: 'Premium Finish Surface',
    category: 'Residential',
    alt: 'asphalt paving residential driveway Henrico VA premium finish - J. Worden & Sons',
  },
];

const beforeAfterPairs = [
  {
    beforeSrc: '/asphalt-driveway-chesterfield-va.jpg',
    afterSrc: '/asphalt-paving-with-paver.jpg',
    beforeAlt: 'asphalt paving before residential driveway Chesterfield VA',
    afterAlt: 'asphalt paving after residential driveway Chesterfield VA - J. Worden & Sons',
    label: 'Residential Driveway — Chesterfield',
    category: 'Residential' as Exclude<Category, 'All'>,
  },
  {
    beforeSrc: '/parking-lot-pave-richmond-va.jpg',
    afterSrc: '/cvs-asphalt-paving.jpg',
    beforeAlt: 'asphalt paving before commercial parking lot Richmond VA',
    afterAlt: 'asphalt paving after commercial parking lot Richmond VA - J. Worden & Sons',
    label: 'Commercial Parking Lot — Richmond',
    category: 'Commercial' as Exclude<Category, 'All'>,
  },
  {
    beforeSrc: '/jwordenandsonspaving-maidstone-photo.jpeg',
    afterSrc: '/asphalt-paving-car-lot-on-midlothian.jpg',
    beforeAlt: 'asphalt paving before sealcoating Henrico VA',
    afterAlt: 'asphalt sealcoating after Midlothian VA - J. Worden & Sons',
    label: 'Sealcoating Restoration — Henrico',
    category: 'Sealcoating' as Exclude<Category, 'All'>,
  },
];

const IMAGE_GALLERY_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'J. Worden & Sons Asphalt Paving — Project Gallery',
  description:
    'Visual proof of 4th-generation asphalt paving standards. Commercial, residential, and sealcoating projects across Richmond VA and 41 surrounding cities.',
  url: 'https://jwordenasphaltpaving.com/gallery',
  image: projectProof.map((p) => ({
    '@type': 'ImageObject',
    contentUrl: `https://jwordenasphaltpaving.com${p.src}`,
    description: p.alt,
    name: `${p.type} — ${p.city}`,
  })),
};

function AuthorityVault() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const categories: Category[] = ['All', 'Residential', 'Commercial', 'Sealcoating'];

  const filtered = activeCategory === 'All'
    ? projectProof
    : projectProof.filter((p) => p.category === activeCategory);

  const filteredBA = activeCategory === 'All'
    ? beforeAfterPairs
    : beforeAfterPairs.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-36 pb-24 px-6 selection:bg-[#ffcc00] selection:text-black">
      {/* ImageGallery JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(IMAGE_GALLERY_SCHEMA) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
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

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap gap-3 mb-12" role="tablist" aria-label="Filter gallery by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 font-black uppercase tracking-widest text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-[#ffcc00] text-black'
                  : 'border border-zinc-700 text-zinc-400 hover:border-[#ffcc00] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filtered.map((project, i) => (
            <figure
              key={project.src}
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden border-2 border-zinc-800 hover:border-[#ffcc00]/50 transition-all duration-500 cursor-pointer m-0"
              onClick={() => setLightbox(project)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.src}
                  alt={project.alt}
                  width={800}
                  height={533}
                  loading={i === 0 ? 'eager' : 'lazy'}
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
              <figcaption className="p-6 flex justify-between items-center bg-black/50">
                <div>
                  <p className="text-[#ffcc00] font-bold uppercase text-xs tracking-widest">{project.type}</p>
                  <p className="text-zinc-500 text-sm mt-1">{project.detail}</p>
                </div>
                <CheckCircle className="text-[#ffcc00] w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
              </figcaption>
            </figure>
          ))}
        </div>

        {/* BEFORE / AFTER SECTION */}
        {filteredBA.length > 0 && (
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black uppercase text-white">
                Before <span className="text-[#ffcc00]">&amp; After</span>
              </h2>
              <p className="text-zinc-500 mt-4 max-w-xl mx-auto">Drag the slider to compare the transformation on real J. Worden &amp; Sons projects.</p>
              <div className="w-24 h-1 bg-[#ffcc00] mx-auto mt-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBA.map((pair) => (
                <figure key={pair.label} className="m-0">
                  <BeforeAfterSlider
                    beforeSrc={pair.beforeSrc}
                    afterSrc={pair.afterSrc}
                    beforeAlt={pair.beforeAlt}
                    afterAlt={pair.afterAlt}
                    width={800}
                    height={533}
                  />
                  <figcaption className="mt-3 text-center text-sm text-zinc-400 font-bold uppercase tracking-widest">
                    {pair.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* HOUZZ AUTHORITY SECTION */}
        <section className="bg-zinc-900 p-12 rounded-3xl border-4 border-white/5 text-center mb-12">
          <h2 className="text-4xl font-black uppercase mb-6">Houzz <span className="text-[#ffcc00]">Recommended</span> Since 2014</h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto font-medium">
            Over 500+ Ideabook saves and 4 Best of Houzz awards. The region&apos;s most vetted residential paving contractor.
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
            J. Worden &amp; Sons is listed with the Asphalt Index — the industry&apos;s premier directory for verified paving contractors.
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

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close image"
            className="absolute top-4 right-4 text-white hover:text-[#ffcc00] transition-colors bg-zinc-900 rounded-full p-2"
          >
            <X size={28} />
          </button>
          <figure className="max-w-5xl w-full m-0" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              loading="eager"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <figcaption className="text-center mt-4">
              <p className="text-[#ffcc00] font-black uppercase tracking-widest text-sm">{lightbox.type}</p>
              <p className="text-zinc-300 font-bold">{lightbox.city} — {lightbox.detail}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
