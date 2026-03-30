import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/short-pump')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white py-24 px-6 border-b-[10px] border-[#ffcc00]">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-7xl font-black uppercase text-[#ffcc00]">Short Pump Paving</h1>
        <p className="text-2xl mt-4 italic text-gray-400">Elite commercial and residential asphalt for Richmond's West End.</p>
      </div>
    </main>
  ),
});
