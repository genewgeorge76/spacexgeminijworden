import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/midlothian/')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-sans text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm tracking-[0.3em] mb-6 inline-block">Midlothian, VA Paving</span>
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 text-[#ffcc00]">Elite Paving <br /> In Midlothian</h1>
          <p className="text-2xl font-bold uppercase italic text-gray-400 max-w-4xl leading-tight">From Brandermill to Salisbury, we provide Chesterfield County with the strongest foundations in Virginia.</p>
        </div>
      </section>
    </main>
  ),
})
