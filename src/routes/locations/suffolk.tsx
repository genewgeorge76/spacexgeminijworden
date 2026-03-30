import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Tractor } from 'lucide-react';

const SuffolkLocation = () => {
  const locationName = "Suffolk, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Expert Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `Leading asphalt paving services in Suffolk, VA. From North Suffolk estates to Harbor View commercial lots, we provide premium paving managed from our Chester HQ.`,
    canonical: "https://jwordenasphaltpaving.com/locations/suffolk"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Providing Suffolk with elite residential and industrial asphalt paving solutions.",
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
      { "@type": "City", "name": "Suffolk" },
      { "@type": "Neighborhood", "name": "Harbor View" },
      { "@type": "Neighborhood", "name": "North Suffolk" },
      { "@type": "Neighborhood", "name": "Whaleyville" },
      { "@type": "Neighborhood", "name": "Driver" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/suffolk-paving.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Tractor className="h-4 w-4" />
            Suffolk’s Residential & Industrial Leader
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-balance">
            Premium Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Specializing in large-scale residential estates and high-traffic commercial 
            hubs throughout **Harbor View**, **Driver**, and **North Suffolk**.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE SUFFOLK ESTIMATE
            </button>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">Built for Suffolk’s Scale</h2>
            <p className="text-lg text-slate-600 mb-6">
              Suffolk properties range from historic downtown streets to massive rural 
              estates. Our crews bring the equipment and expertise to handle 
              long-distance driveway paving and complex commercial lot layouts with ease.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {["Harbor View Commercial Lots", "North Suffolk Estate Driveways", "Agricultural & Rural Paving", "Full-Service Asphalt Repair"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle className="text-orange-600 h-5 w-5" /> {item}
                </div>
              ))}
            </div>
            <p className="font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="text-orange-600" /> Serving Zips: 23434, 23435
            </p>
          </div>
          <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl text-center">
            <Star className="text-orange-500 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Coordinated from HQ</h3>
            <p className="text-slate-400 mb-6 font-medium italic">
                All Suffolk projects are dispatched from our central hub:
            </p>
            <p className="text-xl font-bold text-orange-500">{hqAddress}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuffolkLocation;
