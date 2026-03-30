import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/locations/short-pump')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white text-center py-24">
      <h1 className="text-6xl font-black text-[#ffcc00] uppercase">Short Pump Paving</h1>
      <p className="text-xl mt-4 italic text-gray-400">High-end retail and residential asphalt for West End Richmond.</p>
    </main>
  ),
});
