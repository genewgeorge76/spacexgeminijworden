import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Building } from 'lucide-react';

const ChesapeakeLocation = () => {
  const locationName = "Chesapeake, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Top-Rated Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `Premium asphalt paving for Chesapeake, VA. Specializing in Greenbrier commercial lots, Western Branch driveways, and large-scale residential paving projects.`,
    canonical: "https://jwordenasphaltpaving.com/locations/chesapeake"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Chesapeake's premier provider for residential driveways and high-traffic commercial parking lots.",
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
      { "@type": "City", "name": "Chesapeake" },
      { "@type": "Neighborhood", "name": "Greenbrier" },
      { "@type": "Neighborhood", "name": "Western Branch" },
      { "@type": "Neighborhood", "name": "Great Bridge" },
      { "@type": "Neighborhood", "name": "Deep Creek" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/chesapeake-paving-hero.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Building className="h-4 w-4" />
            Chesapeake's Commercial & Residential Powerhouse
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Superior Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Delivering high-durability solutions for **Greenbrier** retail centers and 
            premium driveway installations for **Great Bridge** and **Western Branch** homeowners.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE CHESAPEAKE QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Suburban Dominance Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">Master-Planned Quality</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                As one of the region's largest cities by area, Chesapeake demands a paving 
                partner with scale. From the industrial corridors of **Deep Creek** to the 
                retail density of **Greenbrier Mall**, J. Worden & Sons has the equipment 
                and manpower to handle Chesapeake's most ambitious projects.
            </p>
            <div className="space-y-4 mb-10 font-bold text-slate-800">
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Commercial Retail Parking Hubs</div>
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Large-Scale Driveway Resurfacing</div>
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Professional ADA Striping & Marking</div>
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Sub-base Fortification for Sandy Soil</div>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl text-center">
             <Star className="text-orange-600 h-12 w-12 mx-auto mb-4" />
             <h3 className="text-2xl font-bold mb-2">Chesapeake Trusted</h3>
             <p className="text-slate-500 mb-6">Serving 23320, 23321, 23322, 23323, 23324</p>
             <p className="text-slate-900 font-extrabold">Coordinated from our Main Chester HQ</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChesapeakeLocation;
