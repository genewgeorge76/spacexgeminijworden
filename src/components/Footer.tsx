import React from 'react';
import { Link } from '@tanstack/react-router';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const regions = [
    {
      name: "Greater Richmond",
      cities: ["Richmond", "Midlothian", "Tuckahoe", "Short Pump", "Glen Allen", "Mechanicsville", "Bon Air", "Lakeside"]
    },
    {
      name: "Chesterfield & Tri-Cities",
      cities: ["Chester", "Chesterfield", "Petersburg", "Hopewell", "Colonial Heights", "Moseley", "Dinwiddie", "Prince George"]
    },
    {
      name: "Hampton Roads & Peninsula",
      cities: ["Virginia Beach", "Norfolk", "Chesapeake", "Newport News", "Hampton", "Suffolk", "Portsmouth", "Williamsburg"]
    },
    {
      name: "Surrounding Counties",
      cities: ["New Kent", "Powhatan", "Goochland", "Hanover", "Henrico", "Amelia", "Ashland", "Charles City"]
    }
  ];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & HQ */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black tracking-tighter italic">
              J. WORDEN & SONS
              <span className="text-orange-600 font-bold block text-sm not-italic tracking-widest">ASPHALT PAVING</span>
            </h3>
            
            <div className="space-y-4 text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="text-orange-600 h-5 w-5 mt-1 flex-shrink-0" />
                <p><strong>Headquarters:</strong><br />{hqAddress}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-orange-600 h-5 w-5" />
                <p>(804) 446-1296</p>
              </div>
            </div>
          </div>

          {/* Columns 2-4: Regional Links (THE SEO POWER) */}
          {regions.map((region) => (
            <div key={region.name}>
              <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/10 pb-2">
                {region.name}
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {region.cities.map((city) => (
                  <li key={city}>
                    <Link 
                      to={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                    >
                      Paving in {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © 2026 J. Worden & Sons Asphalt Paving. All Rights Reserved.
            <span className="block md:inline md:ml-2">100% Google Best Practices Certified.</span>
          </p>
          <div className="flex gap-4">
            {/* Social icons removed to clear the build error */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
