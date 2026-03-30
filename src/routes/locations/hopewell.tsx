import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Factory } from 'lucide-react';

const HopewellLocation = () => {
  const locationName = "Hopewell, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Reliable Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `Expert asphalt paving for Hopewell, VA. Specializing in industrial-grade parking lots and residential driveways for the City Point area and beyond.`,
    canonical: "https://jwordenasphaltpaving.com/locations/hopewell"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Hopewell's leading provider for industrial and residential asphalt paving services.",
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
      { "@type": "City", "name": "Hopewell" },
      { "@type": "Neighborhood", "name": "City Point" },
      { "@type": "Neighborhood", "name": "Woodlawn" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/hopewell-industrial-paving.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Factory className="h-4 w-4" />
            Hopewell’s Industrial Paving Partner
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Industrial-Strength Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            High-durability asphalt for Hopewell’s manufacturing hubs and elegant driveway 
            solutions for the historic **City Point** neighborhood.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              GET A HOPEWELL QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 bg-slate-900 p-10 rounded-3xl text-white shadow-2xl">
             <h3 className="text-2xl font-bold mb-6">Built for Hopewell Traffic</h3>
             <ul className="space-y-4">
                {["Heavy-Duty Industrial Overlays", "City Point Residential Specialists", "Full-Service Asphalt Repair", "Professional Sealcoating & Striping"].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <CheckCircle className="text-orange-500 h-6 w-6" /> {item}
                  </li>
                ))}
             </ul>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black mb-8 text-slate-900">Proven Paving Performance</h2>
            <p className="text-lg text-slate-600 mb-6">
              Hopewell is an engine of industry. We specialize in paving parking lots and loading 
              docks that stand up to 24/7 heavy-duty use. For our residential neighbors, 
              we bring that same industrial-grade quality to your home driveway.
            </p>
            <div className="flex items-center gap-4 text-slate-900 font-bold">
                <MapPin className="text-orange-600" /> Serving Zip Code: 23860
            </div>
          </div>
        </div>
      </section>

      {/* HQ Link */}
      <section className="bg-slate-50 py-12 px-4 border-t border-slate-200 text-center">
          <p className="text-slate-500">Centrally Headquartered at:</p>
          <p className="text-slate-900 font-bold">{hqAddress}</p>
      </section>
    </div>
  );
};

export default HopewellLocation;
