import { Link } from '@tanstack/react-router'

export const Header = () => {
  return (
    <header className="bg-black border-b-2 border-[#ffcc00] sticky top-0 z-50 py-4 px-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* BRANDING */}
        <div className="flex flex-col text-center md:text-left">
          <Link to="/" className="text-[#ffcc00] text-2xl font-black uppercase tracking-tighter leading-none hover:text-white transition-colors">
            J. Worden & Sons
          </Link>
          <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
            Asphalt Paving • Est. 1984
          </span>
        </div>

        {/* TRUST BADGE & PHONE */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-[#1a1a1a] border border-[#ffcc00]/30 rounded-full px-4 py-1">
            <span className="text-[#ffcc00] text-[10px] font-black uppercase mr-2">Official Houzz Service Award</span>
            <span className="bg-[#7ac142] text-white text-[9px] font-black px-2 py-0.5 rounded leading-none">2024-2026</span>
          </div>
          
          <a href="tel:8044461296" className="flex flex-col items-center md:items-end">
            <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mb-1">Dispatch Line</span>
            <span className="text-[#ffcc00] text-2xl font-black hover:text-white transition-all leading-none">
              804-446-1296
            </span>
          </a>
        </div>

      </div>
    </header>
  )
}
