import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery')({
  component: GalleryRoute,
});

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for photos to be added by the user */}
          <div className="aspect-square bg-[#1a1a1a] rounded-sm border border-white/5 flex items-center justify-center text-[#555] uppercase tracking-widest text-xs font-bold">
            Image Pending
          </div>
          <div className="aspect-square bg-[#1a1a1a] rounded-sm border border-white/5 flex items-center justify-center text-[#555] uppercase tracking-widest text-xs font-bold">
            Image Pending
          </div>
          <div className="aspect-square bg-[#1a1a1a] rounded-sm border border-white/5 flex items-center justify-center text-[#555] uppercase tracking-widest text-xs font-bold">
            Image Pending
          </div>
          <div className="aspect-square bg-[#1a1a1a] rounded-sm border border-white/5 flex items-center justify-center text-[#555] uppercase tracking-widest text-xs font-bold">
            Image Pending
          </div>
          <div className="aspect-square bg-[#1a1a1a] rounded-sm border border-white/5 flex items-center justify-center text-[#555] uppercase tracking-widest text-xs font-bold">
            Image Pending
          </div>
          <div className="aspect-square bg-[#1a1a1a] rounded-sm border border-white/5 flex items-center justify-center text-[#555] uppercase tracking-widest text-xs font-bold">
            Image Pending
          </div>
        </div>
      </div>
    </main>
  );
}
