export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#111] text-[#888] py-10 px-6 text-center text-[0.8rem] leading-7 border-t border-[#3d3d3d] font-sans">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-white font-semibold">
          J. Worden &amp; Sons Asphalt Paving - 4th Generation | Established 1984.
        </p>
        <p>Chester, Virginia • Phone: 804-446-1296 • Serving 41 Virginia cities • Multi-state commercial paving</p>
        <p className="mt-4 text-[0.72rem] italic">
          J. Worden & Sons Asphalt Paving is an independent family business and is not affiliated with, associated with, or endorsed by any other Worden-named paving business or entity in Chester, Virginia or elsewhere.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-[0.78rem]">
          <a href="/commercial.html" className="text-[#c8a84b] hover:underline">Commercial</a>
          <a href="/masonry.html" className="text-[#c8a84b] hover:underline">Masonry</a>
          <a href="/portfolio.html" className="text-[#c8a84b] hover:underline">Portfolio</a>
          <a href="/contact.html" className="text-[#c8a84b] hover:underline">Contact</a>
          <a href="/sitemap.xml" className="text-[#c8a84b] hover:underline">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
