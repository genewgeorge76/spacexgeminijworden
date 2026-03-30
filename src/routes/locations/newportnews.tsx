import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Building2, Anchor } from 'lucide-react';

const NewportNewsLocation = () => {
  const locationName = "Newport News, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Expert Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `The premier asphalt paving choice for Newport News, VA. Specializing in heavy-duty commercial lots for shipyards and premium residential driveways in Hilton Village & Kiln Creek.`,
    canonical: "https://jwordenasphaltpaving.com/locations/newport-news"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Providing Newport News with industrial-strength paving and luxury residential driveway solutions.",
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
      { "@type": "City", "name": "Newport News" },
      { "@type": "Neighborhood", "name": "Hilton Village" },
      { "@type": "Neighborhood", "name": "Kiln Creek" },
      { "@type": "Neighborhood", "name": "Denbigh" },
      { "@type": "Neighborhood", "name": "Oyster Point" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/newport-news-paving.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Anchor className="h-4 w-4" />
            The Peninsula’s Industrial Paving Authority
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Superior Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Delivering high-durability asphalt for Newport News' industrial corridors 
            and precision residential paving for **Hilton Village** and **Kiln Creek**.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE NEWPORT NEWS QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Industrial & Residential Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">Engineered for Peninsula Performance</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Newport News infrastructure handles some of the heaviest traffic in Virginia. 
              Our team specializes in industrial-grade overlays for the **Shipyard** and 
              **Oyster Point** areas, as well as aesthetic driveway solutions for the city's 
              historic and master-planned residential communities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {["Industrial Shipyard Paving", "Oyster Point Retail Lots", "Hilton Village Driveways", "CNU Area Support Paving"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle className="text-orange-600 h-5 w-5" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 shadow-xl text-center">
             <Building2 className="text-orange-600 h-12 w-12 mx-auto mb-4" />
             <h3 className="text-2xl font-bold mb-2">Newport News Trusted</h3>
             <p className="text-slate-500 mb-6">Serving 23601, 23602, 23606, 23608</p>
             <p className="text-slate-900 font-extrabold italic">Managed from our Main Chester HQ office at:</p>
             <p className="text-orange-600 font-bold mt-2">{hqAddress}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewportNewsLocation;
