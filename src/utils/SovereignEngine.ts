export const WORDEN_MINIMUM = {
  ASPHALT_DENSITY: 148,
  STONE_BASE_DEPTH: 6,
  MARSHALL_SURCHARGE: 14.0,
  ENERGY_FEE: 85.0,
  SUNDAY_PREMIUM: 1.15,
};

export function generateSovereignBid(
  sqFt: number,
  depth: number = 2,
  isSunday: boolean = false
) {
  const tons =
    ((sqFt * (depth / 12) * WORDEN_MINIMUM.ASPHALT_DENSITY) / 2000) * 1.05;
  const multiplier = isSunday ? WORDEN_MINIMUM.SUNDAY_PREMIUM : 1;
  const mob = isSunday
    ? WORDEN_MINIMUM.ENERGY_FEE * 2
    : WORDEN_MINIMUM.ENERGY_FEE;

  return {
    tonnage: tons.toFixed(2),
    options: [
      {
        tier: "GOOD: Commercial Overlay",
        price: sqFt * 4.5 * multiplier + mob,
        details:
          "Milling transitions + 2-inch HMA. 35% margin floor protected.",
      },
      {
        tier: "BETTER: The Worden Minimum",
        price: sqFt * 8.25 * multiplier + mob,
        details:
          "6-Inch GAB Base + 2-inch HMA. Our signature structural standard.",
      },
      {
        tier: "BEST: 96% Marshall Medical Spec",
        price: sqFt * 11.5 * multiplier + mob,
        details:
          "Zero-downtime Sunday execution. 8-inch sub-base. Maximum density.",
      },
    ],
  };
}
