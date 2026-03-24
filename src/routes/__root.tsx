import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'J. Worden & Sons Command | 4th-Gen Infrastructure & Paving' },
      { name: 'description', content: 'J. Worden & Sons Asphalt Paving — 4th Generation Infrastructure. Virginia\'s top paving contractor serving 41 cities since 1984. Houzz Service Award winner 2024–2026. Commercial clients: KFC, Arby\'s, Taco Bell, Winn-Dixie.' },
      { name: 'keywords', content: 'asphalt paving Virginia, Worden 911, commercial asphalt contractor, J Worden Sons Command, infrastructure, paving company Chester VA, asphalt parking lot, driveway paving, commercial paving KFC Arbys Taco Bell' },
      { name: 'author', content: 'J. Worden & Sons Asphalt Paving' },
      { name: 'theme-color', content: '#ff9900' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.jworden-sons-paving.com/' },
      { property: 'og:title', content: 'J. Worden & Sons Asphalt Paving | 4th-Generation Legacy Since 1984' },
      { property: 'og:description', content: 'Family-owned asphalt paving since 1984. Houzz Service Award winner 2024–2026. Commercial contracts with KFC (The Big Chicken), Arby\'s, Taco Bell & Winn-Dixie across multiple states. Serving 41 Virginia cities with a 6-inch compacted stone structural standard.' },
      { property: 'og:image', content: 'https://www.jworden-sons-paving.com/og-image.jpg' },
      { property: 'og:site_name', content: 'J. Worden & Sons Asphalt Paving' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'J. Worden & Sons Asphalt Paving | Virginia\'s 4th-Generation Paving Legacy' },
      { name: 'twitter:description', content: 'Family-owned since 1984. Multi-state commercial paving for KFC (The Big Chicken), Arby\'s, Taco Bell & Winn-Dixie. Houzz Service Award 2024–2026. 41-city Virginia grid.' },
      { name: 'twitter:image', content: 'https://www.jworden-sons-paving.com/og-image.jpg' },
      { name: 'robots', content: 'index, follow' }
    ],
    links: [
      { rel: 'canonical', href: 'https://www.jworden-sons-paving.com/' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', href: '/favicon.ico' }
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.jworden-sons-paving.com/#business",
    "name": "J. Worden & Sons Asphalt Paving",
    "alternateName": "J. Worden and Sons Paving",
    "legalName": "J. Worden & Sons Asphalt Paving",
    "description": "A 4th-generation, family-owned asphalt paving company serving Virginia and surrounding states since 1984. Specializing in commercial and residential asphalt paving, sealcoating, and parking lot construction. Independent from all other Worden-named paving businesses in Chester.",
    "url": "https://www.jworden-sons-paving.com/",
    "logo": "https://www.jworden-sons-paving.com/logo.png",
    "image": "https://www.jworden-sons-paving.com/og-image.jpg",
    "telephone": "+1-804-446-1296",
    "email": "info@jworden-sons-paving.com",
    "foundingDate": "1984",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 49
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chester",
      "addressRegion": "VA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.3565,
      "longitude": -77.4421
    },
    "areaServed": [
      { "@type": "State", "name": "Virginia" },
      { "@type": "State", "name": "North Carolina" },
      { "@type": "State", "name": "Maryland" }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Check, Bank Transfer",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "17:00"
      }
    ],
    "sameAs": ["https://www.houzz.com/pro/jwordenandsonspaving"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Asphalt Paving Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Asphalt Paving",
            "description": "Full-depth commercial asphalt installation with 6-inch compacted stone base for maximum structural integrity. Serving restaurant chains, retail centers, and municipal contracts across 41 Virginia cities."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Driveway Paving",
            "description": "Residential asphalt driveway installation and replacement using the same compacted stone structural standard applied to commercial projects."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Parking Lot Construction & Repair",
            "description": "New parking lot construction, mill-and-overlay resurfacing, pothole repair, and ADA-compliant striping."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Asphalt Sealcoating",
            "description": "Coal-tar and asphalt-emulsion sealcoating to extend pavement life, block UV degradation, and improve appearance."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Crack Sealing & Preventive Maintenance",
            "description": "Hot-pour crack filling and preventive maintenance programs to maximize the lifespan of existing asphalt surfaces."
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "87",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.jworden-sons-paving.com/#organization",
    "name": "J. Worden & Sons Asphalt Paving",
    "url": "https://www.jworden-sons-paving.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.jworden-sons-paving.com/logo.png",
      "width": 400,
      "height": 120
    },
    "foundingDate": "1984",
    "description": "4th-generation, family-owned asphalt paving contractor established in 1984. Under 4th-generation leadership since 2015. Houzz Service Award recipient 2024, 2025, 2026. Multi-state commercial paving partner for KFC (The Big Chicken), Arby's, Taco Bell, and Winn-Dixie. Independent from all other Worden-named paving entities in Chester, VA.",
    "award": [
      "Houzz Service Award 2024",
      "Houzz Service Award 2025",
      "Houzz Service Award 2026"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.jworden-sons-paving.com/#website",
    "url": "https://www.jworden-sons-paving.com/",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Official website of J. Worden & Sons Asphalt Paving — Virginia's 4th-generation asphalt contractor.",
    "publisher": {
      "@id": "https://www.jworden-sons-paving.com/#organization"
    },
    "inLanguage": "en-US"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.jworden-sons-paving.com/"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
