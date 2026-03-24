import NeighborhoodPage from '@/components/NeighborhoodPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/stratford-hills')({
  head: () => ({
    meta: [
      { title: 'Stratford Hills Paving | J. Worden & Sons Asphalt Paving' },
      {
        name: 'description',
        content:
          'Stratford Hills paving around Cherokee Rd and Pony Pasture with our six-inch compacted stone standard and drainage-focused grading.',
      },
    ],
  }),
  component: StratfordHillsLocation,
})

function StratfordHillsLocation() {
  return (
    <NeighborhoodPage
      name="Stratford Hills"
      neighborhood="Cherokee Rd & Pony Pasture"
      landmarks={['Cherokee Rd', 'Pony Pasture', 'Riverside slopes']}
      zipCodes={['23225']}
    />
  )
}
