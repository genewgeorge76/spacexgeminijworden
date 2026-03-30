import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, hardHat } from 'lucide-react';

const MidlothianLocation = () => {
  const locationName = "Midlothian, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  // Premium SEO Data for Midlothian
  const seoData = {
    title: `Top-Rated Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `Professional asphalt paving and sealcoating in Midlothian, VA. Serving Brandermill, Woodlake, and Salisbury with premium residential and commercial solutions.`,
    canonical: "https://jwordenasphaltpaving.com/locations/midlothian"
  };

  // Structured Data (JSON-LD) - Targeting Midlothian from Chester HQ
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "image": "https://jwordenasphaltpaving.com/images/midlothian-paving.jpg",
    "description": "Leading asphalt contractor for Midlothian's premier residential communities and commercial centers.",
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
      { "@type": "City", "name": "Midlothian" },
      { "@type": "Neighborhood", "name": "Brandermill" },
      { "@type": "Neighborhood", "name": "Woodlake" },
      { "@type": "Neighborhood", "name": "Salisbury" },
      { "@type": "Neighborhood", "name": "Charter Colony" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/midlothian-driveway.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Shield className="h-4 w-4" />
            Midlothian's Trusted Paving Experts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Premium Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Delivering durable, high-aesthetic asphalt solutions to Midlothian’s finest 
            neighborhoods and commercial corridors for over 40 years.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE ESTIMATE
            </button>
            <a href="tel:18040000000" className="bg-white text-slate-900 px-10 py-4 rounded-md font-extrabold hover:bg-slate-100 transition-all border-b-4 border-slate-200">
              CALL THE OFFICE
            </a>
          </div>
        </div>
      </section>

      {/* Neighborhood Authority Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Truck className="text-orange-600" />
                Specialized Midlothian Services
              </h3>
              <ul className="space-y-4">
                {[
                  "HOA-Compliant Driveway Resurfacing",
                  "Commercial Parking Lot Maintenance",
                  "Precision Sealcoating & Striping",
                  "New Construction Excavation & Paving"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                    <CheckCircle className="text-orange-600 h-5 w-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <hr className="my-8 border-slate-200" />
              <div className="flex items-center gap-4">
                <div className="bg-orange-600 text-white p-3 rounded-lg">
                  <Star className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 underline">Serving Zip Codes:</p>
                  <p className="text-slate-600">23112, 23113, 23114</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">
              Paving the Communities of Chesterfield County
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Midlothian residents know that a well-maintained driveway is a point of pride. 
              From the historic streets of **Salisbury** to the waterfront properties in 
              **Woodlake** and **Brandermill**, J. Worden & Sons provides the precision 
              and care required for luxury residential paving.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our crews are dispatched daily from our central **Chester headquarters**, 
              meaning we are always just minutes away from your Midlothian project.
            </p>
          </div>
        </div>
      </section>

      {/* HQ Footer Anchor */}
      <section className="bg-slate-900 text-white py-12 px-4 border-t-4 border-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 font-bold uppercase tracking-tighter mb-2">Regional Hub</p>
          <h2 className="text-2xl font-bold mb-4 italic text-white">"Centralized Quality, Local Service"</h2>
          <p className="text-lg">
            Managed from our main office at: <br />
            <span className="text-orange-500 font-bold">{hqAddress}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default MidlothianLocation;
