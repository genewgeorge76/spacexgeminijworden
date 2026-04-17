export const SovereignEngine = {
  calculateBid: (sqFt: number, depth: number = 2, isSunday: boolean = false) => {
    const tonnage = ((sqFt * (depth / 12) * 148) / 2000) * 1.05;
    const rate = isSunday ? 1.15 : 1.0;
    return {
      tonnage: tonnage.toFixed(2),
      tiers: {
        maintenance: sqFt * 4.5 * rate + 85,
        wordenStandard: sqFt * 8.25 * rate + 125,
        sovereignMunicipal: sqFt * 11.5 * rate + 175,
      },
    };
  },

  getCompactionWindow: (
    ambientTemp: number,
    windSpeed: number,
    startTemp: number = 300
  ) => {
    const k = 0.035 + windSpeed * 0.002;
    const targetTemp = 175;
    const minutes =
      -Math.log((targetTemp - ambientTemp) / (startTemp - ambientTemp)) / k;
    return Math.round(minutes);
  },
};
