import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Landmark, History } from 'lucide-react';

const PetersburgLocation = () => {
  const locationName = "Petersburg, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Expert Asphalt Paving in ${locationName} | J. Worden & Sons`,
    description: `Professional asphalt paving in Petersburg, VA. From historic Old Towne to Fort Gregg-Adams, we provide premium residential and commercial paving solutions.`,
    canonical: "https://jwordenasphaltpaving.com/locations/petersburg"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "The Cockade City's choice for professional asphalt paving, sealcoating, and repair.",
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
      { "@type": "City", "name": "Petersburg" },
      { "@type": "Neighborhood", "name": "Old Towne" },
      { "@type": "Neighborhood", "name": "Walnut Hill" },
      { "@type": "GovernmentOrganization", "name": "Fort Gregg-Adams" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/petersburg-historic-paving.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <History className="h-4 w-4" />
            Cockade City’s Paving Authority
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Premium Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Delivering modern durability to Petersburg’s historic landscapes. 
            Quality asphalt solutions for **Old Towne**, **Walnut Hill**, and military families.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE PETERSBURG ESTIMATE
            </button>
          </div>
        </div>
      </section>

      {/* Local Content Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900">Trusted in the Tri-Cities</h2>
            <p className="text-lg text-slate-600 mb-6">
              Petersburg’s unique mix of historic cobblestone transitions and modern commercial 
              hubs requires a contractor who understands structural integrity. 
              Whether you are a business owner in the **Historic District** or a 
              resident near **Fort Gregg-Adams**, we provide paving that lasts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {["Historic Driveway Preservation", "Military Housing Contracts", "Commercial Retail Paving", "Industrial Milling & Repair"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle className="text-orange-600 h-5 w-5" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Landmark className="text-orange-600" /> Serving Petersburg Zips
            </h3>
            <p className="text-slate-700 font-bold text-lg mb-4">23803, 23805</p>
            <p className="text-slate-500 text-sm">Our crews are dispatched in under 15 minutes from our Chester HQ.</p>
          </div>
        </div>
      </section>

      {/* HQ Connection Footer */}
      <section className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-orange-500 font-bold uppercase mb-2">Regional Operations Hub</p>
          <p className="text-lg text-slate-300">Managed from: **{hqAddress}**</p>
        </div>
      </section>
    </div>
  );
};

export default PetersburgLocation;
