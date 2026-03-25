import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'J. Worden & Sons Asphalt Paving | Elite Asphalt Authority Since 1984' },
      {
        name: 'description',
        content:
          'J. Worden & Sons Asphalt Paving — 4th-generation, Virginia-based, corporate-vetted for KFC, Taco Bell, and Winn-Dixie. Call 804-446-1296 for the 6-inch compacted stone standard.',
      },
      {
        name: 'keywords',
        content:
          'J Worden Sons Asphalt Paving, elite asphalt authority, corporate vetted KFC Taco Bell Winn-Dixie, Virginia paving contractor, 6-inch compacted stone base, commercial paving Virginia',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://jwordenasphaltpaving.com/' },
      { property: 'og:title', content: 'J. Worden & Sons | Elite Asphalt Authority' },
      {
        property: 'og:description',
        content:
          'Multi-state commercial paving partner vetted by KFC, Taco Bell, and Winn-Dixie. Four generations of Virginia asphalt leadership. Call 804-446-1296.',
      },
      { property: 'og:image', content: '/og-image.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'robots', content: 'index, follow' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "J. Worden & Sons Asphalt Paving",
    "description": "Elite asphalt authority since 1984. Corporate-vetted contractor for KFC, Taco Bell, and Winn-Dixie with a 6-inch compacted stone base on every project.",
    "url": "https://jwordenasphaltpaving.com/",
    "telephone": "+1-804-446-1296",
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
    "areaServed": ["Virginia", "North Carolina", "Maryland"],
    "openingHours": "Mo-Fr 07:00-17:00",
    "sameAs": ["https://www.houzz.com/pro/jwordenandsonspaving"],
    "foundingDate": "1984",
    "slogan": "Elite Asphalt Authority"
  }

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-serif text-[#1f1f1a] bg-white leading-relaxed antialiased">
        <Header />
        <main>
          {children}
          <Outlet />
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
