import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock, CheckCircle, Shield, Star, Award, hardHat, Truck } from 'lucide-react';

const ChesterLocation = () => {
  const locationName = "Chester, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  // Premium SEO Data
  const seoData = {
    title: `Paving Contractor in ${locationName} | J. Worden & Sons Asphalt Paving`,
    description: `J. Worden & Sons Asphalt Paving HQ at 1601 Ware Bottom Springs Rd, Suite 214. We provide premium residential and commercial asphalt paving services in Chester and across Central Virginia.`,
    canonical: "https://jwordenasphaltpaving.com/locations/chester"
  };

  // Structured Data for Google (JSON-LD) - 100% SEO Best Practices
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "image": "https://jwordenasphaltpaving.com/images/logo.png",
    "@id": "https://jwordenasphaltpaving.com",
    "url": "https://jwordenasphaltpaving.com",
    "telephone": "+18040000000", 
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1601 Ware Bottom Springs Rd, Suite 214",
      "addressLocality": "Chester",
      "addressRegion": "VA",
      "postalCode": "23836",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.3370,
      "longitude": -77.4095
    },
    "hasMap": "https://www.google.com/maps?cid=YOUR_CID_HERE", 
    "areaServed": [
      { "@type": "City", "name": "Chester" },
      { "@type": "City", "name": "Richmond" },
      { "@type": "City", "name": "Chesterfield" },
      { "@type": "City", "name": "Midlothian" },
      { "@type": "City", "name": "Henrico" },
      { "@type": "City", "name": "Petersburg" },
      { "@type": "City", "name": "Hopewell" },
      { "@type": "City", "name": "Colonial Heights" },
      { "@type": "City", "name": "Glen Allen" },
      { "@type": "City", "name": "Mechanicsville" }
      // This signals to Google that Chester HQ serves the entire 41-city area
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:00",
      "closes": "19:00"
    }
  };

  return (
    <div className="location-page">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/asphalt-texture.jpg')] bg-cover"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <MapPin className="h-4 w-4" />
            Main Headquarters
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Asphalt Paving Authority in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Our central headquarters at **1601 Ware Bottom Springs Rd** serves as the heart of our operations, 
            delivering elite residential and commercial paving solutions to the entire Tri-Cities and Greater Richmond region.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              REQUEST FREE QUOTE
            </button>
            <a href="tel:18040000000" className="bg-white text-slate-900 px-10 py-4 rounded-md font-extrabold hover:bg-slate-100 transition-all border-b-4 border-slate-200">
              CALL OFFICE
            </a>
          </div>
        </div>
      </section>

      {/* HQ Authority Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">
              The Chester Standard for Asphalt Excellence
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Centrally located in Suite 214 at **1601 Ware Bottom Springs Rd**, J. Worden & Sons is perfectly 
              positioned to handle the most demanding paving projects in Chester, VA. As a family-owned business 
              rooted in this community, we combine decades of local experience with the region's most 
              advanced paving equipment.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                { title: "Licensed & Insured", desc: "Full coverage for your peace of mind" },
                { title: "Modern Equipment", desc: "Latest tech for smoother finishes" },
                { title: "Local Authority", desc: "Expert knowledge of VA soil/climate" },
                { title: "Quality Guarantee", desc: "We stand behind every square foot" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="text-orange-600 h-6 w-6 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-slate-900 text-white p-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Truck className="text-orange-500" />
                Office Information
              </h3>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex items-start gap-5">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <MapPin className="text-orange-600 h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">HQ Address</p>
                  <p className="text-lg font-bold text-slate-800">{hqAddress}</p>
                  <p className="text-sm text-slate-500 mt-1">Conveniently located near I-95 & Route 1</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="text-orange-600 h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Hours of Operation</p>
                  <p className="text-lg font-bold text-slate-800">Monday – Saturday</p>
                  <p className="text-slate-600 font-medium">7:00 AM – 7:00 PM</p>
                </div>
              </div>
              
              <button className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition">
                Get Directions to HQ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChesterLocation;
