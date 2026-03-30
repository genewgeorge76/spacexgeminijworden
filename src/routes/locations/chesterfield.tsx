import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Home, Building2 } from 'lucide-react';

const ChesterfieldLocation = () => {
  const locationName = "Chesterfield County, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  // Premium SEO Data for Home County
  const seoData = {
    title: `Expert Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `The #1 asphalt paving choice for Chesterfield County, VA. From our Chester HQ, we provide premium residential driveways and commercial paving to Midlothian, Moseley, and Bon Air.`,
    canonical: "https://jwordenasphaltpaving.com/locations/chesterfield"
  };

  // Structured Data (JSON-LD) - Home County Authority Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "image": "https://jwordenasphaltpaving.com/images/chesterfield-paving-hq.jpg",
    "description": "Chesterfield County's premier asphalt contractor, headquartered in Chester, VA. Specializing in high-end residential and commercial paving.",
    "url": "https://jwordenasphaltpaving.com",
    "telephone": "+18040000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1601 Ware Bottom Springs Rd, Suite 214",
      "addressLocality": "Chester",
      "addressRegion": "VA",
      "postalCode": "23836"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.3370,
      "longitude": -77.4095
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Chesterfield County" },
      { "@type": "City", "name": "Chester" },
      { "@type": "City", "name": "Midlothian" },
      { "@type": "City", "name": "Moseley" },
      { "@type": "City", "name": "Bon Air" },
      { "@type": "City", "name": "Enon" },
      { "@type": "City", "name": "Ettrick" }
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
      <section className="relative bg-slate-900 text-white py-28 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-25 bg-[url('/images/chesterfield-paving-texture.jpg')] bg-cover"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-1.5 rounded-full text-sm font-black mb-8 tracking-widest uppercase shadow-lg shadow-orange-600/30">
            <MapPin className="h-4 w-4" />
            Home County Authority
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            Paving <span className="text-orange-500">Chesterfield</span> <br />With Excellence
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Headquartered in the heart of Chester, we are the first choice for 
            Chesterfield County homeowners and businesses seeking premium asphalt 
            installations and long-term durability.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-5 rounded-md font-black text-lg transition-all transform hover:scale-105 shadow-2xl shadow-orange-600/40">
              FREE CHESTERFIELD ESTIMATE
            </button>
          </div>
        </div>
      </section>

      {/* Chesterfield Dominance Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 rounded-3xl border-b-4 border-orange-600">
                <Star className="text-orange-600 h-10 w-10 mb-4" />
                <h4 className="font-bold text-xl mb-2">Local Heritage</h4>
                <p className="text-sm text-slate-500">Decades of serving our neighbors in Chesterfield.</p>
              </div>
              <div className="p-8 bg-slate-900 text-white rounded-3xl">
                <Shield className="text-orange-500 h-10 w-10 mb-4" />
                <h4 className="font-bold text-xl mb-2">Full Compliance</h4>
                <p className="text-sm text-slate-400">Strict adherence to county zoning and HOA standards.</p>
              </div>
              <div className="p-8 bg-slate-900 text-white rounded-3xl">
                <Truck className="text-orange-500 h-10 w-10 mb-4" />
                <h4 className="font-bold text-xl mb-2">Rapid Fleet</h4>
                <p className="text-sm text-slate-400">Immediate dispatch from our Chester location.</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border-b-4 border-orange-600">
                <Award className="text-orange-600 h-10 w-10 mb-4" />
                <h4 className="font-bold text-xl mb-2">Top Materials</h4>
                <p className="text-sm text-slate-500">Premium hot-mix asphalt for Virginia's climate.</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">
              From Midlothian to Moseley, <br />We've Got You Covered
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Chesterfield County is our home. Our headquarters at **1601 Ware Bottom Springs Rd** positions us perfectly to serve the explosive growth in **Moseley**, the established 
              neighborhoods of **Midlothian**, and the historic corridors of **Bon Air**.
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-semibold">
              We specialize in the specific soil conditions of Chesterfield, ensuring your 
              asphalt sub-base is engineered for zero failures and maximum lifespan.
            </p>
            <ul className="space-y-4">
               {[
                 "Custom Residential Driveway Design",
                 "Commercial Parking Lot Overlays",
                 "Professional Crack Sealing & Striping",
                 "Industrial Paving & Patchwork"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 font-bold text-slate-800">
                    <CheckCircle className="text-orange-600 h-5 w-5" /> {item}
                 </li>
               ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HQ Master Anchor Section */}
      <section className="bg-slate-50 py-20 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Primary Chesterfield Hub</h2>
          <p className="text-xl text-slate-700 font-bold mb-4">
            J. Worden & Sons Asphalt Paving
          </p>
          <p className="text-lg text-slate-500 mb-8">
            {hqAddress}
          </p>
          <div className="inline-flex items-center gap-6 text-slate-900 font-bold bg-white px-10 py-5 rounded-2xl shadow-sm border border-slate-100">
            <span className="flex items-center gap-2"><Clock className="text-orange-600" /> Mon - Sat: 7am - 7pm</span>
            <span className="h-4 w-px bg-slate-200"></span>
            <span className="flex items-center gap-2"><Phone className="text-orange-600" /> (804) 000-0000</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChesterfieldLocation;
