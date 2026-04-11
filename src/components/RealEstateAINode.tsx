import { useState } from 'react';
import {
  realEstateAI,
  type LeadAlert,
  type NewBuyerProfile,
  type NeighborhoodBatch,
} from '@/utils/realEstateAI';

// ─── Demo Data ────────────────────────────────────────────────────────────────

const DEMO_BUYER_PROFILES: NewBuyerProfile[] = [
  {
    zipCode: '23836',
    address: '1204 Wyndham Forest Dr, Chester, VA',
    salePrice: 680_000,
    daysSinceSale: 8,
    drivewaySqFt: 840,
  },
  {
    zipCode: '23113',
    address: '5420 Robious Crossing Dr, Richmond, VA',
    salePrice: 520_000,
    daysSinceSale: 22,
    drivewaySqFt: 640,
  },
  {
    zipCode: '23221',
    address: '904 Westover Hills Blvd, Richmond, VA',
    salePrice: 385_000,
    daysSinceSale: 45,
    drivewaySqFt: 480,
  },
];

const DEMO_ADDRESSES_BATCH = [
  '112 Creekside Ln',
  '114 Creekside Ln',
  '116 Creekside Ln',
  '118 Creekside Ln',
  '120 Creekside Ln',
];

const DEMO_DISTRESSED = [
  {
    address: '3312 Hull Street Rd, Richmond, VA',
    zipCode: '23224',
    lienAmount: 28_000,
    propertyValue: 210_000,
    stage: 'REO' as const,
  },
  {
    address: '7801 Osborne Tpke, Richmond, VA',
    zipCode: '23231',
    lienAmount: 14_500,
    propertyValue: 175_000,
    stage: 'PRE_FORECLOSURE' as const,
  },
];

const DEMO_LEASES = [
  {
    name: "Chesterfield Town Center Pad C",
    address: '11501 Midlothian Tpke, Richmond, VA',
    type: 'Retail/QSR',
    leaseExpirationMonths: 2,
    parkingLotSqFt: 18_400,
    lastPavedYears: 7,
  },
  {
    name: "Southpark Plaza Strip",
    address: '7200 Hull Street Rd, Richmond, VA',
    type: 'Strip Mall',
    leaseExpirationMonths: 5,
    parkingLotSqFt: 24_200,
    lastPavedYears: 5,
  },
];

// ─── Priority Badge ───────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: LeadAlert['priority'] }) {
  const styles: Record<LeadAlert['priority'], string> = {
    CRITICAL: 'bg-red-600 text-white',
    HIGH: 'bg-[#ffcc00] text-black',
    STANDARD: 'bg-zinc-700 text-zinc-200',
  };
  return (
    <span className={`text-xs font-black px-2 py-0.5 rounded uppercase tracking-widest ${styles[priority]}`}>
      {priority}
    </span>
  );
}

// ─── Alert Card ───────────────────────────────────────────────────────────────

function AlertCard({ alert }: { alert: LeadAlert }) {
  const borderColor =
    alert.priority === 'CRITICAL'
      ? 'border-red-600'
      : alert.priority === 'HIGH'
        ? 'border-[#ffcc00]'
        : 'border-zinc-700';

  return (
    <div className={`border-l-4 ${borderColor} bg-zinc-900 rounded-r-xl p-4 space-y-2`}>
      <div className="flex items-center gap-2 flex-wrap">
        <PriorityBadge priority={alert.priority} />
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{alert.type}</span>
        {alert.estimatedValue !== undefined && (
          <span className="ml-auto text-sm font-black text-green-400">
            ${alert.estimatedValue.toLocaleString()}
          </span>
        )}
      </div>
      <p className="text-sm text-white leading-relaxed">{alert.message}</p>
      {alert.actionRequired && (
        <p className="text-xs text-[#ffcc00] font-semibold">▶ {alert.actionRequired}</p>
      )}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black uppercase text-white tracking-tight">{title}</h2>
      </div>
      <p className="text-xs text-zinc-400 font-semibold ml-9">{sub}</p>
    </div>
  );
}

// ─── Quick Probe Panel ────────────────────────────────────────────────────────

