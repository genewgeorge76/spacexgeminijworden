import React from 'react';
import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <header className="sticky top-0 z-[100] bg-black border-b-[3px] border-[#ffcc00] py-4 px-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand Identity */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="text-white font-black text-2xl tracking-tighter uppercase leading-none">
            J. WORDEN & SONS <span className="text-[#ffcc00]">ASPHALT PAVING</span>
          </Link>
          <span className="text-[#ffcc00] text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Official Top Rated Contractor 2026
          </span>
        </div>

        {/* Navigation Grid */}
        <nav className="flex gap-6 text-white font-black uppercase text-xs tracking-widest">
          <Link to="/commercial" className="hover:text-[#ffcc00] transition-colors">Commercial</Link>
          <Link to="/" className="hover:text-[#ffcc00] transition-colors">Residential</Link>
          <Link to="/standards" className="hover:text-[#ffcc00] transition-colors">Our Standards</Link>
        </nav>

        {/* Lead Capture: Phone & Estimate */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a 
            href="tel:8044461296" 
            className="text-white font-black text-lg hover:text-[#ffcc00] transition-colors flex items-center gap-2"
          >
            <span className="text-[#ffcc00]">CALL:</span> 804-446-1296
          </a>
          <a 
            href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#ffcc00] text-black px-8 py-3 font-black uppercase text-sm hover:bg-white transition-all shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]"
          >
            Free Estimate
          </a>
        </div>
      </div>
    </header>
  );
};
