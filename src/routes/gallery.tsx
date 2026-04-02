import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery')({
  component: GalleryRoute,
});

// To add more photos, simply place the image file in the `public` directory 
// and add an entry to this array.
const galleryPhotos = [
  { src: '/tar-and-chip.jpg', alt: 'Tar & Chip' },
  { src: '/stone-wall.jpg', alt: 'Stone Wall' },
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
              <div key={index} className="aspect-square bg-[#1a1a1a] rounded-sm border border-white/5 overflow-hidden group">
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                    e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[#555] uppercase tracking-widest text-xs font-bold">${photo.alt} (Pending)</div>`; 
                  }} 
                />
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
