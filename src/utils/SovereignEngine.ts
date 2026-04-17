export const calculateSovereignBid = (sqFt: number, depth: number = 2, isSunday: boolean = false) => {
  const tonnage = ((sqFt * (depth / 12) * 148) / 2000) * 1.05;
  const multiplier = isSunday ? 1.15 : 1.0;
  const mobFee = isSunday ? 170 : 85;

  return {
    tonnage: tonnage.toFixed(2),
    tiers: [
      { name: "Maintenance", price: (sqFt * 4.50 * multiplier) + mobFee },
      { name: "Worden Minimum", price: (sqFt * 8.25 * multiplier) + mobFee },
      { name: "Municipal Spec", price: (sqFt * 11.50 * multiplier) + mobFee }
    ]
  };
};
