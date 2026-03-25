import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <main className="bg-[#111111] font-['Arial_Black'] text-white">
      <section className="flex flex-col md:flex-row min-h-[80vh] border-b-[10px] border-[#ffcc00]">
        {/* COMMERCIAL: Vetted by KFC & Taco Bell */}
        <div className="flex-1 bg-[#1a1a1a] p-12 border-r border-[#ffcc00]/20 flex flex-col justify-center">
          <h1 className="text-[#ffcc00] text-6xl mb-6 uppercase leading-none">
            Commercial
            <br />
            Infrastructure
          </h1>
          <ul className="space-y-4 mb-10 text-sm">
            <li className="border-l-4 border-[#ffcc00] pl-4">✓ KFC &quot;THE BIG CHICKEN&quot; PROJECT</li>
            <li className="border-l-4 border-[#ffcc00] pl-4">✓ OVERLAND PARK 3-IN-1 SPECIALTY</li>
            <li className="border-l-4 border-[#ffcc00] pl-4">✓ WINN-DIXIE &amp; MAIDSTONE VILLAGE</li>
          </ul>
          <a href="tel:8044461296" className="bg-[#ffcc00] text-black text-center py-5 font-black uppercase text-2xl">
            804-446-1296
          </a>
        </div>
        {/* RESIDENTIAL: Houzz Elite */}
        <div className="flex-1 bg-white text-black p-12 flex flex-col justify-center">
          <h2 className="text-6xl mb-6 uppercase leading-none">
            Residential
            <br />
            Estates
          </h2>
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-[#7ac142] text-white p-5 text-center leading-none">
              HOUZZ
              <br />
              2026
            </div>
            <p className="font-black text-xl tracking-tighter uppercase">The 6-Inch Structural Standard</p>
          </div>
          <a href="tel:8044461296" className="bg-black text-white text-center py-5 font-black uppercase text-2xl">
            Request Quote
          </a>
        </div>
      </section>
    </main>
  )
}
