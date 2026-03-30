import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/chesterfield')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white text-center py-24">
      <h1 className="text-6xl font-black text-[#ffcc00] uppercase">Chesterfield Paving</h1>
      <p className="text-xl mt-4 italic text-gray-400">Serving Brandermill, Woodlake, and Midlothian with premium asphalt.</p>
    </main>
  ),
});
