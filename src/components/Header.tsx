import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import HeaderNav from './HeaderNav'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <HeaderNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <header className="bg-[#111] border-b-3 border-[#c8a84b] sticky top-0 z-100">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex flex-col">
            <Link to="/" className="text-[1.15rem] font-bold text-white tracking-wide leading-tight hover:text-[#c8a84b] transition-colors no-underline">
              J. WORDEN & SONS ASPHALT PAVING
            </Link>
            <a href="tel:8044461296" className="text-[0.7rem] text-[#c8a84b] tracking-widest uppercase no-underline hover:text-[#e0c06a] transition-colors">
              804-446-1296 • Chester, VA • Est. 1984
            </a>
        </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/" hash="about" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">About</Link>
            <Link to="/" hash="services" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Services</Link>
            <Link to="/commercial" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Commercial</Link>
            <Link to="/mclean-residential-paving" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">McLean</Link>
            <Link to="/windsor-farms" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Windsor Farms</Link>
            <Link to="/" hash="standard" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Our Standard</Link>
            <Link to="/" hash="contact" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Contact</Link>
          </nav>
          <a href="tel:8044461296" className="inline-flex items-center gap-2 bg-[#c8a84b] text-[#111] px-4 py-2 rounded-sm text-[0.85rem] font-bold uppercase tracking-widest hover:bg-[#e0c06a] transition-colors">
            Call 804-446-1296
          </a>
          <button
            type="button"
            className="md:hidden text-white cursor-pointer text-[0.85rem]"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="text-[#c8a84b]">MENU</span>
          </button>
        </div>
      </header>
      <a
        href="tel:8044461296"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#c8a84b] text-[#111] text-center py-4 text-[1rem] font-bold uppercase tracking-widest shadow-[0_-4px_16px_rgba(0,0,0,0.3)]"
      >
        📞 TAP TO CALL • 804-446-1296
      </a>
    </>
  )
}
