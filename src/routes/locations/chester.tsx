import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock, CheckCircle, Shield, Star, Award } from 'lucide-react';

const ChesterLocation = () => {
  const locationName = "Chester, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  // Premium SEO Data
  const seoData = {
    title: `Paving Contractor in ${locationName} | J. Worden & Sons Asphalt Paving`,
    description: `Professional asphalt paving services in ${locationName}. Our headquarters at 1601 Ware Bottom Springs Rd serves as the central hub for premium residential and commercial paving across Central Virginia.`,
    canonical: "https://jwordenasphaltpaving.com/locations/chester"
  };

  // structured data for Google (JSON-LD)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "image": "https://jwordenasphaltpaving.com/images/logo.png",
    "@id": "https://jwordenasphaltpaving.com",
    "url": "https://jwordenasphaltpaving.com",
    "telephone": "+18040000000", // Replace with your actual number
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
      "latitude": 37.3557,
      "longitude": -77.4019
    },
    "areaServed": [
      { "@type": "City", "name": "Richmond" },
      { "@type": "City", "name": "Chesterfield" },
      { "@type": "City", "name": "Henrico" },
      { "@type": "City", "name": "Midlothian" },
      { "@type": "City", "name": "Petersburg" },
      { "@type": "City", "name": "Hopewell" },
      { "@type": "City", "name": "Colonial Heights" }
      // Add more of your 41 cities here
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
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Asphalt Paving Headquarters in {locationName}
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            J. Worden & Sons operates our primary headquarters right here on Ware Bottom Springs Rd. 
            We provide elite residential and commercial paving solutions for the entire Tri-Cities and Richmond area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-md font-bold transition">
              Get A Free Estimate
            </button>
            <a href="tel:18040000000" className="bg-white text-slate-900 px-8 py-3 rounded-md font-bold hover:bg-slate-100 transition">
              Call Today
            </a>
          </div>
        </div>
      </section>

      {/* HQ Specific Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Visit Our Chester Headquarters</h2>
            <p className="text-lg text-slate-600 mb-6">
              Located conveniently at **{hqAddress}**, our Chester office serves as the logistical center 
              for our fleet. Because we are local to Chester, we can offer rapid response times and 
              highly competitive pricing for all Chesterfield County projects.
            </p>
            <ul className="space-y-4">
              {[
                "Family Owned & Operated for Generations",
                "Licensed, Bonded, and Fully Insured",
                "State-of-the-Art Paving Equipment",
                "100% Satisfaction Guarantee on All Jobs"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle className="text-orange-600 h-5 w-5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-100 p-8 rounded-xl shadow-inner border border-slate-200">
            <h3 className="text-2xl font-bold mb-4">Contact Our HQ</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-orange-600 h-6 w-6 mt-1" />
                <div>
                  <p className="font-bold">Address</p>
                  <p className="text-slate-600">{hqAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-orange-600 h-6 w-6 mt-1" />
                <div>
                  <p className="font-bold">Business Hours</p>
                  <p className="text-slate-600">Mon - Sat: 7:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChesterLocation;
