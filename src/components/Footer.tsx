import { Link } from '@tanstack/react-router'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111111] text-white border-t-[10px] border-[#ffcc00] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* COMPANY HQ & AUTHORITY */}
        <div className="space-y-6">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter">
            J. Worden & Sons<br />
            <span className="text-[#ffcc00]">Asphalt Paving</span>
          </h3>
          <div className="space-y-2 text-gray-400 font-bold uppercase text-sm tracking-widest">
            <p>1601 Ware Bottom Springs Rd, Suite 214</p>
            <p>Chester, VA 23836</p>
            <a href="tel:8044461296" className="text-[#ffcc00] text-xl block hover:underline">
              804-446-1296
            </a>
          </div>
          <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
            The 4th Generation Structural Standard. Serving Richmond, Henrico, and 41 Virginia cities with the 6-inch stone base requirement.
          </p>
        </div>

        {/* QUICK ACCESS LINKS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-black uppercase text-[#ffcc00] text-xs tracking-[0.2em]">Services</h4>
            <nav className="flex flex-col space-y-2 text-sm font-bold uppercase">
              <Link to="/commercial" className="hover:text-[#ffcc00] transition-colors">Commercial</Link>
              <Link to="/standards" className="hover:text-[#ffcc00] transition-colors">Our Standards</Link>
              <Link to="/locations/tuckahoe" className="hover:text-[#ffcc00] transition-colors text-[#ffcc00]">Tuckahoe Elite</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-black uppercase text-[#ffcc00] text-xs tracking-[0.2em]">Regional</h4>
            <nav className="flex flex-col space-y-2 text-sm font-bold uppercase">
              <Link to="/locations/henrico" className="hover:text-[#ffcc00] transition-colors">Henrico</Link>
              <Link to="/locations/midlothian" className="hover:text-[#ffcc00] transition-colors">Midlothian</Link>
              <Link to="/locations/chester" className="hover:text-[#ffcc00] transition-colors">Chester</Link>
            </nav>
          </div>
        </div>

        {/* TRUST SIGNALS */}
        <div className="bg-[#1a1a1a] p-8 border border-gray-800 flex flex-col justify-center items-center text-center">
          <div className="text-[#ffcc00] text-4xl font-black mb-2 uppercase tracking-tighter italic">Since 1984</div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Licensed & Insured Virginia Class A Contractor
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row
