import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-[#111] border-b-3 border-[#c8a84b] sticky top-0 z-100">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex flex-col no-underline group">
          <span className="text-[1.15rem] font-bold text-white tracking-wide leading-tight group-hover:text-[#c8a84b] transition-colors">
            J. WORDEN & SONS
          </span>
          <span className="text-[0.7rem] text-[#c8a84b] tracking-widest uppercase">
            Asphalt Paving • Est. 1984
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/" hash="about" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">About</Link>
          <Link to="/" hash="services" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Services</Link>
          <a href="/commercial.html" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Commercial</a>
          <a href="/masonry.html" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Masonry</a>
          <Link to="/" hash="standard" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Our Standard</Link>
          <Link to="/" hash="contact" className="text-white text-[0.85rem] uppercase tracking-wider hover:text-[#c8a84b] transition-colors">Contact</Link>
        </nav>
        <div className="md:hidden text-white cursor-pointer">
          {/* Mobile menu icon would go here */}
          <span className="text-[#c8a84b]">MENU</span>
        </div>
      </div>
    </header>
  )
}
