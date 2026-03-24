export interface Product {
  id: number
  name: string
  image: string
  description: string
  shortDescription: string
  priceLabel: string
  features: string[]
}

const products: Array<Product> = [
  {
    id: 1,
    name: 'Commercial Asphalt Paving',
    image: '/placeholder.png',
    description: 'Our commercial paving service is the gold standard in Virginia. We specialize in parking lots, drive-throughs, and municipal projects. Every project starts with our signature 6-inch compacted stone structural base to ensure maximum durability under high-traffic loads.',
    shortDescription: 'Heavy-duty paving for businesses and national brands.',
    priceLabel: 'Free Quote',
    features: ['6" Compacted Stone Base', 'Vetted by National Brands', 'ADA Compliance Included', 'Multi-state Capacity']
  },
  {
    id: 2,
    name: 'Residential Driveway Installation',
    image: '/placeholder.png',
    description: 'Upgrade your home with a commercial-grade driveway. We use the same structural standards for residential projects as we do for our national commercial clients. This means your driveway will last for decades, not just years.',
    shortDescription: 'Premium asphalt driveways built to last for generations.',
    priceLabel: 'Free Quote',
    features: ['Commercial-Grade Materials', 'Precision Grading', 'Custom Drainage Solutions', 'Jewelry-Quality Finish']
  },
  {
    id: 3,
    name: 'Industrial Sealcoating',
    image: '/placeholder.png',
    description: 'Protect your investment from Virginia\'s harsh freeze-thaw cycles and UV damage. Our industrial-strength sealcoating blocks oxidation and water infiltration, effectively doubling the life of your asphalt surface.',
    shortDescription: 'Professional protection for existing asphalt surfaces.',
    priceLabel: 'Free Quote',
    features: ['Coal-Tar or Emulsion Options', 'Full Surface Prep', 'High-Visibility Striping', 'UV & Chemical Protection']
  },
]

export default products
