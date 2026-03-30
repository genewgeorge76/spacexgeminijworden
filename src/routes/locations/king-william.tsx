import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/locations/king-william')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white text-center py-24 border-b-[10px] border-[#ffcc00]">
      <h1 className="text-7xl font-black text-[#ffcc00] uppercase">King William Paving</h1>
      <p className="text-2xl mt-4 italic text-gray-400">Reliable residential and agricultural paving for King William.</p>
    </main>
  ),
});
