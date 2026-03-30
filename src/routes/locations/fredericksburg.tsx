import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Building2, Shield, Star, Landmark, History } from 'lucide-react';

const FredericksburgLocation = () => {
  const locationName = "Fredericksburg, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Expert Asphalt Paving in Fredericksburg, VA | J. Worden & Sons`,
    description: `The leading asphalt paving contractor in Fredericksburg, VA. Serving historic downtown restorations and heavy-duty commercial lots in Central Park.`,
    canonical: "https://jwordenasphaltpaving.com/locations/fredericksburg"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Fredericksburg's authority on historic driveway preservation and high-volume commercial paving.",
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
      { "@type": "City", "name": "Fredericksburg" },
      { "@type": "Neighborhood", "name": "Historic Downtown" },
      { "@type": "Neighborhood", "name": "Central Park" },
      { "@type": "Neighborhood", "name": "Celebrate Virginia" }
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
        <div className="absolute inset-0 opacity-25 bg-[url('/images/fredericksburg-paving-hero.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Landmark className="h-4 w-4" />
            Historic & Commercial Paving Experts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Protecting the heritage of **Historic Downtown** with precision asphalt, while 
            engineering high-durability parking solutions for **Central Park** and Route 3.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE FREDERICKSBURG QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Urban Strategy Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">Paving the Crossroads of Virginia</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Fredericksburg demands versatility. We provide the massive scale needed to mill and 
              pave retail megacenters in **Central Park**, while also delivering the fine-touch 
              craftsmanship required for residential properties near the **Rappahannock River** and 
              historic districts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {["Central Park Commercial Lots", "Historic Downtown Driveways", "Route 3 Infrastructure", "Celebrate Virginia Estates"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-bold text-slate-800">
                  <CheckCircle className="text-orange-600 h-5 w-5" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 text-center">
             <Building2 className="text-orange-600 h-12 w-12 mx-auto mb-4" />
             <h3 className="text-2xl font-bold mb-2">Regional Powerhouse</h3>
             <p className="text-slate-500 mb-6">Serving 22401, 22402, 22404</p>
             <p className="text-slate-900 font-extrabold italic mb-2">Central Operations Directed From:</p>
             <p className="text-orange-600 font-bold">{hqAddress}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FredericksburgLocation;
