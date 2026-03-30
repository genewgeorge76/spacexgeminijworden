import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Truck, Shield, Star, Award, Building2, Landmark } from 'lucide-react';

const RichmondLocation = () => {
  const locationName = "Richmond, VA";
  const hqAddress = "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836";
  
  // Premium SEO Data for the Capital City
  const seoData = {
    title: `Asphalt Paving Contractor in ${locationName} | J. Worden & Sons`,
    description: `The premier asphalt paving authority in Richmond, VA. Serving Downtown, The Fan, and the Museum District with elite residential and commercial paving solutions.`,
    canonical: "https://jwordenasphaltpaving.com/locations/richmond"
  };

  // Structured Data (JSON-LD) - Richmond Authority Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AsphaltPavingBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "image": "https://jwordenasphaltpaving.com/images/richmond-skyline-paving.jpg",
    "description": "Richmond's leading asphalt contractor for historic restoration, commercial parking lots, and luxury residential driveways.",
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
      "latitude": 37.5407,
      "longitude": -77.4360
    },
    "areaServed": [
      { "@type": "City", "name": "Richmond" },
      { "@type": "Neighborhood", "name": "Downtown Richmond" },
      { "@type": "Neighborhood", "name": "The Fan" },
      { "@type": "Neighborhood", "name": "Museum District" },
      { "@type": "Neighborhood", "name": "Church Hill" },
      { "@type": "Neighborhood", "name": "Jackson Ward" }
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

      {/* Flagship Hero Section */}
      <section className="relative bg-slate-900 text-white py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('/images/richmond-paving-hero.jpg')]
