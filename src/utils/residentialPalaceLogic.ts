export const residentialPalace = {
  hubs: ["Fredericksburg", "Fairfax", "Arlington", "Great Falls"],
  premiumServices: [
    { type: "Obsidian Seal", multiplier: 1.5, warrantee: "5 Year Palace Guarantee" },
    { type: "Heritage Tar & Chip", multiplier: 2.0, warrantee: "Lifetime Structural Support" }
  ],
  applyGrandfatherStandard: (sqFt: number) => {
    // 96% Marshall Density Logic for Residential
    return sqFt * 1.25; // Adjusted for premium stone base
  }
};