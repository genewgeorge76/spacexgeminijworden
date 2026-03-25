import { Comparison } from '../components/Comparison'
import { Comparison } from '../components/Comparison'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: () => (
    <main className="min-h-screen bg-[#111111] font-['Arial_Black'] text-white">
      <section className="flex flex-col md:flex-row min-h-[85vh] border-b-[10px] border-[#ffcc00]">
        {/* COMMERCIAL: ROSE PAVING STYLE */}
        <div className="flex-1 bg-[#1a1a1a] p-12 border-r border-[#ffcc00]/20 flex flex-col justify-center">
          <h1 className="text-[#ffcc00] text-7xl mb-6 uppercase leading-none tracking-tighter">Commercial<br/>Infrastructure</h1>
          <p className="text-xl mb-8 font-bold text-gray-300">Vetted by KFC (The Big Chicken), Taco Bell, and Winn-Dixie.</p>
          <ul className="space-y-4 mb-10 text-sm">
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase">✓ 80,000LB Load Capacity Engineering</li>
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold uppercase">✓ MaidSTONE Village Partnership</li>
          </ul>
          <a href="tel:8044461296" className="bg-[#ffcc00] text-black text-center py-6 font-black uppercase text-3xl hover:bg-white transition-all">804-446-1296</a>
        </div>

        {/* RESIDENTIAL: METROPOLITAN STYLE */}
        <div className="flex-1 bg-white text-black p-12 flex flex-col justify-center">
          <h2 className="text-7xl mb-6 uppercase leading-none tracking-tighter">Residential<br/>Estates</h2>
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-[#7ac142] text-white p-6 text-center leading-none font-black rounded-lg shadow-xl uppercase">HOUZZ<br/>2024-2026</div>
            <p className="font-black text-2xl tracking-tighter uppercase text-gray-800 italic">The 6-Inch Structural Standard</p>
          </div>
          <a href="tel:8044461296" className="bg-black text-white text-center py-6 font-black uppercase text-3xl hover:bg-[#ffcc00] hover:text-black transition-all">Request Quote</a>
        </div>
      </section>
      <Comparison />
      <Comparison />
    </main>
  ),
})
