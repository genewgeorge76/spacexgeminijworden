import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/locations/glen-allen')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm mb-6 inline-block">North Henrico</span>
          <h1 className="text-7xl font-black uppercase text-[#ffcc00]">Glen Allen <br/> Asphalt Elite</h1>
          <p className="text-2xl text-gray-400 italic font-bold">Premium residential and commercial paving for the Glen Allen corridor.</p>
        </div>
      </section>
    </main>
  ),
});
