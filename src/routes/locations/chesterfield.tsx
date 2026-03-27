import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/chesterfield/')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="py-24 px-6 bg-[#1a1a1a] border-b-[10px] border-[#ffcc00]">
        <div className="max-w-7xl mx-auto">
          <span className="bg-[#ffcc00] text-black px-4 py-1 font-black uppercase text-sm mb-6 inline-block">
            Chesterfield, VA
          </span>
          <h1 className="text-7xl font-black uppercase text-[#ffcc00]">
            Chesterfield <br/> Asphalt Experts
          </h1>
          <p className="text-2xl text-gray-400 italic font-bold mb-8">
            Expert asphalt installation and sealcoating for the fastest-growing neighborhoods in Virginia.
          </p>
          <div className="border-t border-gray-800 pt-8 mt-8">
            <p className="text-sm uppercase tracking-widest text-[#ffcc00]">Commercial & Franchise Logistics</p>
            <p className="text-xl font-bold italic">
              "Local Roots, Regional Reach: The Franchise Choice for Precision Paving Anywhere the Project Takes Us."
            </p>
          </div>
        </div>
      </section>
    </main>
  ),
})