function QuickProbePanel() {
  const [zip, setZip] = useState('23836');
  const [days, setDays] = useState('15');
  const [value, setValue] = useState('550000');
  const [result, setResult] = useState('');

  const [dom, setDom] = useState('60');
  const [keywords, setKeywords] = useState('as-is, fixer');
  const [listResult, setListResult] = useState('');

  const [address, setAddress] = useState('1401 Branders Bridge Rd, Chester, VA');
  const [healthResult, setHealthResult] = useState('');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {/* Recent Sale Check */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 space-y-3">
        <p className="text-xs font-black uppercase text-[#ffcc00] tracking-widest">Recent Sale Trigger</p>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="ZIP Code"
          className="w-full bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:border-[#ffcc00]"
        />
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Days Since Sale"
          className="w-full bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:border-[#ffcc00]"
        />
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Home Value ($)"
          className="w-full bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:border-[#ffcc00]"
        />
        <button
          onClick={() => setResult(realEstateAI.checkRecentSales(zip, Number(days), Number(value)))}
          className="w-full bg-[#ffcc00] text-black text-xs font-black uppercase py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          Run Sale Trigger
        </button>
        {result && <p className="text-xs text-white bg-zinc-800 p-3 rounded-lg leading-relaxed">{result}</p>}
      </div>

      {/* Listing Analyzer */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 space-y-3">
        <p className="text-xs font-black uppercase text-[#ffcc00] tracking-widest">Fix & Flip Radar</p>
        <input
          type="number"
          value={dom}
          onChange={(e) => setDom(e.target.value)}
          placeholder="Days on Market"
          className="w-full bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:border-[#ffcc00]"
        />
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keywords (comma-separated)"
          className="w-full bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:border-[#ffcc00]"
        />
        <button
          onClick={() =>
            setListResult(
              realEstateAI.analyzeListing(
                Number(dom),
                keywords.split(',').map((k) => k.trim()),
              ),
            )
          }
          className="w-full bg-[#ffcc00] text-black text-xs font-black uppercase py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          Analyze Listing
        </button>
        {listResult && <p className="text-xs text-white bg-zinc-800 p-3 rounded-lg leading-relaxed">{listResult}</p>}
      </div>

      {/* Pavement Health Scorer */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 space-y-3">
        <p className="text-xs font-black uppercase text-[#ffcc00] tracking-widest">Pavement Health Scorer</p>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Property Address"
          className="w-full bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:border-[#ffcc00]"
        />
        <button
          onClick={() => setHealthResult(realEstateAI.scorePavementHealth(address))}
          className="w-full bg-[#ffcc00] text-black text-xs font-black uppercase py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          Score Pavement
        </button>
        {healthResult && (
          <p
            className={`text-xs p-3 rounded-lg leading-relaxed ${healthResult.startsWith('CRITICAL') ? 'text-red-400 bg-red-900/20' : 'text-green-400 bg-green-900/20'}`}
          >
            {healthResult}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RealEstateAINode() {
  const [buyerLeads] = useState<LeadAlert[]>(() =>
    realEstateAI.generateNewBuyerLeads(DEMO_BUYER_PROFILES),
  );

  const [batchResult] = useState<NeighborhoodBatch | null>(() =>
    realEstateAI.optimizeNeighborhoodBatch('23836', DEMO_ADDRESSES_BATCH, 700),
  );

  const [distressedAlerts] = useState<LeadAlert[]>(() =>
    realEstateAI.scanDistressedProperties(DEMO_DISTRESSED),
  );

  const [leaseAlerts] = useState<LeadAlert[]>(() =>
    realEstateAI.analyzeLeaseExpirations(DEMO_LEASES),
  );

  const [adaResult, setAdaResult] = useState('');

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-black uppercase text-[#ffcc00] tracking-[0.3em] mb-2">
            JWORDENAI · Real Estate Intelligence
          </p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
            Real Estate <span className="text-[#ffcc00]">Lead Engine</span>
          </h1>
          <p className="text-zinc-400 font-semibold max-w-3xl leading-relaxed">
            Live intelligence across 9 real estate data signals — from new homebuyer triggers
            and fix-and-flip radar to commercial lease cycle monitoring. Every alert feeds
            directly into the Command Center Action Items panel and Kickserv CRM.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['New Homebuyer Trigger', 'Fix & Flip Radar', 'ADA Compliance', 'Pavement Health AI', 'Neighborhood Batch', 'Subdivision Domination', 'Distressed Properties', 'Lease Cycle Intel'].map(
              (tag) => (
                <span key={tag} className="text-[10px] font-black uppercase bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-1 rounded tracking-widest">
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Quick Probe Panel */}
        <div className="mb-12">
          <SectionHeader
            icon="🔍"
            title="Live Probe Tools"
            sub="Run real-time analysis against any address or listing data"
          />
          <QuickProbePanel />
        </div>

        {/* New Homebuyer Leads */}
        <div className="mb-12">
          <SectionHeader
            icon="🏡"
            title="New Homebuyer Triggers"
            sub="Recent deed transfers ranked by upgrade urgency and driveway value"
          />
          <div className="space-y-3">
            {buyerLeads.map((alert, i) => (
              <AlertCard key={i} alert={alert} />
            ))}
          </div>
        </div>

        {/* Neighborhood Batch Optimizer */}
        {batchResult && (
          <div className="mb-12">
            <SectionHeader
              icon="🗺️"
              title="Neighborhood Batch Optimizer"
              sub="Group nearby driveways to maximize crew efficiency and offer batch discounts"
            />
            <div className="bg-zinc-900 border border-[#ffcc00]/30 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: 'ZIP Code', value: batchResult.zipCode },
                  { label: 'Leads Batched', value: batchResult.leadCount.toString() },
                  {
                    label: 'Batch Discount',
                    value: `${batchResult.batchDiscount}%`,
                  },
                  {
                    label: 'Total Job Value',
                    value: `$${batchResult.totalEstimatedValue.toLocaleString()}`,
                  },
                ].map((m) => (
                  <div key={m.label} className="bg-zinc-800 rounded-lg p-3">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">{m.label}</p>
                    <p className="text-lg font-black text-[#ffcc00] mt-1">{m.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-400 font-semibold mb-2">ADDRESSES IN BATCH:</p>
              <ul className="space-y-1">
                {batchResult.addresses.map((addr) => (
                  <li key={addr} className="text-sm text-white flex items-center gap-2">
                    <span className="text-[#ffcc00]">▸</span> {addr}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#ffcc00] font-black">
                ▶ Recommended crew size: {batchResult.recommendedCrewSize} operators. Deploy one day — maximize daily tonnage.
              </p>
            </div>
          </div>
        )}

        {/* Commercial Lease Cycle */}
        <div className="mb-12">
          <SectionHeader
            icon="🏢"
            title="Commercial Lease Cycle Intelligence"
            sub="Expiring leases trigger ADA restripe + sealcoat alerts before new tenants open"
          />
          <div className="space-y-3">
            {leaseAlerts.map((alert, i) => (
              <AlertCard key={i} alert={alert} />
            ))}
          </div>
          {/* ADA Quick-Check */}
          <div className="mt-4 bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 space-y-2">
              <p className="text-xs font-black uppercase text-[#ffcc00] tracking-widest">ADA Tenant Turnover Quick-Check</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() =>
                    setAdaResult(realEstateAI.monitorCommercialLeases('Retail/QSR', true))
                  }
                  className="bg-[#ffcc00] text-black text-xs font-black uppercase px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
                >
                  New QSR Tenant
                </button>
                <button
                  onClick={() =>
                    setAdaResult(realEstateAI.monitorCommercialLeases('Office', false))
                  }
                  className="bg-zinc-700 text-white text-xs font-black uppercase px-4 py-2 rounded-lg hover:bg-zinc-600 transition"
                >
                  No New Tenant
                </button>
              </div>
            </div>
            {adaResult && (
              <p className={`text-xs p-3 rounded-lg flex-1 leading-relaxed ${adaResult.startsWith('COMPLIANCE') ? 'text-[#ffcc00] bg-yellow-900/20 border border-[#ffcc00]/30' : 'text-zinc-400 bg-zinc-800'}`}>
                {adaResult}
              </p>
            )}
          </div>
        </div>

        {/* Distressed Properties */}
        <div className="mb-12">
          <SectionHeader
            icon="⚠️"
            title="Distressed Property Radar"
            sub="Pre-foreclosure, REO, and short-sale properties needing fast curb-appeal packages"
          />
          <div className="space-y-3">
            {distressedAlerts.map((alert, i) => (
              <AlertCard key={i} alert={alert} />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-zinc-800 pt-8 text-center">
          <p className="text-xs text-zinc-500 font-semibold">
            JWORDENAI Real Estate Intelligence · J. Worden & Sons Paving & General Contracting
            · Chester, VA · Est. 1984 · Virginia Class A Contractor
          </p>
          <p className="text-[10px] text-zinc-600 mt-1">
            All lead scoring and pavement health scores are AI-generated estimates. Verify with
            field inspection before submitting bids.
          </p>
        </div>
      </div>
    </div>
  );
}
