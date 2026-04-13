export class HeavyCivilEstimator {
  /**
   * CONCRETE LOGIC: Calculates Cubic Yards for QSR Drive-Thru Pads & Foundations
   * Formula: (SqFt * (DepthInches / 12)) / 27 = Cubic Yards
   */
  static calculateConcrete(sqFt: number, depthInches: number = 6): { cubicYards: number, cost: number, spec: string } {
    const cubicYards = Math.ceil((sqFt * (depthInches / 12)) / 27);
    const pricePerYardFinished = 850; // Premium 4000 PSI, steel-reinforced, poured & finished

    return {
      cubicYards,
      cost: cubicYards * pricePerYardFinished,
      spec: '4000 PSI Steel-Reinforced High-Traffic Concrete',
    };
  }

  /**
   * EARTHWORKS LOGIC: Calculates mass grading, gravel, and dirt removal
   */
  static calculateEarthworks(sqFt: number, depthInches: number = 12): { cubicYards: number, cost: number, spec: string } {
    const cubicYards = Math.ceil((sqFt * (depthInches / 12)) / 27);
    const pricePerYardGraded = 45; // Mass excavation & VDOT 21B Stone compaction

    return {
      cubicYards,
      cost: cubicYards * pricePerYardGraded,
      spec: 'Mass Grading, Excavation & Aggregate Base Compaction',
    };
  }

  /**
   * 90-DAY QSR TOTAL ENVELOPE GENERATOR
   */
  static generateQSRBuildEstimate(siteSqFt: number) {
    const paving = siteSqFt * 0.6 * 2.5; // 60% of site is asphalt parking
    const concrete = this.calculateConcrete(siteSqFt * 0.15, 8); // 15% is 8-inch concrete drive-thru/dumpster pads
    const earthwork = this.calculateEarthworks(siteSqFt, 12); // Grading the entire site
    const hvacAndRoof = 125000; // Flat baseline for TPO roof and crane lifts

    const totalTurnkeyCost = paving + concrete.cost + earthwork.cost + hvacAndRoof;

    return {
      totalTurnkeyCost,
      breakdown: {
        pavingCost: paving,
        concreteCost: concrete.cost,
        earthworkCost: earthwork.cost,
        hvacAndRoof,
      },
    };
  }
}
