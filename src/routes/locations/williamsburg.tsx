import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Landmark, History } from 'lucide-react';

const WilliamsburgLocation = () => {
  const locationName = "Williamsburg, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Premium Paving Contractor in Williamsburg, VA | J. Worden & Sons`,
    description: `Elite asphalt paving and historic preservation for Williamsburg, VA. Specializing in luxury driveways for Ford's Colony, Kingsmill, and Colonial-era commercial districts.`,
    canonical: "https://jwordenasphaltpaving.com/locations/williamsburg"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "The gold standard for residential and commercial paving in historic Williamsburg.",
    "url": "https://jwordenasphaltpaving.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1601 Ware Bottom Springs Rd, Suite 214",
      "addressLocality": "Chester",
      "addressRegion": "VA",
      "postalCode": "23836"
    },
    "areaServed": [
      { "@type": "City", "name": "Williamsburg" },
      { "@type": "Neighborhood", "name": "Colonial Williamsburg" },
      { "@type": "Neighborhood", "name": "Ford's Colony" },
      { "@type": "Neighborhood", "name": "Kingsmill" },
      { "@type": "Neighborhood", "name": "Governor's Land" }
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
        <div className="absolute inset-0 opacity-25 bg-[url('/images/williamsburg-paving-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <History className="h-4 w-4" />
            Historic Heritage & Luxury Paving
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Asphalt Paving in <span className="text-orange-500">Williamsburg</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Preserving the aesthetic of Virginia’s colonial capital with premium 
            driveway designs for **Ford's Colony**, **Kingsmill**, and the historic district.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              REQUEST WILLIAMSBURG QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Luxury Focus Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 bg-slate-900 p-10 rounded-3xl text-white shadow-2xl">
             <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="text-orange-500 fill-current" /> The Williamsburg Standard
             </h3>
             <ul className="space-y-4 font-medium text-slate-300">
                <li className="flex items-center gap-3"><CheckCircle className="text-orange-500 h-5 w-5" /> HOA-Compliant Driveway Resurfacing</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-orange-500 h-5 w-5" /> Luxury Gated Community Specialists</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-orange-500 h-5 w-5" /> Historic Commercial Parking lots</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-orange-500 h-5 w-5" /> Precision Drainage & Foundation Work</li>
             </ul>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight text-balance">Paving for Generations in the Colonial Capital</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              In **Williamsburg**, paving is about more than just asphalt—it’s about matching the 
              architectural integrity of the region. J. Worden & Sons provides the careful 
              touch required for high-end residential estates and the durability needed 
              for the area's massive tourism traffic.
            </p>
            <div className="flex items-center gap-3 font-bold text-slate-900">
                <MapPin className="text-orange-600" /> Dispatched from Chester HQ: {hqAddress}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WilliamsburgLocation;
