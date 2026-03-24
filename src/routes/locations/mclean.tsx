import NeighborhoodPage from '@/components/NeighborhoodPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/mclean')({
  head: () => ({
    meta: [
      { title: 'McLean Residential Paving | J. Worden & Sons Asphalt Paving' },
      {
        name: 'description',
        content:
          'Estate-grade paving for McLean including Ballantrae and Salona Village. Six-inch compacted stone standard with quiet crews and clean tie-ins.',
      },
    ],
  }),
  component: McLeanLocation,
})

function McLeanLocation() {
  return (
    <NeighborhoodPage
      name="McLean"
      neighborhood="Ballantrae & Salona Village"
      landmarks={['Ballantrae', 'Salona Village', 'Chain Bridge Rd approaches']}
      zipCodes={['22101', '22102']}
    />
  )
}
