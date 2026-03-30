import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/henrico')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white text-center py-24">
      <h1 className="text-6xl font-black text-[#ffcc00] uppercase">Henrico Paving</h1>
      <p className="text-xl mt-4 italic text-gray-400">The premier choice for West End and Short Pump commercial projects.</p>
    </main>
  ),
});
