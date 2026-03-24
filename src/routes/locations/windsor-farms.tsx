import NeighborhoodPage from '@/components/NeighborhoodPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/windsor-farms')({
  head: () => ({
    meta: [
      { title: 'Windsor Farms Paving | J. Worden & Sons Asphalt Paving' },
      {
        name: 'description',
        content:
          'Paving for Windsor Farms with our six-inch compacted stone standard. Estate district focus with quiet crews and clean lines.',
      },
    ],
  }),
  component: WindsorFarmsLocation,
})

function WindsorFarmsLocation() {
  return (
    <NeighborhoodPage
      name="Windsor Farms"
      neighborhood="The Estate District"
      landmarks={['Oxford Circle', 'Sulgrave Rd', 'Charmian Rd']}
      zipCodes={['23221', '23226']}
    />
  )
}
