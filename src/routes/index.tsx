import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <main className="bg-[#111111] font-['Arial_Black'] text-white">
      <section className="flex flex-col md:flex-row min-h-[85vh] border-b-[10px] border-[#ffcc00]">
        {/* LEFT: COMMERCIAL INFRASTRUCTURE */}
        <div className="flex-1 bg-[#1a1a1a] p-12 border-r border-[#ffcc00]/20 flex flex-col justify-center">
          <h1 className="text-[#ffcc00] text-7xl mb-6 uppercase leading-none tracking-tighter">Commercial<br/>Infrastructure</h1>
          <p className="text-xl mb-8 font-bold text-gray-300">Vetted by KFC (The Big Chicken), Taco Bell, and Winn-Dixie.</p>
          <ul className="space-y-4 mb-10 text-sm">
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold">✓ 80,000LB LOAD CAPACITY ENGINEERING</li>
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold">✓ OVERLAND PARK 3-IN-1 SPECIALTY</li>
            <li className="border-l-4 border-[#ffcc00] pl-4 font-bold">✓ MAIDSTONE VILLAGE PARTNERSHIP</li>
          </ul>
          <a href="tel:8044461296" className="bg-[#ffcc00] text-black text-center py-6 font-black uppercase text-3xl hover:bg-white transition-all transform hover:scale-105">804-446-1296</a>
        </div>
        {/* RIGHT: RESIDENTIAL ESTATES */}
        <div className="flex-1 bg-white text-black p-12 flex flex-col justify-center">
          <h2 className="text-7xl mb-6 uppercase leading-none tracking-tighter">Residential<br/>Estates</h2>
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-[#7ac142] text-white p-6 text-center leading-none font-black rounded-lg shadow-xl">HOUZZ<br/>2024-2026</div>
            <p className="font-black text-2xl tracking-tighter uppercase">The 6-Inch Structural Standard</p>
          </div>
          <p className="text-lg mb-10 font-bold text-gray-600 italic">Corporate-grade foundations for Virginia's finest driveways.</p>
          <a href="tel:8044461296" className="bg-black text-white text-center py-6 font-black uppercase text-3xl hover:bg-[#ffcc00] hover:text-black transition-all transform hover:scale-105 shadow-2xl">Request Quote</a>
        </div>
      </section>
    </main>
  ),
})
