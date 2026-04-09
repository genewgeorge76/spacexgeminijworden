import { Link } from '@tanstack/react-router'
import { Phone, Award } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md px-6 py-4 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col items-start group">
          <span className="text-[#ffcc00] text-xs font-bold uppercase tracking-[0.3em] group-hover:text-white transition-colors">
            J. Worden & Sons
          </span>
          <span className="text-white text-[10px] uppercase tracking-[0.1em] opacity-60">
            Asphalt Paving • Chester 23836
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#888]">
          <Link to="/standards" className="hover:text-white transition-colors">Our Standards</Link>
          <Link to="/commercial" className="hover:text-white transition-colors">Commercial</Link>
          <Link to="/residential" className="hover:text-white transition-colors">Residential</Link>
          <Link to="/masonry" className="hover:text-white transition-colors">Masonry</Link>
          <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-2">
             <div className="flex items-center gap-1.5 text-[#ffcc00] animate-pulse">
               <Award size={10} />
               <span className="text-[9px] font-bold uppercase tracking-widest">2026 Houzz Authority</span>
             </div>
             <span className="text-[10px] text-[#555] uppercase font-bold tracking-tighter italic">6" Structural Stone Base Std.</span>
          </div>

          <a 
            href="tel:8044461296" 
            className="flex items-center gap-2 bg-[#ffcc00] px-4 py-2.5 rounded-sm text-[#111] text-[10px] font-black uppercase tracking-[0.15em] hover:bg-white transition-all shadow-[0_0_15px_rgba(255,204,0,0.3)]"
          >
            <Phone size={12} fill="currentColor" />
            <span>911 Dispatch: 804-446-1296</span>
          </a>
        </div>
      </div>
    </header>
  )
}
