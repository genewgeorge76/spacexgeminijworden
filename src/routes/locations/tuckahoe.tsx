import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Home } from 'lucide-react';

const TuckahoeLocation = () => {
  const locationName = "Tuckahoe & Sleepy Hollow, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  const seoData = {
    title: `Premium Asphalt Paving in Tuckahoe & Sleepy Hollow | J. Worden & Sons`,
    description: `Expert residential driveway paving and commercial services in Tuckahoe and the Sleepy Hollow neighborhood. High-end asphalt solutions anchored by our Chester HQ.`,
    canonical: "https://jwordenasphaltpaving.com/locations/tuckahoe"
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Specializing in luxury residential driveways in Sleepy Hollow and Tuckahoe, VA.",
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
      { "@type": "Neighborhood", "name": "Sleepy Hollow" },
      { "@type": "Neighborhood", "name": "Mooreland Farms" },
      { "@type": "City", "name": "Tuckahoe" }
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
        <div className="absolute inset-0 opacity-25 bg-[url('/images/tuckahoe-paving-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Home className="h-4 w-4" />
            Sleepy Hollow's Preferred Paving Partner
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Paving in <span className="text-orange-500 text-nowrap">Tuckahoe & Sleepy Hollow</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            From the winding driveways of **Sleepy Hollow** to the commercial hubs of Tuckahoe, 
            we deliver the region's finest asphalt finishes with unmatched durability.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              GET A CUSTOM QUOTE
            </button>
          </div>
        </div>
      </section>

      {/* Localized Content Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">
                Luxury Residential Paving for Sleepy Hollow
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Residents in the **Sleepy Hollow** and **Mooreland Farms** areas demand a level of 
                craftsmanship that goes beyond standard paving. Our team specializes in custom-width 
                driveways, elegant transitions, and high-grade sealcoating that preserves the 
                aesthetic integrity of your estate.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Private Estate Driveways", "Decorative Asphalt Edging", "Sub-Base Fortification", "Long-Term Seal Protection"].map((item, i) => (
                  <div key={i} className="flex gap-2 items-center text-slate-800 font-bold">
                    <CheckCircle className="text-orange-600 h-5 w-5" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl border-2 border-slate-100 shadow-xl relative">
                <div className="absolute -top-4 -right-4 bg-orange-600 text-white p-3 rounded-xl rotate-12">
                    <Award className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Neighborhood Expertise</h3>
                <p className="text-slate-600 mb-6 italic">"We understand the specific drainage requirements and neighborhood standards common in the Sleepy Hollow area of Tuckahoe."</p>
                <div className="flex items-center gap-4 text-slate-900 font-bold">
                    <MapPin className="text-orange-600" /> Serving 23229 & 23238
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor Section */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Centrally Managed from Our Chester HQ</h2>
          <p className="text-slate-400 mb-8">
            All Tuckahoe and Sleepy Hollow projects are expertly managed from our primary office:
          </p>
          <p className="text-xl font-extrabold text-orange-500">
            {hqAddress}
          </p>
        </div>
      </section>
    </div>
  );
};

export default TuckahoeLocation;
