import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Truck, Shield, Star, Tractor, Home } from 'lucide-react';

const SpotsylvaniaLocation = () => {
  const locationName = "Spotsylvania, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Premium Paving Contractor in Spotsylvania, VA | J. Worden & Sons`,
    description: `Leading asphalt paving for Spotsylvania County. From long rural estate driveways to massive commercial retail lots in Massaponax and Thornburg.`,
    canonical: "https://jwordenasphaltpaving.com/locations/spotsylvania"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Spotsylvania's premier asphalt contractor for new construction, commercial parking, and luxury estates.",
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
      { "@type": "AdministrativeArea", "name": "Spotsylvania County" },
      { "@type": "Neighborhood", "name": "Massaponax" },
      { "@type": "Neighborhood", "name": "Spotsylvania Courthouse" },
      { "@type": "Neighborhood", "name": "Thornburg" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/spotsylvania-paving.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Tractor className="h-4 w-4" />
            Spotsylvania's Premier Asphalt Experts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Superior Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Delivering high-grade asphalt solutions for expanding commercial hubs in **Massaponax** and premium estate driveways across **Spotsylvania Courthouse**.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              REQUEST SPOTSYLVANIA QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Local Focus Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl">
             <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Home className="text-orange-500" /> County-Wide Coverage
             </h3>
             <ul className="space-y-4 font-medium text-slate-300">
                <li className="flex items-center gap-3"><CheckCircle className="text-orange-500 h-5 w-5" /> Long-Distance Rural
