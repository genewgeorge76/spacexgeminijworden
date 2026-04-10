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
    name: 'Commercial & National Brand Partners',
    image: '/placeholder.png',
    description: 'Virginia\'s leading national brands trust J. Worden & Sons for high-traffic lot rebuilds. Our portfolio includes flagship KFC (The Big Chicken), Taco Bell, Wendy\'s, Food Lion, Walgreens, and Rite Aid. We manage the complex logistics of night-work, traffic control, and ADA compliance so your doors stay open and your revenue stays protected.',
    shortDescription: 'The trusted paving partner for Food Lion, Walgreens, and national fast-food brands.',
    features: [
      '6" compacted stone base for all high-traffic commercial pours',
      'Specialized night & weekend shifts for Food Lion and retail hubs',
      'ADA-compliant egress, brand-standard striping, and drainage',
      'Expertise in "Live-Site" paving—keeping drive-thrus moving',
    ],
  },
  {
    id: 2,
    name: 'Industrial Maintenance & Resurfacing',
    image: '/placeholder.png',
    description: 'Protect your investment with mill-and-fill overlays and structural patching designed for heavy delivery trucks and high-volume retail traffic. From grocery store loading docks to pharmacy drive-thrus, we provide the structural durability needed for 24/7 operations.',
    shortDescription: 'Heavy-duty resurfacing for retail, pharmacy, and grocery corridors.',
    features: [
      'Industrial-grade sealcoating and crackfill',
      'Precision milling for seamless retail storefront transitions',
      'Loading dock and heavy-equipment pad reinforcement',
      'Emergency pothole and drainage repair',
    ],
  },
  {
    id: 3,
    name: 'Residential & HOA Infrastructure',
    image: '/placeholder.png',
    description: 'We bring the same 6-inch structural stone base used for Food Lion parking lots to every residential driveway and HOA private road. No shortcuts—just commercial-grade longevity for your home or community.',
    shortDescription: 'Commercial-grade driveways and private roads with the 6-inch standard.',
    features: [
      'DOT-compliant grading and soil stabilization',
      'Precision tie-ins for residential garages and walkways',
      'HOA board-friendly staging and communication',
      'Post-install preservation and maintenance plans',
    ],
  },
]

export default services
