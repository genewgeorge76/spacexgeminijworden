/**
 * Sovereign Dispatcher — address-aware PDF report generator.
 *
 * Given a free-form address string, detects which of the 41 Sovereign Grid
 * cities the site belongs to and pipes the spec through the Preliminary
 * Site Report PDF template. Downloads the PDF directly in the browser.
 */

import React from 'react';
import { pdf } from '@react-pdf/renderer';
import SiteReportDocument, { type SiteReportProps } from '@/components/SiteReportDocument';
import { SERVICE_AREAS_41 } from '@/constants/serviceAreas';
import {
  computeEstimatorSpec,
  type EstimatorSpec,
  type LoadClass,
} from '@/components/SovereignEstimator3D';

export interface DispatchMatch {
  /** Original address the user submitted. */
  address: string;
  /** Best-matched city from the 41-city grid, or null when no match. */
  matchedCity: string | null;
  /** Fallback region label when no city matched but the state is served. */
  region: string;
  /** True when the address sits inside the 41-city Sovereign Grid. */
  inGrid: boolean;
}

/** Detect which 41-city hub an address belongs to. Tolerant of punctuation / casing. */
export function matchAddressToGrid(address: string): DispatchMatch {
  const haystack = address.toLowerCase();
  let matchedCity: string | null = null;

  for (const city of SERVICE_AREAS_41) {
    const needle = city.toLowerCase();
    // Use word-boundary-style matching so "Richmond" doesn't hit inside "Richmonda".
    const re = new RegExp(`(^|[^a-z])${needle.replace(/\s+/g, '\\s+')}([^a-z]|$)`, 'i');
    if (re.test(haystack)) {
      matchedCity = city;
      break;
    }
  }

  const inGrid = matchedCity !== null;
  const region = matchedCity ?? (haystack.includes('va') ? 'Virginia' : 'Regional');

  return { address, matchedCity, region, inGrid };
}

export interface DispatchSpec {
  address: string;
  sqft?: number;
  loadClass?: LoadClass;
  /** Pre-computed estimator spec. When present, takes precedence over sqft/loadClass. */
  spec?: EstimatorSpec;
}

function buildReportId(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `JW-${y}${m}${day}-${suffix}`;
}

function formatGeneratedAt(): string {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Generates the Preliminary Site Report PDF and triggers a browser download.
 * Returns the resolved `DispatchMatch` so callers can annotate their UI
 * (chat bubble, estimator screen, etc.) with the matched hub.
 */
export async function dispatchPreliminaryReport(
  input: DispatchSpec,
): Promise<DispatchMatch> {
  const match = matchAddressToGrid(input.address);

  const spec: EstimatorSpec | undefined =
    input.spec ??
    (input.sqft !== undefined
      ? computeEstimatorSpec(input.sqft, input.loadClass ?? 'standard')
      : undefined);

  const props: SiteReportProps = {
    address: input.address,
    city: match.matchedCity ?? match.region,
    sqft: spec?.sqft,
    loadClass: spec?.loadClass,
    baseInches: spec?.baseInches ?? 6,
    asphaltInches: spec?.asphaltInches,
    asphaltTons: spec?.asphaltTons,
    stoneTons: spec?.stoneTons,
    estimateLow: spec?.estimateLow,
    estimateHigh: spec?.estimateHigh,
    reportId: buildReportId(),
    generatedAt: formatGeneratedAt(),
  };

  const doc = React.createElement(SiteReportDocument, props);
  const blob = await pdf(doc as unknown as Parameters<typeof pdf>[0]).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeAddr = input.address.replace(/[^a-z0-9]+/gi, '_').slice(0, 40) || 'site';
  link.download = `JWorden_Preliminary_Site_Report_${safeAddr}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  return match;
}
