export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
  projectType: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marcus T.",
    city: "Midlothian, VA",
    rating: 5,
    text: "J. Worden & Sons repaved our entire commercial parking lot in 3 days. The 6-inch structural stone base is exactly what our property needed — zero cracking after two winters. Absolutely the best paving company in the Richmond area.",
    projectType: "Commercial Parking Lot",
    date: "2024-11-12",
  },
  {
    name: "Sandra L.",
    city: "Chesterfield, VA",
    rating: 5,
    text: "Our driveway looks absolutely stunning. They completed the job ahead of schedule and the crew was incredibly professional. The Worden Standard is real — this driveway is built to last decades. I've already referred two neighbors.",
    projectType: "Residential Driveway",
    date: "2024-10-03",
  },
  {
    name: "Robert H.",
    city: "Glen Allen, VA",
    rating: 5,
    text: "Hired J. Worden & Sons for our KFC franchise lot resurfacing. They delivered on time, within budget, and the finish meets every specification. The crew worked nights to avoid business disruption. Exceptional contractor.",
    projectType: "QSR Commercial Paving",
    date: "2024-09-18",
  },
  {
    name: "Patricia W.",
    city: "Chester, VA",
    rating: 5,
    text: "As a Chester resident, it was great to work with a local company with real heritage. My sealcoating job came out perfect. They cleaned up completely and the crew was respectful of my property. 4th generation really shows.",
    projectType: "Sealcoating",
    date: "2024-08-27",
  },
  {
    name: "James B.",
    city: "Mechanicsville, VA",
    rating: 5,
    text: "Called on a Monday, got an estimate on Tuesday, work started Thursday. The compaction results were verified on-site and the asphalt surface is flawless. Best decision I made for my industrial facility's access road.",
    projectType: "Industrial Access Road",
    date: "2024-07-14",
  },
  {
    name: "Diane M.",
    city: "Richmond, VA",
    rating: 5,
    text: "We've used J. Worden & Sons twice now — once for our office park and once for our storage facility. Both projects were executed with military precision. Their 96% Marshall compaction standard is not marketing — it's real engineering.",
    projectType: "Office Park Parking Lot",
    date: "2024-06-05",
  },
  {
    name: "Kevin A.",
    city: "Powhatan, VA",
    rating: 5,
    text: "Absolutely impressed with the professionalism and quality. My 200-foot driveway was completed in one day with a perfect finish. The gold standard of Virginia paving contractors — nobody else comes close.",
    projectType: "Residential Driveway",
    date: "2024-05-22",
  },
];
