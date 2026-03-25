export default function Header() {
  return (
    <header className="bg-black border-b-[3px] border-[#ffcc00] sticky top-0 z-[100] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-white font-black text-xl leading-none">J. WORDEN &amp; SONS</span>
          <span className="text-[#ffcc00] text-xs font-bold tracking-[0.2em]">ASPHALT PAVING</span>
        </div>
        <div className="hidden md:block text-[#7ac142] font-bold text-xs">OFFICIAL HOUZZ SERVICE AWARD 2024-2026</div>
        <a href="tel:8044461296" className="bg-[#ffcc00] text-black px-6 py-2 font-black uppercase text-lg">
          804-446-1296
        </a>
      </div>
    </header>
  )
}
