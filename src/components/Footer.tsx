import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] pt-16 pb-8 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-[#c8a84b] font-bold uppercase tracking-widest mb-6">J. Worden & Sons Asphalt Paving</h3>
          <p className="text-[#888] text-sm leading-relaxed max-w-md mb-6">
            Dominating Richmond and surrounding areas with estate-grade paving. 
            We provide 6-inch compacted stone bases for every job, ensuring 
            pavement that lasts for generations.
          </p>
        </div>
        
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-[#888]">
            <li>
              <span className="block text-[#555] text-[10px] uppercase font-bold mb-1">Direct Line</span>
              <a href="tel:8044461296" className="text-white hover:text-[#c8a84b] transition-colors">804-446-1296</a>
            </li>
            <li>
              <span className="block text-[#555] text-[10px] uppercase font-bold mb-1">Email Estimates</span>
              <a href="mailto:j.wordenandsonspaving@gmail.com" className="text-white hover:text-[#c8a84b] transition-colors">j.wordenandsonspaving@gmail.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="text-[#888] hover:text-[#c8a84b]">Services</Link></li>
            <li><Link to="/" hash="contact" className="text-[#888] hover:text-[#c8a84b]">Free Estimate</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#1a1a1a] flex flex-col md:row justify-between items-center gap-4">
        <p className="text-[#444] text-[10px] uppercase tracking-widest">
          © 2026 J. Worden & Sons Asphalt Paving | Richmond, VA 23221
        </p>
      </div>
    </footer>
  )
}
