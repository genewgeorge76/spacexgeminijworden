import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="bg-black text-white border-t-[10px] border-[#ffcc00] pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-16">
        
        {/* BRANDING & HOTLINE */}
        <div className="md:col-span-2">
          <h2 className="text-[#ffcc00] text-4xl font-black uppercase tracking-tighter mb-4">
            J. Worden & Sons
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-8">
            Multi-Decade Infrastructure Authority
          </p>
          <a href="tel:8044461296" className="inline-block bg-[#1a1a1a] border-l-4 border-[#ffcc00] px-6 py-4">
            <p className="text-xs text-gray-500 font-black uppercase mb-1">Commercial Dispatch & Estimating</p>
            <p className="text-3xl text-white font-black">804-446-1296</p>
          </a>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-6">Divisions</h3>
          <ul className="space-y-4 font-bold text-gray-400 text-sm uppercase">
            <li><Link to="/commercial" className="hover:text-[#ffcc00] transition-colors">Commercial QSR Fast-Track</Link></li>
            <li><Link to="/" className="hover:text-[#ffcc00] transition-colors">Residential Estates</Link></li>
            <li><Link to="/standards" className="hover:text-[#ffcc00] transition-colors">Virginia Engineering Specs</Link></li>
          </ul>
        </div>

        {/* PROOF & AWARDS */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-6">Vetted By</h3>
          <ul className="space-y-4 font-bold text-gray-400 text-sm uppercase">
            <li className="flex items-center gap-2">
              <span className="text-[#ffcc00]">✓</span> KFC & Taco Bell
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#ffcc00]">✓</span> Winn-Dixie
            </li>
            <li className="flex items-center gap-2 mt-4">
              <a href="https://www.houzz.com/pro/jwordandsonspaving/j-worden-sons-paving-l-l-c" target="_blank" rel="noopener noreferrer" className="bg-[#7ac142] text-white px-3 py-1 text-xs rounded hover:scale-105 transition-transform">
                Houzz Pro 2024-2026
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT & LEGAL */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-bold text-gray-600 uppercase tracking-widest gap-4">
        <p>© {new Date().getFullYear()} J. Worden & Sons Paving. All Rights Reserved.</p>
        <p>Virginia Dept. of Transportation (VDOT) Standard Compliant.</p>
      </div>
    </footer>
  )
}
