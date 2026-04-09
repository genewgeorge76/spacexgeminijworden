import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../index.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { SERVICE_AREAS_41 } from '../constants/serviceAreas'

const pavingContractorSchema = {
  "@context": "https://schema.org",
  "@type": "PavingContractor",
  "name": "J. Worden & Sons Asphalt Paving",
  "legalName": "J. Worden & Sons Paving LLC",
  "telephone": "804-446-1296",
  "url": "https://jwordenasphaltpaving.com",
  "logo": "https://jwordenasphaltpaving.com/logo.png",
  "image": "https://jwordenasphaltpaving.com/images/hero-paving.jpg",
  "description": "4th-generation municipal-grade asphalt paving contractor serving Richmond VA and 41 surrounding cities. Signature 6-inch structural stone base standard. KFC, Arby's, and Taco Bell vetted.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1601 Ware Bottom Springs Rd",
    "addressLocality": "Chester",
    "addressRegion": "VA",
    "postalCode": "23836",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.3592,
    "longitude": -77.3986
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "areaServed": SERVICE_AREAS_41.map((city) => ({
    "@type": "City",
    "name": city,
    "containedInPlace": {
      "@type": "State",
      "name": "Virginia"
    }
  })),
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "07:00",
    "closes": "19:00"
  },
  "sameAs": [
    "https://www.houzz.com/pro/jwordenandsonspaving/j-worden-sons-paving-l-l-c",
    "https://www.bbb.org/us/va/chester/profile/paving-contractors/j-worden-and-sons-paving-llc"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Asphalt Paving Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "6-Inch Structural Base Paving", "description": "Premium industrial-grade asphalt foundation for residential and commercial properties in Central Virginia.", "serviceType": "Paving", "areaServed": "Richmond, VA Metro" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Parking Lot Installation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Precision Residential Driveways" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Municipal-Grade Sealcoating" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "QSR Fast-Track Development (90-Day)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tar & Chip / Macadam Paving" } }
    ]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does asphalt driveway paving cost in Virginia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Asphalt driveway paving in Virginia typically costs $3.50–$7.00 per square foot. J. Worden & Sons includes a standard 6-inch structural stone base in every installation to ensure longevity and prevent cracking."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best time for asphalt paving in Richmond VA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paving season in Central Virginia typically runs from April through November when ground temperatures are consistently above 50°F for proper asphalt compaction."
      }
    },
    {
      "@type": "Question",
      "name": "What is a 6-inch structural stone base and why does it matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 6-inch compacted aggregate base is a foundational layer installed beneath the asphalt surface. It provides load-bearing capacity, superior water drainage, and prevents frost-heave. J. Worden & Sons treats this as the 'Worden Minimum'—it's required on every project, not an optional upgrade."
      }
    },
    {
      "@type": "Question",
      "name": "Is J. Worden & Sons licensed and insured in Virginia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. J. Worden & Sons holds a Class A Virginia Contractor's License, is BBB Accredited with an A+ rating since 1994, and carries full liability and workers' compensation insurance. We use 0% sub-contracted labor—all work is performed by our own crews."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can J. Worden & Sons complete a commercial paving project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We operate on a professional developer schedule. Our QSR Fast-Track program delivers commercial paving projects from raw land to striped asphalt in 90 days. We have served KFC, Arby's, Taco Bell, and Winn-Dixie on this timeline."
      }
    }
  ]
};

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Outlet />
      </main>
      <Footer />

      {/* MASTER AUTHORITY SCHEMA — PavingContractor + AggregateRating + 41-City ServiceArea */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pavingContractorSchema) }} />

      {/* FAQ SCHEMA — Targets Google Rich Results for cost/timing queries */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  ),
})
