import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery')({
  component: GalleryRoute,
});

// To add more photos, simply place the image file in the `public` directory 
// and add an entry to this array.
const galleryPhotos = [
  { src: '/asphalt-driveway-chesterfield-va.jpg', alt: 'Asphalt Driveway Chesterfield VA', caption: 'Residential Driveway Paving in Chesterfield: Complete excavation and 6-inch base installation.' },
  { src: '/asphalt-paving-car-lot-on-midlothian.jpg', alt: 'Asphalt Paving Car Lot on Midlothian', caption: 'Industrial Paving in Midlothian: Precision-graded lot for heavy inventory.' },
  { src: '/asphalt-paving-with-paver.jpg', alt: 'Asphalt Paving with Paver', caption: 'Heavy-Duty Equipment & Precision: Advanced paving for seamless, level surfaces.' },
  { src: '/cvs-asphalt-paving.jpg', alt: 'CVS Asphalt Paving', caption: 'Commercial Paving in Richmond: High-traffic parking lot restoration.' },
  { src: '/jwordenandsonspaving-maidstone-photo.jpeg', alt: 'J Worden and Sons Paving Maidstone Photo', caption: 'Estate-Grade Residential Paving: Custom driveway with precision grading.' },
  { src: '/parking-lot-pave-richmond-va.jpg', alt: 'Parking Lot Pave Richmond VA', caption: 'Richmond Commercial Parking Lot: ADA-compliant grading and high-durability asphalt.' },
];

function GalleryRoute() {
  return (
    <main className="min-h-screen bg-[#111111] text-white pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-[#c8a84b] font-black uppercase tracking-widest text-sm">Our Work</span>
          <h1 className="text-6xl font-black uppercase text-white leading-none mt-4">
            Project <span className="text-[#c8a84b]">Gallery</span>
          </h1>
          <p className="text-xl text-gray-400 mt-6 max-w-2xl font-bold italic">
            A showcase of our premium structural stone bases and VDOT-grade asphalt paving across the region.
          </p>
        </div>

        {galleryPhotos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map((photo, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="aspect-square bg-[#1a1a1a] rounded-sm border border-white/5 overflow-hidden group">
                  <img 
                    src={photo.src} 
                    alt={photo.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => { 
                      e.currentTarget.style.display = 'none'; 
                      e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[#555] uppercase tracking-widest text-xs font-bold">${photo.alt}</div>`; 
                    }} 
                  />
                </div>
                {photo.caption && (
                  <p className="text-sm text-gray-400 px-1 leading-relaxed">
                    {photo.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-24 flex items-center justify-center border-2 border-dashed border-white/10 rounded-sm">
            <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">New Photos Coming Soon</p>
          </div>
        )}
      </div>
    </main>
  );
}
