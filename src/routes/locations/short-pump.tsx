import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, ShoppingBag, construction } from 'lucide-react';

const ShortPumpLocation = () => {
  const locationName = "Short Pump, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  // Premium SEO Data for Short Pump & West End
  const seoData = {
    title: `Premium Asphalt Paving in Short Pump, VA | J. Worden & Sons`,
    description: `Top-tier asphalt paving for Short Pump's residential estates and commercial centers. Expert driveway and parking lot solutions managed from our Chester HQ.`,
    canonical: "https://jwordenasphaltpaving.com/locations/short-pump"
  };

  // Structured Data (JSON-LD) - Short Pump Commercial & Residential Focus
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "image": "https://jwordenasphaltpaving.com/images/short-pump-commercial-paving.jpg",
    "description": "Providing the West End and Short Pump with elite asphalt installation and repair services.",
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
      { "@type": "City", "name": "Short Pump" },
      { "@type": "Neighborhood", "name": "West End" },
      { "@type": "Neighborhood", "name": "Innsbrook" },
      { "@type": "Neighborhood", "name": "Wyndham" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/short-pump-hero.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <ShoppingBag className="h-4 w-4" />
            The West End’s Paving Authority
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            From the high-traffic commercial hubs of **Short Pump Town Center** to the 
            private estates of **Wyndham**, we deliver the West End's most durable asphalt.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              REQUEST SHORT PUMP QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Commercial & Residential Dominance Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">
              Precision Paving for the West End
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Short Pump is the fastest-growing commercial corridor in Central Virginia. 
              J. Worden & Sons specializes in high-durability parking lot installations 
              that can withstand the heavy daily traffic common in the **Innsbrook** and 
              **Short Pump** areas.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We complement our commercial strength with luxury residential paving for 
              homeowners who demand a clean, professional finish that lasts for decades.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { title: "Retail Centers", icon: <ShoppingBag className="text-orange-600" /> },
                { title: "Estate Driveways", icon: <Star className="text-orange-600" /> },
                { title: "Innsbrook Offices", icon: <Shield className="text-orange-600" /> },
                { title: "Wyndham Paving", icon: <CheckCircle className="text-orange-600" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  {item.icon}
                  <span className="font-bold text-slate-800">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl relative z-10">
              <h3 className="text-2xl font-bold mb-6">Short Pump Service Suite</h3>
              <ul className="space-y-4">
                {[
                  "Full-Scale Commercial Parking Lots",
                  "Resurfacing & Milling Specialists",
                  "Premium Hot-Mix Asphalt Installation",
                  "Bollard Installation & ADA Striping",
                  "Sealcoating for Extended Pavement Life"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle className="text-orange-500 h-6 w-6 mt-1 flex-shrink-0" />
                    <span className="text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm font-bold text-orange-400 uppercase mb-2">Service Area Coverage</p>
                <p className="text-lg font-bold">Zip Codes: 23233, 23059, 23060</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-64 w-64 bg-orange-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* HQ Synergy Footer */}
      <section className="bg-slate-50 py-16 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Operations Center</p>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Dispatched Daily from Chester HQ</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Our West End and Short Pump crews are dispatched from our central hub at 
            **{hqAddress}**, ensuring top-tier equipment 
            and quality control for every job.
          </p>
          <div className="bg-white inline-block px-8 py-4 rounded-full shadow-sm border border-slate-200">
             <p className="font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="text-orange-600" /> Serving the Entire Richmond West End
             </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShortPumpLocation;
