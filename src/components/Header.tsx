import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-[#0f0f0f] border-b border-[#c8a84b] sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f0f]/90">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex flex-col no-underline group">
          <span className="text-[1.1rem] font-bold text-white tracking-wide leading-tight group-hover:text-[#c8a84b] transition-colors">
            J. WORDEN & SONS
          </span>
          <span className="text-[0.7rem] text-[#c8a84b] tracking-widest uppercase">
            Elite Asphalt Authority
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" hash="about" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">
            About
          </Link>
          <Link to="/" hash="vetted" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">
            Corporate Vetted
          </Link>
          <Link to="/" hash="services" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">
            Services
          </Link>
          <Link to="/" hash="standard" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">
            Standard
          </Link>
          <Link to="/" hash="contact" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">
            Contact
          </Link>
        </nav>
        <div className="hidden md:block">
          <a
            href="tel:8044461296"
            className="inline-flex items-center gap-2 bg-[#c8a84b] text-[#0f0f0f] px-4 py-2 rounded-sm text-[0.9rem] font-semibold tracking-wide hover:bg-[#e0c06a] transition-colors"
          >
            Call 804-446-1296
          </a>
        </div>
        <div className="md:hidden text-white text-sm font-semibold">
          <a href="tel:8044461296" className="text-[#c8a84b]">
            Call 804-446-1296
          </a>
        </div>
      </div>
    </header>
  )
}
