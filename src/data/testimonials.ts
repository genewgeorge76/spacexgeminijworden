export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
  projectType: string;
  date: string;
  source?: string;
}

// Real verified reviews from Houzz.com — publicly visible, linked profiles
export const testimonials: Testimonial[] = [
  {
    name: "Jaclyn F.",
    city: "Chester, VA",
    rating: 5,
    text: "We had a major drainage issue in a brand new pea gravel driveway — a pond and sometimes an ice skating rink on one side. I called every reference and we drove by the addresses; all of his customers were happy with his work. In 4 days the driveway was done. It's beautiful, it drains perfectly, and Gene's communication and his team's professionalism were excellent. They truly care about their work.",
    projectType: "Driveway Paving & Drainage",
    date: "2016-06-23",
    source: "Houzz",
  },
  {
    name: "Greg O.",
    city: "Virginia",
    rating: 5,
    text: "They paved our driveway 18 months ago with paver entries. Did a fabulous job. We ran into drainage issues, not their fault — they were great at fixing them and everything went as agreed. I would recommend them to everyone.",
    projectType: "Driveway with Paver Entries",
    date: "2022-04-19",
    source: "Houzz",
  },
  {
    name: "Daryll H.",
    city: "Virginia",
    rating: 5,
    text: "J. Worden & Sons did a great job on our new driveway. Gene was friendly, courteous and provided excellent customer service. His crew even went above and beyond by moving and staging a supply of wood materials we had temporarily stored on our old driveway.",
    projectType: "Residential Driveway",
    date: "2015-03-30",
    source: "Houzz",
  },
  {
    name: "Susan A.",
    city: "Virginia",
    rating: 5,
    text: "We hired J. Worden & Sons to repair and repave our large asphalt driveway. Gene's many years of experience in this family owned business, fair price, and great finished projects in our neighborhood led us to contract with him. Friendly, professional and efficient crew with all the best machinery. We are very happy with the result.",
    projectType: "Driveway Repair & Repave",
    date: "2013-11-09",
    source: "Houzz",
  },
];
