import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Building } from 'lucide-react';

const HenricoLocation = () => {
  const locationName = "Henrico, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  // Premium SEO Data for Henrico County
  const seoData = {
    title: `Top-Rated Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `Leading asphalt paving services across Henrico, VA. Specializing in residential driveways and commercial parking lots for Glen Allen, Lakeside, and the West End.`,
    canonical: "https://jwordenasphaltpaving.com/locations/henrico"
  };

  // Structured Data (JSON-LD) - County-Wide Dominance Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "image": "https://jwordenasphaltpaving.com/images/henrico-paving-project.jpg",
    "description": "Premium asphalt contractor serving Henrico County with high-durability paving and sealcoating solutions.",
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
      { "@type": "AdministrativeArea", "name": "Henrico County" },
      { "@type": "City", "name": "Glen Allen" },
      { "@type": "City", "name": "Lakeside" },
      { "@type": "City", "name": "Highland Springs" },
      { "@type": "City", "name": "Sandston" }
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
        <div className="absolute inset-0 opacity-20 bg-[url('/images/henrico-asphalt-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-orange-600/30">
            <Shield className="h-4 w-4" />
            Henrico County’s Trusted Paving Partner
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Superior Asphalt Paving in <span className="text-orange-500">{locationName}</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            From the bustling commercial roads of **Glen Allen** to the quiet residential 
            neighborhoods of **Lakeside**, we provide Henrico with world-class asphalt solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-md font-extrabold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20">
              GET A FREE HENRICO ESTIMATE
            </button>
          </div>
        </div>
      </section>

      {/* Regional Focus Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">
              Paving Every Corner of Henrico
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              As one of Virginia's most populous counties, Henrico requires a paving contractor 
              that can handle everything from small private driveways to massive industrial 
              parking lots. J. Worden & Sons has been the "go-to" name for **Henrico County** paving for decades.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We understand the local zoning requirements and drainage challenges specific to 
              the **Northside** and **East End**, ensuring your project is compliant and 
              built to last.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                "County-Wide Residential Paving",
                "Industrial & Retail Parking Lots",
                "Asphalt Resurfacing & Repair",
                "Drainage Correction & Sub-base Work"
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

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl">
             <div className="flex items-center gap-4 mb-8">
                <div className="bg-slate-900 text-white p-4 rounded-2xl">
                    <Building className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">Serving All Districts</h3>
                    <p className="text-slate-500">Brookland, Fairfield, Three Chopt, Tuckahoe, & Varina</p>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-orange-600 uppercase mb-1">Glen Allen</p>
                    <p className="text-sm font-medium text-slate-700">Commercial Focus</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-orange-600 uppercase mb-1">Lakeside</p>
                    <p className="text-sm font-medium text-slate-700">Residential Experts</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-orange-600 uppercase mb-1">Sandston</p>
                    <p className="text-sm font-medium text-slate-700">Industrial Paving</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-orange-600 uppercase mb-1">West End</p>
                    <p className="text-sm font-medium text-slate-700">Estate Driveways</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* HQ Connection Footer */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Operations Hub</p>
          <h2 className="text-2xl font-bold mb-6">Centrally Managed from Our Chester Headquarters</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            To maintain our high standard of equipment and service, all Henrico operations are 
            coordinated through our central office at:
          </p>
          <p className="text-xl font-black text-orange-500 mb-8">
            {hqAddress}
          </p>
          <div className="inline-flex items-center gap-4 text-sm font-bold border-t border-white/10 pt-8">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-orange-500" /> Henrico County</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-orange-500" /> Chesterfield County</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-orange-500" /> Richmond City</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HenricoLocation;
