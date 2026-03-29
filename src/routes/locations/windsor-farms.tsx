import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/windsor-farms')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-xs mb-8 inline-block">Elite Residential</span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-none tracking-tighter">WINDSOR FARMS <br/><span className="text-white italic">CORRIDOR</span></h1>
          <p className="text-2xl mt-8 font-bold text-gray-400 italic max-w-3xl">"The 6-Inch Structural Standard for Richmond's Gold Coast."</p>
        </div>
      </section>
    </main>
  )
})
