/**
 * JWORDENAI: FISCAL PRESENTATION ENGINE
 * Logic: Asset Longevity vs. Recurring CapEx Expense
 *
 * Demonstrates how the Worden Standard (96% Marshall, VDOT-grade base) reduces
 * long-term depreciation and eliminates unnecessary repave cycles for portfolio clients.
 */

// ── Depreciation constants ────────────────────────────────────────────────────

/** Annual asset depreciation rate for generic/unmanaged parking lots */
const STANDARD_DEPRECIATION_RATE = 0.15;

/** Annual asset depreciation rate under the JWORDENAI maintenance standard */
const JWORDENAI_DEPRECIATION_RATE = 0.04;

/** Baseline full repave cost per site (USD) */
const REPAVE_COST_PER_SITE = 76_000;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AssetHealthResult {
  /** Annual depreciation rate applied to the asset */
  annualDepreciationRate: number;
  /** Human-readable label */
  standard: "JWORDENAI Standard" | "Generic / No Maintenance Program";
}

export interface CEOPortfolioReport {
  /** Total estimated portfolio savings vs. recurring repave cycles (USD) */
  totalPortfolioSavings: number;
  /** Per-site savings (USD) */
  savingsPerStore: number;
  /** Executive summary message */
  message: string;
}

// ── Core logic ────────────────────────────────────────────────────────────────

export const JWORDENAI_Fiscal_Logic = {
  /**
   * Returns the applicable annual depreciation rate for a paved asset.
   *
   * @param yearsSincePour  - Age of the pavement surface in years
   * @param maintenanceHistory - `true` if site is enrolled in JWORDENAI maintenance program
   */
  calculateAssetHealth: (
    yearsSincePour: number,
    maintenanceHistory: boolean
  ): AssetHealthResult => {
    // yearsSincePour is accepted for future age-curve expansion (e.g., accelerated
    // degradation after year 15 without maintenance).
    void yearsSincePour;

    if (maintenanceHistory) {
      return {
        annualDepreciationRate: JWORDENAI_DEPRECIATION_RATE,
        standard: "JWORDENAI Standard",
      };
    }

    return {
      annualDepreciationRate: STANDARD_DEPRECIATION_RATE,
      standard: "Generic / No Maintenance Program",
    };
  },

  /**
   * Generates a C-suite portfolio savings report.
   *
   * Savings are calculated as one avoided full repave cycle per site —
   * the JWORDENAI program makes the initial $76k investment a one-time event,
   * not a recurring capital expense.
   *
   * @param storeCount - Number of locations in the client's portfolio
   */
  generateCEOReport: (storeCount: number): CEOPortfolioReport => {
    const savingsPerStore = REPAVE_COST_PER_SITE; // One full repave cycle avoided per site
    const totalPortfolioSavings = storeCount * savingsPerStore;

    return {
      totalPortfolioSavings,
      savingsPerStore,
      message:
        "JWORDENAI makes the $76k investment a necessity of one, not a cycle of many.",
    };
  },
} as const;
