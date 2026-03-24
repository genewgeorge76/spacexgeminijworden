import NeighborhoodPage from '@/components/NeighborhoodPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/westham-parkway')({
  head: () => ({
    meta: [
      { title: 'Westham Parkway Paving | J. Worden & Sons Asphalt Paving' },
      {
        name: 'description',
        content:
          'Westham Parkway paving near the University of Richmond with a six-inch compacted stone standard and quiet residential crews.',
      },
    ],
  }),
  component: WesthamLocation,
})

function WesthamLocation() {
  return (
    <NeighborhoodPage
      name="Westham Parkway"
      neighborhood="University of Richmond District"
      landmarks={['University of Richmond', 'River Rd approaches', 'Two Tabbassi Station']}
      zipCodes={['23226', '23229']}
    />
  )
}
