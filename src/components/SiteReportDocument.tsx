import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export interface SiteReportProps {
  address: string;
  city: string;
  sqft?: number;
  loadClass?: 'standard' | 'heavy';
  baseInches?: number;
  asphaltInches?: number;
  asphaltTons?: number;
  stoneTons?: number;
  estimateLow?: number;
  estimateHigh?: number;
  reportId: string;
  generatedAt: string;
}

const PVD = '#b88827';
const STEEL = '#1f1f23';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
  },
  topRail: {
    height: 3,
    backgroundColor: PVD,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: `2 solid ${PVD}`,
    paddingBottom: 12,
    marginBottom: 22,
  },
  brand: { fontSize: 22, fontWeight: 'bold', color: '#0a0a0c', letterSpacing: 1 },
  tagline: { fontSize: 9, color: '#555', marginTop: 4, letterSpacing: 1.2 },
  reportTag: {
    fontSize: 9,
    fontWeight: 'bold',
    color: PVD,
    letterSpacing: 2,
    textAlign: 'right',
  },
  reportId: { fontSize: 8, color: '#777', textAlign: 'right', marginTop: 2 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: STEEL,
    color: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 2,
  },
  bodyText: {
    fontSize: 10.5,
    lineHeight: 1.55,
    color: '#2a2a2a',
    marginBottom: 6,
  },
  addressBox: {
    padding: 12,
    border: `1 solid ${PVD}`,
    backgroundColor: '#fdf8ea',
    marginBottom: 4,
  },
  addressLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: PVD,
    letterSpacing: 1.8,
    marginBottom: 2,
  },
  addressText: { fontSize: 14, fontWeight: 'bold', color: '#1a1a1a' },
  specRow: {
    flexDirection: 'row',
    marginBottom: 4,
    fontSize: 10.5,
  },
  specKey: { width: 140, color: '#777', fontSize: 10 },
  specVal: { color: '#1a1a1a', fontWeight: 'bold', fontSize: 11 },
  mandateBanner: {
    marginTop: 14,
    marginBottom: 10,
    padding: 14,
    backgroundColor: '#0a0a0c',
    color: '#f6d97a',
    textAlign: 'center',
  },
  mandateText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#f6d97a',
    letterSpacing: 1.5,
  },
  mandateSub: { fontSize: 9, color: '#d4a844', marginTop: 4, letterSpacing: 1 },
  totalBox: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTop: `1 solid ${PVD}`,
    borderBottom: `1 solid ${PVD}`,
  },
  totalLabel: { fontSize: 11, fontWeight: 'bold', color: '#1a1a1a' },
  totalValue: { fontSize: 14, fontWeight: 'bold', color: PVD },
  footer: {
    marginTop: 22,
    borderTop: '1 solid #ccc',
    paddingTop: 10,
    fontSize: 8,
    color: '#666',
    lineHeight: 1.55,
  },
  stamp: {
    marginTop: 16,
    padding: 10,
    border: `1 dashed ${PVD}`,
    fontSize: 9,
    color: '#555',
    backgroundColor: '#fff8e7',
    lineHeight: 1.5,
  },
});

const num = (n: number | undefined) =>
  n !== undefined ? n.toLocaleString('en-US', { maximumFractionDigits: 1 }) : '—';

const money = (n: number | undefined) =>
  n !== undefined ? `$${Math.round(n).toLocaleString('en-US')}` : '—';

