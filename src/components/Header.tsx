import React from 'react';
import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <header className="sticky top-0 z-[100] bg-black border-b-[3px] border-[#ffcc00] py-4 px-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="text-white font-black text-2xl tracking-tighter uppercase leading-none">
            J. WORDEN & SONS <span className="text-[#ffcc00]">ASPHALT PAVING</span>
          </Link>
          <span className="text-[#ffcc00] text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Official Top Rated Contractor 2026
          </span>
        </div>

        <nav className="flex gap-8 text-white font-black uppercase text-xs tracking-widest">
          <Link to="/commercial" className="hover:text-[#ffcc00] transition-colors">Commercial</Link>
          <Link to="/" className="hover:text-[#ffcc00] transition-colors">Residential</Link>
          <Link to="/" className="hover:text-[#ffcc00] transition-colors">Our Standard</Link>
        </nav>

        <a<Link to="/commercial" className="hover:text-[#ffcc00] transition-colors">Commercial</Link> 
          href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#ffcc00] text-black px-8 py-3 font-black uppercase text-sm hover:bg-white transition-all shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]"
        >
          Free Estimate
        </a>
      </div>
    </header>
  );
};
