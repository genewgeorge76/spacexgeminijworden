import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/locations/stafford')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white text-center py-24">
      <h1 className="text-6xl font-black text-[#ffcc00] uppercase">Stafford Paving</h1>
      <p className="text-xl mt-4 italic text-gray-400">Serving Northern Virginia and the I-95 corridor with elite asphalt.</p>
    </main>
  ),
});
