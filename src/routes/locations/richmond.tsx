import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/richmond/')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm mb-6 inline-block">Richmond, VA | 23221</span>
          <h1 className="text-7xl font-black uppercase text-[#ffcc00]">Richmond's Paving <br/> Legacy</h1>
          <p className="text-2xl text-gray-400 italic font-bold">4-Generations of precision asphalt in the Fan, Museum District, and beyond.</p>
        </div>
      </section>
      <section className="py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto border-l-4 border-white pl-6">
          <h2 className="text-3xl font-bold uppercase">Commercial & Franchise Partners</h2>
          <p className="text-gray-400 mt-4">We specialize in rapid-deployment paving for Richmond's urban commercial sites and multi-unit franchise rollouts.</p>
        </div>
      </section>
    </main>
  ),
})
