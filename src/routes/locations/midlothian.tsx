import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/midlothian')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white py-24 px-6 border-b-[10px] border-[#ffcc00]">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-7xl font-black uppercase text-[#ffcc00]">Midlothian Paving</h1>
        <p className="text-2xl mt-4 italic text-gray-400">Luxury residential driveways for the 23112 and 23113 zip codes.</p>
      </div>
    </main>
  ),
});
