export interface Service {
  id: number
  name: string
  image: string
  description: string
  shortDescription: string
  features: string[]
}

const services: Array<Service> = [
  {
    id: 1,
    name: 'Restaurant Lot Rebuilds',
    image: '/placeholder.png',
    description:
      'Flagship KFC (The Big Chicken), Taco Bell, and Winn-Dixie partners rely on us for heavy-duty, night-and-weekend lot rebuilds. We manage traffic control, drainage, ADA compliance, and post-pour striping so drive-thru lanes stay profitable.',
    shortDescription:
      'Drive-thru and grocery lots rebuilt to national brand standards.',
    features: [
      '6" compacted stone base for every commercial pour',
      'Night work with traffic control to protect revenue',
      'Brand-standard striping, ADA, and egress planning',
      'Multi-site scheduling across Virginia\'s 41-city grid',
    ],
  },
  {
    id: 2,
    name: 'Commercial Maintenance & Resurfacing',
    image: '/placeholder.png',
    description:
      'Extend the life of existing parking lots with mill-and-fill overlays, sealcoating, and structural patching. Our crews stage work to keep storefronts, warehouses, and campuses open while we work.',
    shortDescription:
      'Structural overlays, sealcoating, and ADA upgrades without downtime.',
    features: [
      'Phased phasing plans to keep stores open',
      'Industrial sealcoating and crackfill',
      'Line striping and ADA remediation included',
      'Moisture mitigation and drainage tuning',
    ],
  },
  {
    id: 3,
    name: 'Residential & HOA Pavement',
    image: '/placeholder.png',
    description:
      'Residential driveways, private roads, and HOA communities built with the same 6-inch base we use on commercial lots. Clean edges, smooth transitions, and neighbor-friendly scheduling.',
    shortDescription:
      'Commercial-grade driveways and private roads with HOA-friendly staging.',
    features: [
      'Commercial-grade compaction and grading',
      'Seamless tie-ins to garages and walks',
      'HOA board-friendly scheduling and communication',
      'Post-install seal and stripe options',
    ],
  },
]

export default services
