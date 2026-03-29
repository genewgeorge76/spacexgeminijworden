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
          <p className="text-gray-400 font-bold uppercase text-sm">
            1601 Ware Bottom Springs Rd, Suite 214<br />
            Chester, VA 23836
          </p>
          <a href="tel:8044461296" className="text-[#ffcc00] text-xl font-black block hover:underline">
            804-446-1296
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-black uppercase text-[#ffcc00] text-xs">Services</h4>
            <nav className="flex flex-col space-y-2 text-sm font-bold uppercase">
              <Link to="/commercial">Commercial</Link>
              <Link to="/standards">Standards</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-black uppercase text-[#ffcc00] text-xs">Regional</h4>
            <nav className="flex flex-col space-y-2 text-sm font-bold uppercase">
              <Link to="/locations/tuckahoe">Tuckahoe</Link>
              <Link to="/locations/henrico">Henrico</Link>
            </nav>
          </div>
        </div>
        <div className="bg-[#1a1a1a] p-8 border border-gray-800 text-center">
          <div className="text-[#ffcc00] text-4xl font-black italic">Since 1984</div>
          <p className="text-xs font-bold text-gray-400 uppercase">Licensed & Insured</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-900 flex justify-between items-center text-[10px] uppercase font-black text-gray-600">
        <p>&copy; {currentYear} J. Worden & Sons Asphalt Paving</p>
        <p className="text-[#ffcc00]">Richmond 23221 Authority</p>
      </div>
    </footer>
  )
}

export default Footer
