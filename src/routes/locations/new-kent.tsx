import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Wine, Trophy } from 'lucide-react';

const NewKentLocation = () => {
  const locationName = "New Kent, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Premium Asphalt Paving in New Kent, VA | J. Worden & Sons`,
    description: `Leading paving contractor for New Kent, Quinton, and Providence Forge. Specializing in luxury estate driveways and commercial paving for Virginia's fastest-growing county.`,
    canonical: "https://jwordenasphaltpaving.com/locations/new-kent"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Premium asphalt solutions for New Kent's residential estates and growing commercial landscape.",
    "url": "https://jwordenasphaltpaving.com",
    "telephone": "+18040000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1601 Ware Bottom Springs Rd, Suite 214",
      "addressLocality": "Chester",
      "addressRegion": "VA",
      "postalCode": "23836"
    },
    "areaServed": [
      { "@type": "City", "name": "New Kent" },
      { "@type": "City", "name": "Quinton" },
      { "@type": "City", "name": "Providence Forge" },
      { "@type": "City", "name": "Lanexa" }
    ]
  };

  return (
    <div className="location-page">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/new-kent-paving.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Trophy className="h-4 w-4" />
            New Kent’s Estate Paving Experts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Paving Solutions in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            From the wineries of **Quinton** to the custom estates of **Providence Forge**, 
            we provide the durability and aesthetic appeal New Kent property owners demand.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE NEW KENT QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Local Authority Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900">Paving the Path of Growth</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              New Kent is unique. As a bridge between Richmond and Williamsburg, it requires 
              a contractor who can manage long rural driveways and high-traffic commercial 
              hubs alike. We specialize in the high-clay soil transitions common in the 
              **Lanexa** and **Providence Forge** areas.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Winery Paving", icon: <Wine className="text-orange-600" /> },
                { label: "Golf Communities", icon: <Trophy className="text-orange-600" /> },
                { label: "Estate Driveways", icon: <Star className="text-orange-600" /> },
                { label: "Retail Lots", icon: <Shield className="text-orange-600" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-bold text-slate-800 p-3 bg-slate-50 rounded-lg">
                  {item.icon} {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">The New Kent Standard</h3>
            <ul className="space-y-4">
               {["Custom Sub-base Engineering", "High-Traffic Surface Hot-Mix", "Eco-Friendly Sealcoating", "Precision Drainage Solutions"].map((item, i) => (
                 <li key={i} className="flex gap-3 items-center">
                   <CheckCircle className="text-orange-500 h-6 w-6" /> {item}
                 </li>
               ))}
            </ul>
            <hr className="my-8 border-white/10" />
            <div className="flex items-center gap-3">
                <MapPin className="text-orange-500" />
                <span>Serving Zips: 23124, 23140, 23141, 23089</span>
            </div>
          </div>
        </div>
      </section>

      {/* HQ Footer */}
      <section className="bg-slate-50 py-12 px-4 border-t border-slate-200 text-center">
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs mb-2">Regional Logistics Center</p>
          <p className="text-slate-900 font-bold">Managed from Chester HQ: {hqAddress}</p>
      </section>
    </div>
  );
};

export default NewKentLocation;
