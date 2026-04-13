export const jWordenAIGenerator = {
  headquarters: "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836",
  targetRadius: "41 Cities (Richmond, Chester, Fredericksburg, etc.)",

  // Generates 100% Google-compliant SEO pages instantly
  generateLandingPage: (city: string, sector: string) => {
    return {
      seoTitle: `J. Worden & Sons | #1 ${sector} Paving in ${city}`,
      metaDescription: `Since 1984. 4th-generation premium ${sector.toLowerCase()} asphalt paving in ${city}. 96% Marshall Density.`,
      schemaMarkup: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "J. Worden & Sons Asphalt Paving",
        address: "1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836",
        areaServed: city,
      },
      heroText: `Commanding ${city}'s ${sector} Infrastructure.`,
    };
  },
};
