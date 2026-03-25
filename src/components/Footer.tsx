export const Footer = () => {
  const cities = [
    "Richmond", "Chester", "Midlothian", "Glen Allen", "Mechanicsville", 
    "Henrico", "Chesterfield", "Petersburg", "Hopewell", "Colonial Heights",
    "Mosley", "Powhatan", "Goochland", "Ashland", "Hanover", "Sandston",
    "Varina", "Bon Air", "Short Pump", "Tuckahoe", "Wyndham", "Brandermill",
    "Woodlake", "Enon", "Ettrick", "Matoaca", "Dinwiddie", "Prince George",
    "Disputanta", "Charles City", "New Kent", "Quinton", "King William",
    "Aylett", "St. Stephens Church", "Tappahannock", "Dunnsville", "Center Cross",
    "Montpelier", "Rockville", "Manakin Sabot"
  ]

  return (
    <footer className="bg-[#111111] border-t-8 border-[#ffcc00] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND AUTHORITY */}
          <div className="space-y-4">
            <h3 className="text-[#ffcc00] text-xl font-black uppercase">J. Worden & Sons</h3>
            <p className="text-gray-400 text-sm font-bold leading-relaxed">
              4th Generation Asphalt Paving Legacy. Established 1984. 
              The 6-Inch Structural Standard for Virginia.
            </p>
            <p className="text-[#ffcc00] font-black text-xl leading-none">804-446-1296</p>
          </div>

          {/* INDEPENDENCE DISCLAIMER */}
          <div className="lg:col-span-2 bg-[#1a1a1a] p-6 border border-[#ffcc00]/20 rounded">
            <h4 className="text-white font-black uppercase text-xs mb-3">Legal Notice & Brand Identity</h4>
            <p className="text-gray-500 text-[11px] leading-tight italic">
              J. Worden & Sons Asphalt Paving is an independent family business and is not affiliated with, 
              associated with, or endorsed by any other Worden-named paving business or entity in Chester, 
              Virginia or elsewhere. Our licenses, warranties, and structural standards are proprietary.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col gap-2 uppercase font-black text-xs tracking-widest">
            <a href="/" className="text-white hover:text-[#ffcc00]">Commercial</a>
            <a href="/" className="text-white hover:text-[#ffcc00]">Residential</a>
            <a href="/" className="text-white hover:text-[#ffcc00]">Masonry</a>
            <a href="/" className="text-white hover:text-[#ffcc00]">Contact</a>
          </div>
        </div>

        {/* SEO SERVICE GRID - TO BEAT JORDAN WELLS */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="text-gray-500 font-black uppercase text-[10px] tracking-[0.3em] mb-4 text-center">
            Virginia Service Grid: The 6-Inch Structural Standard Applied To
          </h4>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {cities.map((city) => (
              <span key={city} className="text-gray-600 text-[10px] font-bold uppercase hover:text-[#ffcc00] transition-colors cursor-default">
                {city}, VA
              </span>
            ))}
          </div>
        </div>

        <div className="text-center text-gray-700 text-[9px] font-black uppercase tracking-widest">
          © 2026 J. Worden & Sons Asphalt Paving • Serving 41 Virginia Cities
        </div>
      </div>
    </footer>
  )
}
