import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../index.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Outlet />
      </main>
      <Footer />
      
      {/* GLOBAL SEO SCHEMA */}
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
          "areaServed": "Virginia 41-City Grid",
          "description": "Premium asphalt paving and sealcoating with a 6-inch structural stone base standard."
        })
      }} />
    </>
  ),
})
