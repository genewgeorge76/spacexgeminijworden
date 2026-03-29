import { Link } from '@tanstack/react-router'

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white border-t-[10px] border-[#ffcc00] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="space-y-6">
          <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-[#ffcc00]">J. Worden & Sons</h3>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em]">1601 Ware Bottom Springs Rd, Suite 214<br />Chester, VA 23836</p>
          <a href="tel:8044461296" className="text-4xl font-black text-white hover:text-[#ffcc00] underline decoration-[#ffcc00]">804-446-1296</a>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <nav className="flex flex-col space-y-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span className="text-[#ffcc00]">Authority Corridors</span>
            <Link to="/locations/windsor-farms" className="hover:text-white italic">Windsor Farms Corridor</Link>
            <Link to="/locations/tuckahoe" className="hover:text-white italic">Tuckahoe Elite</Link>
            <Link to="/locations/obx" className="hover:text-white italic">The OBX Run</Link>
          </nav>
          <nav className="flex flex-col space-y-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span className="text-[#ffcc00]">Main Moves</span>
            <Link to="/sealcoating" className="hover:text-white italic">Sealcoating</Link>
            <Link to="/services/maintenance" className="hover:text-white italic">Chip & Tar</Link>
            <Link to="/commercial" className="hover:text-white italic">Commercial ADA</Link>
          </nav>
        </div>
        <div className="bg-[#1a1a1a] p-8 border border-gray-800 text-center relative overflow-hidden">
          <div className="text-5xl font-black text-[#ffcc00] italic uppercase tracking-tighter">Since 1984</div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-4">Richmond 23221 Authority</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] font-black uppercase text-gray-500">AI Staff Monitoring: 41 Cities Active</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
