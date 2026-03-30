// Premium SEO Content for Chester HQ
const locationData = {
  title: "Paving Contractor in Chester, VA | J. Worden & Sons Asphalt Paving",
  description: "Professional asphalt paving services in Chester, VA. Our headquarters at 1601 Ware Bottom Springs Rd serves as the central hub for premium residential and commercial paving across Central Virginia.",
  canonical: "https://jwordenasphaltpaving.com/locations/chester",
  address: "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836"
};

// JSON-LD Schema (The secret sauce for #1 Rankings)
const schema = {
  "@context": "https://schema.org",
  "@type": "AsphaltPavingBusiness", // Specific type for Google
  "name": "J. Worden & Sons Asphalt Paving",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1601 Ware Bottom Springs Rd, Suite 214",
    "addressLocality": "Chester",
    "addressRegion": "VA",
    "postalCode": "23836"
  },
  "areaServed": ["Richmond", "Chesterfield", "Midlothian", "Henrico", "Petersburg", "...and 36 other cities"]
};
