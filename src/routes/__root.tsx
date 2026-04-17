import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../index.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DispatchTicker from '../components/DispatchTicker'
import SocialTracking from '../components/SocialTracking'
import GoogleIntelligence from '../components/GoogleIntelligence'
import JarvisForeman from '../components/JarvisForeman'
import { SERVICE_AREAS_41 } from '../constants/serviceAreas'

const BUSINESS_ID = "https://jwordenasphaltpaving.com/#business";

const pavingContractorSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": BUSINESS_ID,
  "name": "J. Worden & Sons Asphalt Paving",
  "legalName": "J. Worden & Sons Paving LLC",
  "telephone": "804-446-1296",
  "url": "https://jwordenasphaltpaving.com",
  "logo": "https://jwordenasphaltpaving.com/logo.png",
  "image": "https://jwordenasphaltpaving.com/images/hero-paving.jpg",
  "description": "4th-generation municipal-grade asphalt paving contractor serving Richmond VA and 41 surrounding cities. Signature 6-inch structural stone base standard. KFC, Arby's, and Taco Bell vetted.",
  "foundingDate": "1984",
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
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "07:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "https://www.houzz.com/pro/jwordenandsonspaving/j-worden-sons-paving-l-l-c",
    "https://www.bbb.org/us/va/chester/profile/paving-contractors/j-worden-and-sons-paving-llc"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Asphalt Paving Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "6-Inch Structural Base Paving", "description": "Premium industrial-grade asphalt foundation for residential and commercial properties in Central Virginia.", "serviceType": "Paving", "areaServed": "Richmond, VA Metro" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Parking Lot Installation", "description": "Full-depth commercial asphalt parking lot installation to VDOT Section 315 specifications." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Precision Residential Driveways", "description": "Residential asphalt driveway installation with 6-inch compacted stone base." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Municipal-Grade Sealcoating", "description": "Coal-tar or asphalt emulsion sealcoating for commercial and residential surfaces." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "QSR Fast-Track Development (90-Day)", "description": "90-day turnkey paving solution for quick-service restaurant developments (KFC, Arby's, Taco Bell)." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tar & Chip / Macadam Paving", "description": "Decorative tar-and-chip (macadam) surface treatment for driveways and private roads." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Masonry & Brick Paver Installation", "description": "Cobblestone, brick paver, and natural stone apron installation on structural base." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roofing — TPO, EPDM, Modified Bitumen", "description": "Commercial and residential roofing systems including TPO, EPDM, and modified bitumen per FM Global standards." } }
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

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "J. Worden & Sons Asphalt Paving — Richmond VA",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable"]
  },
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is the best-rated paving company near me in Richmond VA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "J. Worden & Sons Asphalt Paving is the highest-rated paving company in the Richmond Virginia metro area, serving 41 cities with a 4th-generation 6-inch structural base standard. Call 804-446-1296 for a free estimate."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a driveway cost in Midlothian Virginia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A residential asphalt driveway in Midlothian Virginia typically costs between $3,500 and $12,000 depending on size and scope. J. Worden & Sons provides free on-site estimates. Contact us at 804-446-1296."
        }
      },
      {
        "@type": "Question",
        "name": "What paving company serves the Richmond Virginia area?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "J. Worden & Sons Asphalt Paving serves Richmond and 41 surrounding cities including Midlothian, Glen Allen, Chesterfield, Henrico, and more. We are 4th-generation paving specialists with a 6-inch compacted aggregate base standard."
        }
      }
    ]
  }
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": BUSINESS_ID,
  "name": "J. Worden & Sons Asphalt Paving",
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Marcus T." },
      "datePublished": "2024-11-12",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "J. Worden & Sons repaved our entire commercial parking lot in 3 days. The 6-inch structural stone base is exactly what our property needed — zero cracking after two winters. Absolutely the best paving company in the Richmond area."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Sandra L." },
      "datePublished": "2024-10-03",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Our driveway looks absolutely stunning. They completed the job ahead of schedule and the crew was incredibly professional. The Worden Standard is real — this driveway is built to last decades."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Robert H." },
      "datePublished": "2024-09-18",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Hired J. Worden & Sons for our KFC franchise lot resurfacing. They delivered on time, within budget, and the finish meets every specification."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Patricia W." },
      "datePublished": "2024-08-27",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "As a Chester resident, it was great to work with a local company with real heritage. My sealcoating job came out perfect. 4th generation really shows."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "James B." },
      "datePublished": "2024-07-14",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Called on a Monday, got an estimate on Tuesday, work started Thursday. The compaction results were verified on-site and the asphalt surface is flawless."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Diane M." },
      "datePublished": "2024-06-05",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "We've used J. Worden & Sons twice now — once for our office park and once for our storage facility. Their 96% Marshall compaction standard is not marketing — it's real engineering."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Kevin A." },
      "datePublished": "2024-05-22",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Absolutely impressed with the professionalism and quality. My 200-foot driveway was completed in one day with a perfect finish. The gold standard of Virginia paving contractors — nobody else comes close."
    }
  ]
};

