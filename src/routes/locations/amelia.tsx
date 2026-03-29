import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/amelia')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm mb-6 inline-block tracking-widest">Amelia County Authority</span>
          <h1 className="text-7xl font-black uppercase text-[#ffcc00] leading-tight">Amelia County <br /> Paving Pros</h1>
          <p className="text-2xl text-gray-400 italic font-bold mt-6 mb-8 max-w-3xl">Specializing in large-scale residential driveways and agricultural paving throughout Amelia. Built on a 6-inch structural stone base.</p>
        </div>
      </section>
    </main>
  ),
});
