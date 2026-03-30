import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Anchor, CheckCircle, MapPin, Shield, Star, Award, Landmark } from 'lucide-react';

const PortsmouthLocation = () => {
  const locationName = "Portsmouth, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Top-Rated Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `Expert asphalt paving for Portsmouth, VA. Specializing in Olde Towne historic driveways and industrial-strength shipyard paving solutions.`,
    canonical: "https://jwordenasphaltpaving.com/locations/portsmouth"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "The trusted choice for Portsmouth's historic residential districts and industrial corridors.",
    "url": "https://jwordenasphaltpaving.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1601 Ware Bottom Springs Rd, Suite 214",
      "addressLocality": "Chester",
      "addressRegion": "VA",
      "postalCode": "23836"
    },
    "areaServed": [
      { "@type": "City", "name": "Portsmouth" },
      { "@type": "Neighborhood", "name": "Olde Towne" },
      { "@type": "Neighborhood", "name": "Churchland" },
      { "@type": "Neighborhood", "name": "West Norfolk" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/portsmouth-paving-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Anchor className="h-4 w-4" />
            Portsmouth’s Industrial & Historic Paving Choice
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Paving Solutions in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed text-balance">
            From the historic estates of **Olde Towne** to the heavy-duty industrial 
            requirements of the shipyard corridors, we deliver asphalt that lasts.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE PORTSMOUTH ESTIMATE
            </button>
          </div>
        </div>
      </section>

      {/* Historic Focus Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 bg-slate-50 p-10 rounded-3xl border border-slate-200">
             <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                <Landmark className="text-orange-600" /> Historic Preservation
             </h3>
             <p className="text-slate-600 mb-6 leading-relaxed">
                In neighborhoods like **Olde Towne**, paving must respect the heritage of the area. 
                We specialize in clean, precision transitions that complement historic 
                brickwork and architecture.
             </p>
             <div className="space-y-3 font-bold text-slate-800">
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Churchland Residential Experts</div>
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Industrial-Grade Overlays</div>
                <div className="flex items-center gap-3"><CheckCircle className="text-orange-600 h-5 w-5" /> Commercial Parking Solutions</div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">Serving the Port City</h2>
            <p className="text-lg text-slate-600 mb-6">
                Portsmouth’s industrial infrastructure requires asphalt that can stand up 
                to heavy machinery and constant traffic. J. Worden & Sons brings 
                industrial-strength expertise to every job.
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

export default PortsmouthLocation;
