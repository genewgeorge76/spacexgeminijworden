import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/locations/virginia-beach')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white text-center py-24">
      <h1 className="text-6xl font-black text-[#ffcc00] uppercase">Virginia Beach Paving</h1>
      <p className="text-xl mt-4 italic text-gray-400">Coastal-grade asphalt solutions for the 757.</p>
    </main>
  ),
});
