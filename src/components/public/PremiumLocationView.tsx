import { useMemo } from 'react'

type MarketInfo = {
  city: string
  region: string
}

function parseMarketCookie(rawCookie: string): MarketInfo {
  const token = rawCookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('jworden_market='))

  if (!token) {
    return { city: 'Richmond', region: 'VA' }
  }

  const value = decodeURIComponent(token.slice('jworden_market='.length))
  const [city, region] = value.split('|')

  return {
    city: city || 'Richmond',
    region: region || 'VA',
  }
}

export function PremiumLocationView() {
  const market = useMemo(() => {
    if (typeof document === 'undefined') {
      return { city: 'Richmond', region: 'VA' }
    }

    return parseMarketCookie(document.cookie)
  }, [])

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 text-white md:px-10 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a84b]">
        Market-aware delivery
      </p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
        Built for {market.city}, {market.region}
      </h1>
      <p className="max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
        This landing experience adapts with edge geolocation and surfaces the most relevant service narrative for each market.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-zinc-700 bg-zinc-900/70 p-5">
          <p className="text-sm uppercase tracking-widest text-zinc-400">Detected City</p>
          <p className="mt-2 text-2xl font-semibold">{market.city}</p>
        </div>
        <div className="rounded-md border border-zinc-700 bg-zinc-900/70 p-5">
          <p className="text-sm uppercase tracking-widest text-zinc-400">Detected Region</p>
          <p className="mt-2 text-2xl font-semibold">{market.region}</p>
        </div>
        <div className="rounded-md border border-zinc-700 bg-zinc-900/70 p-5">
          <p className="text-sm uppercase tracking-widest text-zinc-400">Edge Source</p>
          <p className="mt-2 text-2xl font-semibold">Netlify Geo</p>
        </div>
      </div>
    </section>
  )
}
