import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'J. Worden & Sons Command | 4th-Gen Infrastructure & Paving',
      },
      {
        name: 'description',
        content: '4th Generation Infrastructure & Real-Time Lead Dispatch. Award-winning paving legacy vetted by KFC and national subdivisions.',
      },
      {
        name: 'theme-color',
        content: '#ff9900',
      }
    ],
    links: [
      {
        rel: 'manifest',
        href: '/manifest.json'
      },
      {
        rel: 'apple-touch-icon',
        href: '/logo-192.png'
      }
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "PavingContractor",
    "name": "J. Worden & Sons Asphalt Paving",
    "url": "https://www.jwordenasphaltpaving.com",
    "sameAs": ["https://www.houzz.com/pro/jwordenandsonspaving"],
    "description": "Award-winning 4th-generation paving legacy. Independent from all other Worden entities. Vetted by KFC and national subdivisions.",
    "telephone": "+1-804-446-1296",
    "award": ["4-Time Best of Houzz Service", "Top Contractor Award"]
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
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
