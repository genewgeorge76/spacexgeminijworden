import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Rocket } from 'lucide-react';

const HamptonLocation = () => {
  const locationName = "Hampton, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Premium Asphalt Paving in Hampton, VA | J. Worden & Sons`,
    description: `Leading paving contractor for Hampton and the Peninsula. Specializing in Buckroe Beach residential driveways and high-traffic commercial paving for NASA/Langley hubs.`,
    canonical: "https://jwordenasphaltpaving.com/locations/hampton"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Hampton's choice for aerospace-precision paving and coastal residential driveways.",
    "url": "https://jwordenasphaltpaving.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1601 Ware Bottom Springs Rd, Suite 214",
      "addressLocality": "Chester",
      "addressRegion": "VA",
      "postalCode": "23836"
    },
    "areaServed": [
      { "@type": "City", "name": "Hampton" },
      { "@type": "Neighborhood", "name": "Buckroe Beach" },
      { "@type": "Neighborhood", "name": "Phoebus" },
      { "@type": "Neighborhood", "name": "Wythe" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/hampton-paving-hero.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Rocket className="h-4 w-4" />
            Peninsula Paving Excellence
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Delivering aerospace-precision asphalt for Hampton’s residents and businesses. 
            From **Buckroe Beach** estates to the commercial centers near **NASA Langley**.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE HAMPTON ESTIMATE
            </button>
          </div>
        </div>
      </section>

      {/* Coastal & Tech Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">Precision Paving for the Peninsula</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Hampton properties face unique challenges, from coastal salt air to high-traffic 
                commercial demands. J. Worden & Sons provides specialized hot-mix asphalt 
                designed to endure the Peninsula climate with minimal maintenance.
            </p>
            <div className="space-y-4 mb-10 font-bold text-slate-800">
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Buckroe Beach Coastal Driveways</div>
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Commercial Parking Lot Overlays</div>
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> NASA/Langley Area Support Paving</div>
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Specialized Sealcoating & Maintenance</div>
            </div>
          </div>
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 shadow-xl text-center">
             <Star className="text-orange-600 h-12 w-12 mx-auto mb-4" />
             <h3 className="text-2xl font-bold mb-2">Hampton Trusted</h3>
             <p className="text-slate-500 mb-6">Serving 23661, 23663, 23664, 23666, 23669</p>
             <p className="text-slate-900 font-extrabold italic">"Coordinated by our primary Chester HQ office."</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HamptonLocation;
