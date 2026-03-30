import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/CITY_NAME_LOWERCASE')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-7xl font-black uppercase text-[#ffcc00]">CITY_NAME_HERE Paving</h1>
          <p className="text-2xl mt-4 italic text-gray-400">Premium asphalt solutions and VDOT-grade stone bases.</p>
        </div>
      </section>
    </main>
  ),
});
