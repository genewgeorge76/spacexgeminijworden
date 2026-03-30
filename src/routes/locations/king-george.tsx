import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/locations/king-george')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white text-center py-24 border-b-[10px] border-[#ffcc00]">
      <h1 className="text-7xl font-black text-[#ffcc00] uppercase">King George Paving</h1>
      <p className="text-2xl mt-4 italic text-gray-400">Premium asphalt for King George residential and commercial sites.</p>
    </main>
  ),
});
