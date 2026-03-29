import { Link } from '@tanstack/react-router'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111111] text-white border-t-[10px] border-[#ffcc00] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter">
            J. Worden & Sons<br />
            <span className="text-[#ffcc00]">Asphalt Paving</span>
          </h3>
          <div className="space-y-2 text-gray-400 font-bold uppercase text-sm tracking-widest">
            <p>1601 Ware Bottom Springs Rd, Suite 214</p>
            <p>Chester, VA 23836</p>
            <a href="tel:8044461296" className="text-[#ffcc00] text-xl block hover:underline italic">804-446-1296</a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-black uppercase text-[#ffcc00] text-xs tracking-[0.2em]">Authority</h4>
            <nav className="flex flex-col space-y-2 text-sm font-bold uppercase">
              <Link to="/locations/tuckahoe" className="hover:text-[#ffcc00] transition-colors">Tuckahoe Elite</Link>
              <Link to="/locations/midlothian" className="hover:text-[#ffcc00] transition-colors">Midlothian</Link>
              <Link to="/locations/amelia" className="hover:text-[#ffcc00] transition-colors">Amelia</Link>
            </nav>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-8 border border-gray-800 text-center">
          <div className="text-[#ffcc00] text-4xl font-black mb-2 uppercase italic tracking-tighter">Since 1984</div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Richmond 23221 Elite Contractor</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
