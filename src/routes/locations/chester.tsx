import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/locations/chester')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white text-center py-24">
      <h1 className="text-6xl font-black text-[#ffcc00] uppercase tracking-tighter">Chester HQ Paving</h1>
      <p className="text-xl mt-4 italic text-gray-400 font-bold uppercase">1601 Ware Bottom Springs Rd | Suite 214</p>
    </main>
  ),
});