export default function SiteReportDocument(props: SiteReportProps) {
  const {
    address,
    city,
    sqft,
    loadClass,
    baseInches = 6,
    asphaltInches,
    asphaltTons,
    stoneTons,
    estimateLow,
    estimateHigh,
    reportId,
    generatedAt,
  } = props;

  const loadLabel = loadClass === 'heavy' ? 'Heavy Duty (Commercial / Load-Bearing)' : 'Standard Residential';

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.topRail} />

        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>J. WORDEN &amp; SONS</Text>
            <Text style={styles.tagline}>
              SOVEREIGN ASPHALT PAVING &middot; CLASS A GC &middot; EST. 1984
            </Text>
            <Text style={styles.tagline}>
              1601 WARE BOTTOM SPRINGS RD, STE 214 &middot; CHESTER, VA 23836
            </Text>
          </View>
          <View>
            <Text style={styles.reportTag}>PRELIMINARY SITE REPORT</Text>
            <Text style={styles.reportId}>REPORT ID: {reportId}</Text>
            <Text style={styles.reportId}>GENERATED: {generatedAt}</Text>
          </View>
        </View>

        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>SITE OF RECORD</Text>
          <Text style={styles.addressText}>{address}</Text>
          <Text style={{ fontSize: 10, color: '#666', marginTop: 4 }}>
            41-City Sovereign Grid &middot; Hub: {city}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>01 — EXECUTIVE SUMMARY</Text>
        <Text style={styles.bodyText}>
          J. Worden &amp; Sons has logged the site above inside our 41-city Sovereign Grid
          and routed this preliminary site report to the operating partner covering the {city} corridor.
          The specification below is a Sovereign Baseline — it assumes a full six-inch compacted
          aggregate base and hot-mix asphalt surface course engineered to the Worden Standard.
          A Sovereign Foreman will contact you to confirm field measurements, soil conditions,
          and drainage topology before a binding contract is issued.
        </Text>

        <Text style={styles.sectionTitle}>02 — SOVEREIGN BASELINE SPEC</Text>
        <View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>DRIVEWAY / LOT AREA</Text>
            <Text style={styles.specVal}>{sqft !== undefined ? `${num(sqft)} sq ft` : 'Field-measure pending'}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>LOAD REQUIREMENT</Text>
            <Text style={styles.specVal}>{loadLabel}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>STONE BASE</Text>
            <Text style={styles.specVal}>{baseInches}&quot; #57 Stone &middot; 96% Marshall Compaction</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>SURFACE COURSE</Text>
            <Text style={styles.specVal}>
              {asphaltInches ? `${asphaltInches}"` : '—'} VDOT SM-9.5A Hot Mix Asphalt
            </Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>STONE TONNAGE</Text>
            <Text style={styles.specVal}>{num(stoneTons)} tons</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>HMA TONNAGE</Text>
            <Text style={styles.specVal}>{num(asphaltTons)} tons</Text>
          </View>
        </View>

        <View style={styles.mandateBanner}>
          <Text style={styles.mandateText}>
            THE J. WORDEN STANDARD &middot; SIX INCHES OF STONE, NO SUBSTITUTIONS.
          </Text>
          <Text style={styles.mandateSub}>
            Signed guarantee of record &middot; 96% Marshall &middot; 50-year structural design life
          </Text>
        </View>

        <Text style={styles.sectionTitle}>03 — PRELIMINARY INVESTMENT RANGE</Text>
        <Text style={styles.bodyText}>
          The range below covers full site preparation, delivery of aggregate, paver-laid HMA,
          hand-tamped edges, and final rolling to specification. Excludes concrete aprons,
          structural drainage rework, and subgrade remediation, which are priced after the
          Sovereign Foreman&rsquo;s on-site walk.
        </Text>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>ESTIMATED INVESTMENT RANGE</Text>
          <Text style={styles.totalValue}>
            {estimateLow !== undefined && estimateHigh !== undefined
              ? `${money(estimateLow)} — ${money(estimateHigh)}`
              : 'Pending field-walk'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>04 — NEXT ACTIONS</Text>
        <Text style={styles.bodyText}>
          1. Confirm this report via return call or email. 2. A Sovereign Foreman will field-walk
          the site within one business day. 3. Binding proposal and Stripe-secured schedule lock
          are issued after the walk. 4. Mobilization windows inside the 41-city grid are
          typically {'<'} 14 days from contract signature.
        </Text>

        <View style={styles.stamp}>
          <Text>
            This preliminary site report is generated by the Sovereign Dispatcher from the
            jwordenasphaltpaving.com board-room channel. It is not a binding contract and does
            not constitute a firm price. All figures are subject to field verification by a
            J. Worden &amp; Sons-licensed foreman operating under VDOT §315 and AASHTO T180.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            J. Worden &amp; Sons Paving, L.L.C. &middot; Virginia Class A Contractor &middot; Direct
            line: (804) 446-1296
          </Text>
          <Text>
            Coastal track: VA &middot; MD &middot; NC &middot; SC &middot; GA &middot;
            jwordenasphaltpaving.com
          </Text>
        </View>
      </Page>
    </Document>
  );
}
