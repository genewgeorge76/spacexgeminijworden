import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../index.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DispatchTicker from '../components/DispatchTicker'

export const Route = createRootRoute({
  component: () => (
    <>
      <DispatchTicker />
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Outlet />
      </main>
      <Footer />
      
      {/* GLOBAL SEO SCHEMA — PavingContractor */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "J. Worden & Sons Asphalt Paving",
          "telephone": "804-446-1296",
          "url": "https://jwordenasphaltpaving.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Richmond",
            "addressRegion": "VA",
            "postalCode": "23221",
            "addressCountry": "US"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5"
          },
          "areaServed": "Virginia 41-City Grid",
          "description": "Premium asphalt paving and sealcoating with a 6-inch structural stone base standard."
        })
      }} />

      {/* VOICE SEARCH — Speakable Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
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
        })
      }} />
    </>
  ),
})
