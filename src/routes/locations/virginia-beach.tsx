import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Waves, Anchor } from 'lucide-react';

const VirginiaBeachLocation = () => {
  const locationName = "Virginia Beach, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Premium Asphalt Paving in Virginia Beach, VA | J. Worden & Sons`,
    description: `The leading choice for Virginia Beach asphalt paving. Specialized salt-resistant paving for coastal estates, Oceanfront commercial lots, and Town Center developments.`,
    canonical: "https://jwordenasphaltpaving.com/locations/virginia-beach"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Providing Virginia Beach with coastal-grade asphalt solutions, from Sandbridge estates to Town Center commercial hubs.",
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
      { "@type": "City", "name": "Virginia Beach" },
      { "@type": "Neighborhood", "name": "Oceanfront" },
      { "@type": "Neighborhood", "name": "Sandbridge" },
      { "@type": "Neighborhood", "name": "Pungo" },
      { "@type": "Neighborhood", "name": "Town Center" },
      { "@type": "Neighborhood", "name": "Great Neck" }
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
        <div className="absolute inset-0 opacity-25 bg-[url('/images/vb-paving-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Waves className="h-4 w-4" />
            Coastal Paving Excellence
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Asphalt Paving in <span className="text-orange-500">Virginia Beach</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Engineered for the coast. From **Sandbridge** estates to **Oceanfront** commercial 
            hubs, we deliver asphalt that withstands the unique demands of the Virginia Beach climate.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE BEACH ESTIMATE
            </button>
          </div>
        </div>
      </section>

      {/* Coastal Authority Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900">Durability Meets the Atlantic</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Coastal paving requires more than just standard asphalt. At J. Worden & Sons, we use 
              specialized hot-mix blends designed to resist salt-air degradation and 
              handle the sandy sub-base conditions common in **Virginia Beach**.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {["Salt-Resistant Mixes", "Heavy-Duty Retail Paving", "Sand-Base Stabilization", "Oceanfront Driveways"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-bold text-slate-800 p-3 bg-slate-50 rounded-lg">
                  <CheckCircle className="text-orange-600 h-5 w-5" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Anchor className="text-orange-500" /> Serving the Resort City
            </h3>
            <p className="text-slate-400 mb-6 font-medium">
                Our specialized crews are equipped for large-scale commercial retail and 
                luxury residential projects throughout the 757 area.
            </p>
            <div className="space-y-3 font-bold">
                <p className="text-orange-500">Zip Codes Covered:</p>
                <p className="text-sm">23451, 23452, 23454, 23455, 23456, 23462, 23464</p>
            </div>
          </div>
        </div>
      </section>

      {/* HQ Connection */}
      <section className="bg-slate-50 py-12 px-4 border-t border-slate-200 text-center">
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs mb-2">Operations Centered in Chester</p>
          <p className="text-slate-900 font-bold">Main Headquarters: {hqAddress}</p>
      </section>
    </div>
  );
};

export default VirginiaBeachLocation;
