import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/powhatan')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm mb-6 inline-block">
            Powhatan, VA
          </span>
          <h1 className="text-7xl font-black uppercase text-[#ffcc00]">
            Powhatan <br/> Paving Pros
          </h1>
          <p className="text-2xl text-gray-400 italic font-bold mb-8">
            Custom driveways and farm-style paving for the Powhatan Courthouse and Flat Rock areas.
          </p>
        </div>
      </section>
    </main>
  ),
});
