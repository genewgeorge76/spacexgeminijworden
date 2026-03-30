import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award } from 'lucide-react';

const TuckahoeLocation = () => {
  const locationName = "Tuckahoe, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  // Premium SEO Data for Tuckahoe
  const seoData = {
    title: `Expert Asphalt Paving in ${locationName} | J. Worden & Sons`,
    description: `Professional residential & commercial asphalt paving in Tuckahoe, VA. Quality driveway installation and parking lot repair from our regional headquarters in Chester.`,
    canonical: "https://jwordenasphaltpaving.com/locations/tuckahoe"
  };

  // Structured Data (JSON-LD) - Signaling Tuckahoe service from Chester HQ
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "image": "https://jwordenasphaltpaving.com/images/tuckahoe-paving.jpg",
    "description": "Leading asphalt paving contractor serving the Tuckahoe community with premium driveway and commercial paving services.",
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
    "serviceArea": {
      "@type": "GeoCircle",
      "itemOffered": {
        "@type": "Service",
        "name": "Asphalt Paving"
      },
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 37.5901,
        "longitude": -77.5583
      },
      "radius": "10000"
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
        <div className="absolute inset-0 opacity-25 bg-[url('/images/tuckahoe-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Star className="h-4 w-4" />
            Premium Paving Services
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Elite Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Enhancing the beauty and value of Tuckahoe properties with precision driveway paving, 
            sealcoating, and commercial parking lot solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              FREE TUCKAHOE ESTIMATE
            </button>
            <a href="tel:18040000000" className="bg-white text-slate-900 px-10 py-4 rounded-md font-extrabold hover:bg-slate-100 transition-all border-b-4 border-slate-200">
              CALL NOW
            </a>
          </div>
        </div>
      </section>

      {/* Local Focus Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">
              Tuckahoe's Choice for Durable & Beautiful Asphalt
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              In the historic and scenic community of **Tuckahoe**, curb appeal is everything. 
              J. Worden & Sons Asphalt Paving provides specialized services tailored to the 
              unique landscapes of Henrico's premier neighborhoods.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Whether you are near the University of Richmond or the Tuckahoe Plantation, 
              our team brings over 40 years of expertise directly to your doorstep from 
              our central hub in Chester.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                "Custom Driveway Design & Installation",
                "High-Traffic Commercial Parking Solutions",
                "Professional Sealcoating & Crack Repair",
                "Sub-base Evaluation & Drainage Correction"
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="bg-orange-100 p-1 rounded-full">
                    <CheckCircle className="text-orange-600 h-5 w-5" />
                  </div>
                  <p className="font-bold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
              <Award className="h-10 w-10 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Quality First</h3>
              <p className="text-sm text-slate-500">Premium materials designed for Virginia weather.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl text-white text-center shadow-xl">
              <Truck className="h-10 w-10 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Fast Service</h3>
              <p className="text-sm text-slate-400">Quick turnaround for Tuckahoe residents.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center sm:col-span-2">
              <MapPin className="h-10 w-10 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Serving Zip Codes</h3>
              <p className="text-slate-600 font-medium">23229, 23238, 23294 & Surrounding Areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* HQ Link Section */}
      <section className="bg-slate-100 py-12 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 font-semibold uppercase tracking-widest text-sm mb-4">Our Regional Headquarters</p>
          <p className="text-slate-700 font-medium italic">
            "While we serve the entire Tuckahoe area, our central operations are based at 
            **{hqAddress}**. This allows us to maintain a large fleet and 
            pass the savings on to our customers."
          </p>
        </div>
      </section>
    </div>
  );
};

export default TuckahoeLocation;