const nationalCorporationSchema = {
  "@context": "https://schema.org",
  "@type": ["Corporation", "HomeAndConstructionBusiness"],
  "@id": BUSINESS_ID,
  "name": "J. Worden & Sons Asphalt Paving",
  "legalName": "J. Worden & Sons Paving LLC",
  "foundingDate": "1984",
  "founder": { "@type": "Person", "name": "Gene W. George" },
  "description": "National commercial asphalt paving contractor operating across all 50 states. 4th-generation family business powered by JWORDENAI predictive logistics. Virginia Class A Licensed. 96% Marshall compaction standard on every project.",
  "url": "https://jwordenasphaltpaving.com",
  "telephone": "804-446-1296",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1601 Ware Bottom Springs Rd",
    "addressLocality": "Chester",
    "addressRegion": "VA",
    "postalCode": "23836",
    "addressCountry": "US"
  },
  "areaServed": [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
    "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
    "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
    "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
    "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
    "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
  ],
  "knowsAbout": [
    "National Commercial Paving",
    "50-State Asphalt Infrastructure",
    "Commercial Parking Lot Paving",
    "VDOT Section 315 Compliance",
    "96% Marshall Unit Weight Compaction",
    "AI Asphalt Estimating Software"
  ]
};

const jwordenAISchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "JWORDENAI",
  "alternateName": "JWORDENAI Paving Technology",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Proprietary AI-powered predictive logistics and pricing optimization platform for national commercial asphalt paving. Developed exclusively by J. Worden & Sons Asphalt Paving. Automates bid intelligence, margin protection, crew scheduling, and 50-state compliance.",
  "author": {
    "@type": "Corporation",
    "name": "J. Worden & Sons Asphalt Paving",
    "url": "https://jwordenasphaltpaving.com"
  },
  "url": "https://jwordenasphaltpaving.com",
  "copyrightHolder": { "@type": "Person", "name": "Gene W. George" },
  "copyrightYear": "2026",
  "keywords": "AI Asphalt Estimating Software, JWORDENAI Paving Technology, predictive logistics paving, national commercial paving AI, Plaza Street Partners Paving Contractor"
};

export const Route = createRootRoute({
  component: () => (
    <>
      <GoogleIntelligence />
      <SocialTracking />
      <DispatchTicker />
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Outlet />
      </main>
      <Footer />

      <JarvisForeman />

      {/* MASTER AUTHORITY SCHEMA — PavingContractor + AggregateRating + 41-City ServiceArea */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pavingContractorSchema) }} />

      {/* FAQ SCHEMA — Targets Google Rich Results for cost/timing queries */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* VOICE SEARCH — Speakable Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      {/* REVIEW SCHEMA — Matches visible testimonials on home page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* NATIONAL CORPORATION SCHEMA — 50-State Dominance Signal */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nationalCorporationSchema) }} />

      {/* JWORDENAI SOFTWARE APPLICATION SCHEMA — Proprietary AI Technology */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jwordenAISchema) }} />
    </>
  ),
})
