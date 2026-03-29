import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/standards')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-sans text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-7xl font-black uppercase text-[#ffcc00]">Virginia Paving Standards</h1>
          <p className="text-2xl font-bold uppercase italic text-gray-400 mt-4">The 6-Inch Structural Base is our non-negotiable standard.</p>
        </div>
      </section>
    </main>
  ),
});
