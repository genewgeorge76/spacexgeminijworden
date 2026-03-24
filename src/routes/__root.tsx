import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'J. Worden & Sons Asphalt Paving | 4th-Gen Legacy Since 1984 | Virginia' },
      { name: 'description', content: 'J. Worden & Sons Asphalt Paving — a 4th-generation, family-owned asphalt contractor serving Virginia since 1984. 4-time Best of Houzz winner. Commercial partner for KFC, Arby\'s, and Taco Bell.' },
      { name: 'keywords', content: 'asphalt paving Virginia, commercial asphalt contractor, J Worden Sons, paving company Chester VA, asphalt parking lot, driveway paving, commercial paving KFC Arbys Taco Bell' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'J. Worden & Sons Asphalt Paving | 4th-Gen Legacy Since 1984' },
      { property: 'og:description', content: 'Family-owned asphalt paving since 1984. 4-time Best of Houzz winner. Commercial contracts with KFC, Arby\'s & Taco Bell.' },
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
    "description": "A 4th-generation, family-owned asphalt paving company serving Virginia since 1984. Specializing in commercial and residential asphalt paving.",
    "url": "https://www.jworden-sons-paving.com/",
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
    "sameAs": ["https://www.houzz.com/pro/jwordenandsonspaving"]
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-serif text-[#2b2b2b] bg-white leading-relaxed antialiased">
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
