import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { MrWordenPersona3D, MrsWordenPersona3D } from '@/components/WordenPersona3D';
import GeneGeorgeSignature from '@/components/GeneGeorgeSignature';
import SovereignEstimator3D, {
  type EstimatorSpec,
} from '@/components/SovereignEstimator3D';
import TactileButton from '@/components/TactileButton';
import {
  dispatchPreliminaryReport,
  matchAddressToGrid,
  type DispatchMatch,
} from '@/lib/sovereignDispatcher';

export const Route = createFileRoute('/')({
  component: SovereignPowerhouse,
});

const PVD_GOLD = '#F6D97A';
const PVD_GOLD_CORE = '#D4A844';
const PVD_GOLD_DEEP = '#8C6A1F';
const IVORY = '#f6f6f4';
const STEEL_MID = '#8a8a8a';

const PVD_GRADIENT = `linear-gradient(135deg, ${PVD_GOLD} 0%, ${PVD_GOLD_CORE} 45%, ${PVD_GOLD_DEEP} 100%)`;
const STEEL_GRADIENT = 'linear-gradient(160deg, #2a2d33 0%, #14161a 55%, #05060a 100%)';

const GLASS_CARD: CSSProperties = {
  background:
    'linear-gradient(155deg, rgba(40,40,46,0.55) 0%, rgba(18,18,22,0.55) 55%, rgba(6,6,10,0.7) 100%)',
  backdropFilter: 'blur(22px) saturate(130%)',
  WebkitBackdropFilter: 'blur(22px) saturate(130%)',
  border: '1px solid rgba(210,180,110,0.22)',
  boxShadow:
    '0 30px 80px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(246,217,122,0.08)',
};

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf = 0;
    const calc = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = 1 - Math.max(0, Math.min(1, rect.top / vh));
      setP(raw);
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        calc();
      });
    };
    calc();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

const SOVEREIGN_TILES = [
  {
    tag: 'LANE 01',
    title: 'COMMERCIAL ASPHALT',
    body: 'QSR rollouts. Franchise parking fields. Industrial park overlays. Six-inch mandate, federal spec.',
    meta: 'VDOT §315 · AASHTO T180 · Marshall 96%',
    kpi: '100+',
    kpiLabel: 'FRANCHISE ASSETS',
    to: '/commercial',
  },
  {
    tag: 'LANE 02',
    title: 'ESTATE & RESIDENTIAL',
    body: 'Windsor Farms. Tuckahoe. Museum District. Hand-tamped edges, brick inlay, zero roller marks.',
    meta: 'Four-generation craft · White-glove PM',
    kpi: '4x',
    kpiLabel: 'BEST OF HOUZZ',
    to: '/residential',
  },
  {
    tag: 'LANE 03',
    title: 'SEAL & RESTORATION',
    body: 'Historic Dinwiddie restorations. ASTM D2939 sealcoat. 20-year recoat warranty on every pass.',
    meta: 'ASTM D2939 · VHS Recognized',
    kpi: '50yr',
    kpiLabel: 'DESIGN LIFE',
    to: '/sealcoating',
  },
  {
    tag: 'LANE 04',
    title: 'GENERAL CONTRACTING',
    body: 'Class A GC. Full CSI Div 01–33. Masonry, concrete, structural civil. Self-performing.',
    meta: 'Class A GC · Div 01–33',
    kpi: '50',
    kpiLabel: 'STATES ACTIVE',
    to: '/gc-bid',
  },
  {
    tag: 'LANE 05',
    title: 'STRIPING & SAFETY',
    body: 'ADA-compliant striping. Federal spec thermoplastic. Fire-lane repaint on 24-hour dispatch.',
    meta: 'ADA · FHWA MUTCD',
    kpi: '24h',
    kpiLabel: 'DISPATCH',
    to: '/safety',
  },
  {
    tag: 'LANE 06',
    title: 'MUNICIPAL & DOT',
    body: 'VDOT prequalified. Coastal track: VA · MD · NC · SC · GA. Bid-day to close-out, self-executing.',
    meta: 'VDOT Prequal · Davis-Bacon',
    kpi: '5',
    kpiLabel: 'STATE DOTS',
    to: '/gc-bid',
  },
];

function SovereignPowerhouse() {
  const [sector, setSector] = useState<'initial' | 'paving' | 'construction'>('initial');
  const heroRef = useRef<HTMLElement | null>(null);
  const heroProgress = useScrollProgress(heroRef);
  const navigate = useNavigate();

  return (
    <main style={styles.container}>
      {/* Ambient boardroom background — vignette + grid + gold halo */}
      <div aria-hidden="true" style={styles.ambient}>
        <div style={{
          ...styles.ambientBeamLeft,
          transform: `translate3d(0, ${heroProgress * -60}px, 0)`,
        }} />
        <div style={{
          ...styles.ambientBeamRight,
          transform: `translate3d(0, ${heroProgress * 80}px, 0)`,
        }} />
        <div style={styles.ambientGrid} />
      </div>

      {/* ═══════════════════════════════ HERO — THE BOARDROOM FLOOR */}
      <header ref={heroRef} style={styles.hero}>
        <div style={styles.heroRailTop}>
          <span style={styles.heroRailChip}>● BOARD-ROOM LIVE · 2026 Q2 · CHESTER, VA</span>
          <span style={styles.heroRailMeta}>DIAL-IN · <strong>804-446-1296</strong> · Direct to the Sovereign Authority</span>
        </div>

        <div style={styles.heroCore}>
          <div style={styles.heroEyebrow}>
            J. WORDEN &amp; SONS &middot; EST. 1984 &middot; FULL CLASS A GC
          </div>
          <h1 style={styles.heroTitle}>
            THE SOVEREIGN
            <br />
            <span className="pvd-gold-text" style={styles.heroTitleAccent}>PAVING POWERHOUSE.</span>
          </h1>
          <p style={styles.heroLede}>
            A four-generation civil &amp; general-contracting house operating on a single mandate:
            <strong style={{ color: IVORY }}> a six-inch compacted stone base, every driveway, every lot, every time.</strong>
            &nbsp;Award-winning infrastructure for national franchise rollouts, historic Richmond restorations,
            and Windsor Farms estates.
          </p>

          <div style={styles.heroCtaRow}>
            <TactileButton
              onClick={() => (window.location.href = 'tel:+18044461296')}
              aria-label="911 Dispatch call 804-446-1296"
            >
              911 DISPATCH → 804-446-1296
            </TactileButton>
            <TactileButton
              variant="steel"
              onClick={() => navigate({ to: '/contact' })}
            >
              OPEN THE 3D ESTIMATOR
            </TactileButton>
          </div>

          <div style={styles.heroKpiRow}>
            <KPI label="FOUNDED" value="1984" />
            <KPI label="GENERATIONS" value="4" />
            <KPI label="MARSHALL COMPACTION" value="96%" />
            <KPI label="STATES ACTIVE" value="50" />
            <KPI label="FRANCHISE ASSETS" value="100+" />
          </div>
        </div>

        {/* HQ strip */}
        <div style={styles.hqStrip}>
          <span style={styles.hqBadge}>CHESTER HEADQUARTERS</span>
          <span style={styles.hqAddress}>1601 Ware Bottom Springs Rd, Suite 214, Chester, VA 23836</span>
          <span style={styles.hqSep}>/</span>
          <span style={styles.hqLine}>DOMINATING THE VA — MD — NC — SC — GA COASTAL TRACK</span>
        </div>
      </header>

      {/* ═══════════════════════════════ FOUNDATIONAL ANCHOR — 3D PERSONAS */}
      <section style={styles.anchorSection}>
        <div style={styles.sectionLabelRow}>
          <span style={styles.sectionTick}>01</span>
          <span style={styles.sectionLabel}>THE FOUNDATIONAL ANCHOR</span>
          <span style={styles.sectionRule} />
        </div>

        <h2 style={styles.anchorHeadline}>
          THE FAMILY THAT LAID<br/>
          <span className="pvd-gold-text" style={styles.anchorHeadlineAccent}>THE FIRST SIX INCHES.</span>
        </h2>

        <p style={styles.legacyStatement}>
          Established 1984. A 4th-Generation Legacy of Uncompromising Asphalt Excellence.
        </p>

        <p style={styles.anchorLede}>
          Every square foot we pour is an extension of what John &amp; Betty Worden started in 1984.
          Rendered in live WebGL 3D with cinematic parallax &mdash; they drift gently as you scroll,
          keeping the foundation alive on every frame. Drag either plinth to rotate.
        </p>

        <div style={styles.anchorStage}>
          <div style={styles.personaHalo} aria-hidden="true" />

          <div style={styles.personaGrid}>
            <div style={styles.personaCell}>
              <div style={styles.personaCaptionTop}>
                <span style={styles.personaBadge}>PATRIARCH</span>
                <span style={styles.personaMeta}>CH. 01 · THE SIX-INCH MANDATE</span>
              </div>
              <MrWordenPersona3D height={460} parallaxStrength={36} />
              <blockquote style={styles.personaQuote}>
                &ldquo;Pay for the foundation once. Or pay for the repairs every three years. Your choice.&rdquo;
                <cite style={styles.personaCite}>— John Worden, Founder, 1984</cite>
              </blockquote>
            </div>

            <div style={styles.anchorCenter}>
              <div style={styles.anchorSeal}>
                <div style={styles.anchorSealYear}>1984</div>
                <div style={styles.anchorSealDivider} />
                <div style={styles.anchorSealMonogram}>JW</div>
                <div style={styles.anchorSealDivider} />
                <div style={styles.anchorSealLabel}>
                  THE WORDEN
                  <br />
                  GOLD STANDARD
                </div>
              </div>
              <p style={styles.anchorSealFootnote}>
                Signed. Sealed. Self-Executing.
                <br />
                Four Generations Deep.
              </p>
            </div>

            <div style={styles.personaCell}>
              <div style={styles.personaCaptionTop}>
                <span style={{ ...styles.personaBadge, color: '#E8B4A0', borderColor: '#E8B4A044' }}>
                  MATRIARCH
                </span>
                <span style={styles.personaMeta}>CH. 02 · THE CURB-TO-COUCH LEGACY</span>
              </div>
              <MrsWordenPersona3D height={460} parallaxStrength={-28} />
              <blockquote style={styles.personaQuote}>
                &ldquo;John laid the stone. I made sure the house was worth coming home to.&rdquo;
                <cite style={styles.personaCite}>— Betty Worden, Co-Founder, 1984</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ DUAL-LANE ENGAGEMENT */}
      <section style={styles.engagementSection}>
        <div style={styles.sectionLabelRow}>
          <span style={styles.sectionTick}>02</span>
          <span style={styles.sectionLabel}>THE DUAL-LANE ENGAGEMENT</span>
          <span style={styles.sectionRule} />
        </div>

        <h2 style={styles.engagementHeadline}>
          CHOOSE YOUR <span className="pvd-gold-text">LANE.</span>
        </h2>
        <p style={styles.engagementLede}>
          A decision-grade fork. Both lanes terminate at the same six-inch stone mandate. One is
          revenue-protecting infrastructure. The other is four-generation craft.
        </p>

        <div style={styles.engagementGrid}>
          <button
            type="button"
            onClick={() => setSector('paving')}
            className="glass-card glass-card-hover"
            style={{
              ...styles.engagementCard,
              borderColor: sector === 'paving' ? PVD_GOLD : 'rgba(210,180,110,0.22)',
              boxShadow:
                sector === 'paving'
                  ? `0 40px 90px -28px rgba(212,168,68,0.45), 0 0 0 1px ${PVD_GOLD}88, inset 0 1px 0 rgba(255,255,255,0.08)`
                  : (GLASS_CARD.boxShadow as string),
            }}
          >
            <div style={styles.engagementLaneTag}>LANE 01 · REVENUE ENGINE</div>
            <h3 style={styles.engagementCardTitle}>ASPHALT &amp; INFRASTRUCTURE</h3>
            <p style={styles.engagementCardBody}>
              Commercial lot rollouts · QSR fast-track builds · Estate paving on the six-inch
              mandate. VDOT §315 · AASHTO T180 · ASTM D2939 · Marshall 96%.
            </p>
            <div style={styles.engagementCardFooter}>
              <span>NATIONAL &amp; REGIONAL</span>
              <span style={{ color: PVD_GOLD }}>ENTER LANE →</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSector('construction')}
            className="glass-card glass-card-hover"
            style={{
              ...styles.engagementCard,
              borderColor: sector === 'construction' ? PVD_GOLD_CORE : 'rgba(210,180,110,0.22)',
              boxShadow:
                sector === 'construction'
                  ? `0 40px 90px -28px rgba(212,168,68,0.45), 0 0 0 1px ${PVD_GOLD_CORE}88, inset 0 1px 0 rgba(255,255,255,0.08)`
                  : (GLASS_CARD.boxShadow as string),
            }}
          >
            <div style={{ ...styles.engagementLaneTag, color: PVD_GOLD_CORE }}>
              LANE 02 · FOUR-GEN CRAFT
            </div>
            <h3 style={styles.engagementCardTitle}>CUSTOM CONSTRUCTION &amp; REMODEL</h3>
            <p style={styles.engagementCardBody}>
              Historic restorations · New-build luxury residential · Masonry and brick-paver
              specialties matched to interior millwork. Hand-tamped edges. Zero roller marks.
            </p>
            <div style={styles.engagementCardFooter}>
              <span>CENTRAL VIRGINIA SIGNATURE</span>
              <span style={{ color: PVD_GOLD_CORE }}>ENTER LANE →</span>
            </div>
          </button>
        </div>

        {sector !== 'initial' && (
          <div style={styles.engagementBriefing}>
            <div style={styles.engagementBriefingBadge}>
              {sector === 'paving' ? 'PAVING LANE ENGAGED' : 'CONSTRUCTION LANE ENGAGED'}
            </div>
            <p style={styles.engagementBriefingCopy}>
              {sector === 'paving' ? (
                <>
                  Paving is the heartbeat of this company. Whether we&rsquo;re handling a
                  <strong style={{ color: PVD_GOLD }}> 100-site commercial rollout </strong>
                  or a Windsor Farms estate, we lead with the six-inch stone base mandate.
                  It&rsquo;s award-winning infrastructure built to last 50 years — not five. If
                  you&rsquo;re looking for the cheapest bid, look elsewhere. If you&rsquo;re
                  looking for a predictable, high-performing asset, we&rsquo;re already working.
                </>
              ) : (
                <>
                  Four generations of craft. Historic Richmond restorations, new-build luxury, and
                  interior/exterior coordination that keeps the foyer aesthetic walking straight out
                  to the curb. Cobblestone aprons. Brick inlay. Masonry matched to the house —
                  not catalog-ordered.
                </>
              )}
            </p>
            <div style={styles.engagementBriefingCtaRow}>
              <Link to="/estimator" style={styles.engagementBriefingCta}>
                OPEN THE ESTIMATOR →
              </Link>
              <a href="tel:+18044461296" style={styles.engagementBriefingCtaGhost}>
                OR DIAL THE SOVEREIGN AUTHORITY
              </a>
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════ SOVEREIGN SERVICE MAP — glowing tiles */}
      <section style={styles.mapSection}>
        <div style={styles.sectionLabelRow}>
          <span style={styles.sectionTick}>03</span>
          <span style={styles.sectionLabel}>THE SOVEREIGN SERVICE MAP</span>
          <span style={styles.sectionRule} />
        </div>

        <h2 style={styles.mapHeadline}>
          SIX <span className="pvd-gold-text">LANES.</span> ONE STANDARD.
        </h2>
        <p style={styles.mapLede}>
          Every tile is live. Hover to illuminate the lane; click to enter the brief. The six-inch
          compacted stone base is the only mandate that travels across all of them.
        </p>

        <div style={styles.tileGrid}>
          {SOVEREIGN_TILES.map((tile) => (
            <Link
              key={tile.tag}
              to={tile.to as never}
              className="service-tile glass-card"
              style={styles.serviceTile}
            >
              <div style={styles.tileGoldRail} aria-hidden="true" />
              <div style={styles.tileTopRow}>
                <span style={styles.tileTag}>{tile.tag}</span>
                <span style={styles.tileEnter}>ENTER →</span>
              </div>
              <h3 style={styles.tileTitle}>{tile.title}</h3>
              <p style={styles.tileBody}>{tile.body}</p>
              <div style={styles.tileFooter}>
                <span style={styles.tileMeta}>{tile.meta}</span>
                <div style={styles.tileKpi}>
                  <span className="pvd-gold-text" style={styles.tileKpiValue}>{tile.kpi}</span>
                  <span style={styles.tileKpiLabel}>{tile.kpiLabel}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ 3D OPERATIONAL ESTIMATOR */}
      <HomepageEstimatorSection />

      {/* ═══════════════════════════════ THE J. WORDEN STANDARD */}
      <section style={styles.standardSection}>
        <div style={styles.sectionLabelRow}>
          <span style={styles.sectionTick}>05</span>
          <span style={styles.sectionLabel}>THE J. WORDEN STANDARD</span>
          <span style={styles.sectionRule} />
        </div>

        <div className="glass-card" style={styles.standardBlock}>
          <div style={styles.standardGoldRail} aria-hidden="true" />
          <div style={styles.standardTopTag}>A PROMISE, NOT A SPEC</div>
          <h2 style={styles.standardHeadline}>
            THE <span className="pvd-gold-text">6-INCH</span> COMPACTED AGGREGATE BASE.
          </h2>
          <div style={styles.mandateRow}>
            <div style={styles.mandateBody}>
              <p style={styles.standardBody}>
                Every Worden driveway, lot, and roadway is built on a six-inch compacted aggregate base —
                laid, leveled, and compacted to 96% Marshall before a single ton of asphalt ever touches
                the surface. It is the reason our 1984 installations still carry weight in 2026. It is
                not a spec. It is a promise from this family to yours.
              </p>
              <p style={styles.standardBodyStrong}>
                Six inches of stone. No shortcuts. No substitutions. No exceptions.
              </p>
            </div>

            <aside style={styles.signaturePanel} aria-label="Signed guarantee by Gene W. George">
              <div style={styles.signaturePanelTop}>SIGNED · IN GOLD INK · ON SCROLL</div>

              <div style={styles.signatureFrame}>
                <GeneGeorgeSignature />
              </div>

              <div style={styles.signaturePanelRole}>Standard Bearer of The J. Worden Standard</div>
              <div style={styles.signaturePanelMeta}>
                <span>FOURTH-GENERATION PAVEMENT</span>
                <span style={styles.signatureDot} aria-hidden="true">·</span>
                <span>COPYRIGHT HOLDER</span>
              </div>
              <div style={styles.signaturePanelSeal}>
                <div style={styles.signatureSealYear}>SINCE</div>
                <div style={styles.signatureSealBig}>1984</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ BOARDROOM DECK — PROOF */}
      <section style={styles.proofSection}>
        <div style={styles.sectionLabelRow}>
          <span style={styles.sectionTick}>06</span>
          <span style={styles.sectionLabel}>THE AWARD-WINNING RECORD</span>
          <span style={styles.sectionRule} />
        </div>

        <h2 style={styles.proofHeadline}>
          <span className="pvd-gold-text">PROOF,</span> NOT PROMISES.
        </h2>

        <div style={styles.proofGrid}>
          <ProofCard
            tag="100+ FRANCHISE ASSETS"
            title="NATIONAL COMMERCIAL PREFERRED GC"
            body="KFC · Taco Bell · Arby&rsquo;s. 2024–2025 KBP Foods sprint across MI, TX, LA."
          />
          <ProofCard
            tag="HISTORIC DINWIDDIE"
            title="VIRGINIA HISTORICAL SOCIETY"
            body="Recognized for excellence in heritage paving and masonry restoration."
          />
          <ProofCard
            tag="ESTABLISHED RICHMOND"
            title="WINDSOR FARMS · TUCKAHOE · THE MUSEUM DISTRICT"
            body="Four generations of Central Virginia estate and infrastructure work."
          />
          <ProofCard
            tag="4-TIME HOUZZ"
            title="BEST OF HOUZZ 2023 · 2016 · 2015 · 2014"
            body="Design-quality recognition across the four-generation portfolio."
          />
        </div>

        <div className="glass-card" style={styles.silBar}>
          <span style={styles.silChip}>
            JWORDENAI · LIVE INVESTIGATION · ASPHALT TECH BREAKTHROUGHS · COASTAL INFRASTRUCTURE ·
            HISTORIC RICHMOND RECOVERY
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════ BOARD SEAL */}
      <section style={styles.sealSection}>
        <div className="glass-card" style={styles.sealBlock}>
          <div style={styles.standardGoldRail} aria-hidden="true" />
          <div style={styles.sealEyebrow}>SIGN-OFF</div>
          <h2 style={styles.sealHeadline}>
            THIS IS A HIGH-STAKES DECISION.
            <br />
            <span className="pvd-gold-text">LET&rsquo;S MAKE IT AN EASY ONE.</span>
          </h2>
          <div style={styles.sealCtaRow}>
            <a href="tel:+18044461296" style={styles.sealCtaPrimary}>
              <span style={styles.heroCtaPrimaryShine} aria-hidden="true" />
              <span style={{ position: 'relative', zIndex: 1 }}>DIAL 804-446-1296</span>
            </a>
            <Link to="/estimator" style={styles.sealCtaSecondary}>
              OPEN THE ESTIMATOR
            </Link>
          </div>
          <p style={styles.sealCopy}>&copy; 2026 J. WORDEN &amp; SONS &middot; SOVEREIGN CLASS A GC &middot; THE BREADWINNER OF ASPHALT</p>
        </div>
      </section>
    </main>
  );
}

/* ───────────────────────────── subcomponents ──────────────────────────── */

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.kpi}>
      <div className="pvd-gold-text" style={styles.kpiValue}>{value}</div>
      <div style={styles.kpiLabel}>{label}</div>
    </div>
  );
}

function ProofCard({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div className="glass-card glass-card-hover" style={styles.proofCard}>
      <span style={styles.proofTag}>{tag}</span>
      <h3 style={styles.proofCardTitle}>{title}</h3>
      <p style={styles.proofCardBody} dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}

function HomepageEstimatorSection() {
  const [spec, setSpec] = useState<EstimatorSpec | null>(null);
  const [address, setAddress] = useState('');
  const [dispatching, setDispatching] = useState(false);
  const [match, setMatch] = useState<DispatchMatch | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSpecChange = useCallback((next: EstimatorSpec) => {
    setSpec(next);
  }, []);

  const dispatchReport = useCallback(async () => {
    setError(null);
    if (!address.trim() || address.trim().length < 6) {
      setError('Add a project site address so the Sovereign Dispatcher can route the report.');
      return;
    }
    setDispatching(true);
    try {
      const result = await dispatchPreliminaryReport({
        address: address.trim(),
        spec: spec ?? undefined,
      });
      setMatch(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dispatcher failed — call 804-446-1296.');
    } finally {
      setDispatching(false);
    }
  }, [address, spec]);

  const preview = address.trim().length > 4 ? matchAddressToGrid(address) : null;

  return (
    <section style={styles.estimatorSection}>
      <div style={styles.sectionLabelRow}>
        <span style={styles.sectionTick}>04</span>
        <span style={styles.sectionLabel}>THE 3D OPERATIONAL ESTIMATOR</span>
        <span style={styles.sectionRule} />
      </div>

      <h2 style={styles.estimatorHeadline}>
        DIAL THE LOT. <span className="pvd-gold-text">WATCH THE STONE BASE EXPAND.</span>
      </h2>
      <p style={styles.estimatorLede}>
        A live 4D sandbox: slide the square footage, toggle Standard vs. Heavy Duty load, and watch the
        six-inch compacted stone base render in real time. Drop a site address and the Sovereign
        Dispatcher generates a branded J. Worden Preliminary Site Report on the spot — no form, no wait.
      </p>

      <div style={styles.estimatorGrid}>
        <SovereignEstimator3D
          initialSqft={1400}
          initialLoad="standard"
          onSpecChange={handleSpecChange}
        />

        <aside className="glass-card" style={styles.estimatorAside}>
          <span style={styles.estimatorAsideTag}>● SOVEREIGN DISPATCHER · 41-CITY GRID</span>
          <h3 style={styles.estimatorAsideTitle}>
            DISPATCH THE <span className="pvd-gold-text">PRELIMINARY SITE REPORT</span>
          </h3>
          <p style={styles.estimatorAsideBody}>
            Drop a street address. If the site sits inside the 41-city Sovereign Grid, the branded
            J. Worden PDF renders instantly, carrying the spec you just dialed on the left.
          </p>

          <label htmlFor="homepage-dispatch-address" style={styles.estimatorLabel}>
            PROJECT SITE ADDRESS
          </label>
          <input
            id="homepage-dispatch-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="1601 Ware Bottom Springs Rd, Chester VA 23836"
            style={styles.estimatorInput}
          />

          {preview && (
            <div
              style={{
                ...styles.estimatorGridChip,
                color: preview.inGrid ? '#8be29a' : PVD_GOLD,
              }}
            >
              {preview.inGrid
                ? `● Grid confirmed · Hub: ${preview.matchedCity}`
                : '◌ Outside core 41-city grid — coastal track still available'}
            </div>
          )}

          <TactileButton
            onClick={() => void dispatchReport()}
            disabled={dispatching}
            aria-disabled={dispatching}
          >
            {dispatching ? '⏳ RENDERING PDF…' : '📎 DISPATCH SITE REPORT'}
          </TactileButton>

          <TactileButton
            variant="steel"
            onClick={() => (window.location.href = 'tel:+18044461296')}
            trailing={<span>→</span>}
          >
            OR DIAL 804-446-1296
          </TactileButton>

          {error && <div style={styles.estimatorError}>⚠️ {error}</div>}

          {match && (
            <div style={styles.estimatorSuccess}>
              {match.inGrid
                ? `✔ Report downloaded. A Sovereign Foreman from the ${match.matchedCity} hub will field-walk the site within one business day.`
                : '✔ Report downloaded. Your site sits on the coastal track — an operating partner covering your region will reach out within one business day.'}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

/* ───────────────────────────── style system ───────────────────────────── */

const styles = {
  container: {
    background: STEEL_GRADIENT,
    backgroundAttachment: 'fixed' as const,
    color: IVORY,
    minHeight: '100vh',
    fontFamily:
      '"Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    paddingTop: '90px',
  },
  ambient: {
    position: 'absolute' as const,
    inset: 0,
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  ambientBeamLeft: {
    position: 'absolute' as const,
    top: '-10%',
    left: '-20%',
    width: '60vw',
    height: '80vh',
    background: 'radial-gradient(ellipse at center, rgba(246,217,122,0.1) 0%, rgba(0,0,0,0) 60%)',
    filter: 'blur(60px)',
    willChange: 'transform',
  },
  ambientBeamRight: {
    position: 'absolute' as const,
    bottom: '-10%',
    right: '-15%',
    width: '55vw',
    height: '70vh',
    background: 'radial-gradient(ellipse at center, rgba(212,168,68,0.08) 0%, rgba(0,0,0,0) 65%)',
    filter: 'blur(60px)',
    willChange: 'transform',
  },
  ambientGrid: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(246,217,122,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(246,217,122,0.035) 1px, transparent 1px)',
    backgroundSize: '80px 80px',
    maskImage:
      'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 80%)',
    WebkitMaskImage:
      'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 80%)',
  },

  /* ───── HERO ───── */
  hero: {
    position: 'relative' as const,
    zIndex: 1,
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '64px 32px 32px',
    textAlign: 'center' as const,
  },
  heroRailTop: {
    ...GLASS_CARD,
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    gap: 20,
    padding: '10px 18px',
    borderRadius: '999px',
    fontSize: '10px',
    letterSpacing: '2.5px',
    color: STEEL_MID,
    textTransform: 'uppercase' as const,
    fontWeight: 600,
    maxWidth: '960px',
    margin: '0 auto 42px',
    flexWrap: 'wrap' as const,
  },
  heroRailChip: {
    color: PVD_GOLD,
  },
  heroRailMeta: {
    color: IVORY,
  },
  heroCore: {
    maxWidth: '960px',
    margin: '0 auto',
  },
  heroEyebrow: {
    color: PVD_GOLD,
    fontSize: '11px',
    letterSpacing: '6px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    marginBottom: '28px',
  },
  heroTitle: {
    color: IVORY,
    fontFamily: '"Inter", sans-serif',
    fontSize: 'clamp(48px, 8vw, 112px)',
    lineHeight: 0.95,
    fontWeight: 900,
    letterSpacing: '-3px',
    margin: '0 auto',
    textShadow: '0 8px 40px rgba(0,0,0,0.8)',
    textAlign: 'center' as const,
    width: '100%',
    maxWidth: '100%',
  },
  heroTitleAccent: {
    letterSpacing: '-3px',
  },
  heroLede: {
    color: '#c7c7c7',
    fontSize: 'clamp(16px, 1.5vw, 19px)',
    lineHeight: 1.6,
    maxWidth: '780px',
    margin: '36px auto 0',
  },
  heroCtaRow: {
    display: 'flex',
    gap: 14,
    justifyContent: 'center' as const,
    marginTop: 44,
    flexWrap: 'wrap' as const,
  },
  heroCtaPrimary: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    padding: '18px 32px',
    background: PVD_GRADIENT,
    color: '#0a0a0a',
    fontWeight: 900,
    letterSpacing: '2px',
    fontSize: '13px',
    textDecoration: 'none',
    borderRadius: '3px',
    textTransform: 'uppercase' as const,
    boxShadow:
      '0 25px 45px -15px rgba(212,168,68,0.55), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(140,106,31,0.4)',
    border: '1px solid rgba(246,217,122,0.5)',
  },
  heroCtaPrimaryShine: {
    position: 'absolute' as const,
    inset: 0,
    background:
      'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)',
    mixBlendMode: 'screen' as const,
    transform: 'translateX(-100%)',
    animation: 'pvd-shine-sweep 5s ease-in-out infinite',
    pointerEvents: 'none' as const,
  },
  heroCtaSecondary: {
    padding: '18px 32px',
    background: 'rgba(20,22,26,0.55)',
    color: IVORY,
    fontWeight: 700,
    letterSpacing: '2px',
    fontSize: '13px',
    textDecoration: 'none',
    borderRadius: '3px',
    textTransform: 'uppercase' as const,
    border: '1px solid rgba(246,217,122,0.35)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
  },
  heroKpiRow: {
    ...GLASS_CARD,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: 4,
    borderRadius: '8px',
    marginTop: '56px',
    padding: '4px',
  },
  kpi: {
    padding: '22px 12px',
    textAlign: 'center' as const,
    background: 'rgba(0,0,0,0.35)',
    borderRadius: '6px',
  },
  kpiValue: {
    fontSize: '36px',
    fontWeight: 900,
    letterSpacing: '-1px',
    lineHeight: 1,
  },
  kpiLabel: {
    color: STEEL_MID,
    fontSize: '9px',
    letterSpacing: '3px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    marginTop: 8,
  },
  hqStrip: {
    marginTop: 40,
    padding: '14px 22px',
    display: 'flex',
    justifyContent: 'center' as const,
    flexWrap: 'wrap' as const,
    gap: 14,
    alignItems: 'center' as const,
    fontSize: '11px',
    letterSpacing: '2.5px',
    textTransform: 'uppercase' as const,
    color: '#d8d8d8',
    fontWeight: 600,
    borderTop: '1px solid rgba(246,217,122,0.3)',
    borderBottom: '1px solid rgba(246,217,122,0.18)',
    background: 'rgba(10,10,12,0.55)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  hqBadge: {
    color: PVD_GOLD,
    fontWeight: 900,
    letterSpacing: '3px',
  },
  hqAddress: {
    color: IVORY,
  },
  hqSep: {
    color: '#444',
  },
  hqLine: {
    color: STEEL_MID,
  },

  /* ───── SECTION SHELL ───── */
  sectionLabelRow: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 16,
    maxWidth: '1200px',
    margin: '0 auto 32px',
  },
  sectionTick: {
    color: PVD_GOLD,
    fontSize: '11px',
    letterSpacing: '3px',
    fontWeight: 900,
    padding: '4px 10px',
    border: `1px solid ${PVD_GOLD}55`,
    borderRadius: '3px',
    background: 'rgba(10,10,12,0.4)',
  },
  sectionLabel: {
    color: IVORY,
    fontSize: '11px',
    letterSpacing: '4px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    background: 'linear-gradient(90deg, rgba(246,217,122,0.35) 0%, rgba(246,217,122,0) 100%)',
  },

  /* ───── ANCHOR ───── */
  anchorSection: {
    position: 'relative' as const,
    zIndex: 1,
    padding: '110px 32px 60px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  anchorHeadline: {
    color: IVORY,
    fontSize: 'clamp(40px, 6vw, 80px)',
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: '-2px',
    textAlign: 'center' as const,
    maxWidth: '980px',
    margin: '0 auto',
  },
  anchorHeadlineAccent: {},
  anchorLede: {
    color: '#c7c7c7',
    textAlign: 'center' as const,
    maxWidth: '720px',
    margin: '28px auto 0',
    fontSize: '16px',
    lineHeight: 1.65,
  },
  legacyStatement: {
    color: IVORY,
    textAlign: 'center' as const,
    maxWidth: '860px',
    margin: '28px auto 0',
    fontSize: 'clamp(18px, 2vw, 22px)',
    lineHeight: 1.5,
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    padding: '18px 24px',
    borderTop: `1px solid ${PVD_GOLD}55`,
    borderBottom: `1px solid ${PVD_GOLD}55`,
    background:
      'linear-gradient(90deg, rgba(246,217,122,0) 0%, rgba(246,217,122,0.08) 50%, rgba(246,217,122,0) 100%)',
  },
  anchorStage: {
    position: 'relative' as const,
    marginTop: 72,
  },
  personaHalo: {
    position: 'absolute' as const,
    inset: '-8% -4%',
    background:
      'radial-gradient(ellipse at 50% 50%, rgba(246,217,122,0.14) 0%, rgba(0,0,0,0) 65%)',
    filter: 'blur(60px)',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  personaGrid: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'minmax(300px, 1fr) minmax(180px, 260px) minmax(300px, 1fr)',
    gap: 24,
    alignItems: 'center' as const,
    perspective: '1800px',
  },
  personaCell: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 18,
  },
  personaCaptionTop: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  personaBadge: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '3px',
    fontWeight: 800,
    padding: '4px 10px',
    border: `1px solid ${PVD_GOLD}44`,
    borderRadius: '999px',
    textTransform: 'uppercase' as const,
  },
  personaMeta: {
    color: STEEL_MID,
    fontSize: '10px',
    letterSpacing: '2px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
  },
  personaQuote: {
    ...GLASS_CARD,
    padding: '22px 24px',
    borderRadius: '10px',
    color: IVORY,
    fontSize: '16px',
    lineHeight: 1.6,
    fontStyle: 'italic' as const,
    borderLeft: `3px solid ${PVD_GOLD}`,
    margin: 0,
  },
  personaCite: {
    display: 'block',
    marginTop: 12,
    fontSize: '10px',
    letterSpacing: '2px',
    color: STEEL_MID,
    fontStyle: 'normal' as const,
    textTransform: 'uppercase' as const,
    fontWeight: 600,
  },
  anchorCenter: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    gap: 18,
    padding: '12px',
  },
  anchorSeal: {
    ...GLASS_CARD,
    width: '100%',
    maxWidth: '220px',
    aspectRatio: '1 / 1',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '22px',
    gap: 6,
    border: `1px solid ${PVD_GOLD}66`,
    boxShadow: `0 20px 60px -20px rgba(246,217,122,0.4), inset 0 0 40px rgba(0,0,0,0.6), 0 0 0 1px ${PVD_GOLD}33`,
  },
  anchorSealYear: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '4px',
    fontWeight: 700,
  },
  anchorSealDivider: {
    width: '60%',
    height: 1,
    background: `${PVD_GOLD}55`,
  },
  anchorSealMonogram: {
    color: IVORY,
    fontSize: '48px',
    fontWeight: 900,
    letterSpacing: '-2px',
    fontFamily: 'Garamond, "Times New Roman", serif',
  },
  anchorSealLabel: {
    color: IVORY,
    fontSize: '9px',
    letterSpacing: '2.5px',
    fontWeight: 700,
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    lineHeight: 1.35,
  },
  anchorSealFootnote: {
    color: STEEL_MID,
    fontSize: '10px',
    letterSpacing: '2px',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    fontWeight: 600,
    lineHeight: 1.5,
  },

  /* ───── ENGAGEMENT ───── */
  engagementSection: {
    position: 'relative' as const,
    zIndex: 1,
    padding: '110px 32px 60px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  engagementHeadline: {
    color: IVORY,
    fontSize: 'clamp(40px, 6vw, 72px)',
    fontWeight: 900,
    letterSpacing: '-2px',
    textAlign: 'center' as const,
    margin: 0,
  },
  engagementLede: {
    color: '#c7c7c7',
    fontSize: '16px',
    lineHeight: 1.65,
    maxWidth: '720px',
    textAlign: 'center' as const,
    margin: '24px auto 60px',
  },
  engagementGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 22,
  },
  engagementCard: {
    padding: '40px 34px',
    textAlign: 'left' as const,
    cursor: 'pointer',
    color: IVORY,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
    borderRadius: '10px',
    fontFamily: 'inherit',
  },
  engagementLaneTag: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '3px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
  },
  engagementCardTitle: {
    fontSize: '26px',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    margin: 0,
    lineHeight: 1.1,
  },
  engagementCardBody: {
    color: '#b8b8b8',
    fontSize: '14px',
    lineHeight: 1.65,
    margin: 0,
  },
  engagementCardFooter: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginTop: 10,
    paddingTop: 16,
    borderTop: '1px solid rgba(246,217,122,0.15)',
    fontSize: '10px',
    letterSpacing: '2.5px',
    fontWeight: 700,
    color: STEEL_MID,
    textTransform: 'uppercase' as const,
  },
  engagementBriefing: {
    ...GLASS_CARD,
    marginTop: 28,
    padding: '40px 44px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 18,
  },
  engagementBriefingBadge: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '3px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
  },
  engagementBriefingCopy: {
    color: IVORY,
    fontSize: '17px',
    lineHeight: 1.7,
    margin: 0,
  },
  engagementBriefingCtaRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 14,
    marginTop: 8,
  },
  engagementBriefingCta: {
    padding: '14px 24px',
    background: PVD_GRADIENT,
    color: '#0a0a0a',
    fontWeight: 900,
    letterSpacing: '2px',
    fontSize: '12px',
    textDecoration: 'none',
    borderRadius: '3px',
    textTransform: 'uppercase' as const,
    border: '1px solid rgba(246,217,122,0.5)',
  },
  engagementBriefingCtaGhost: {
    padding: '14px 24px',
    background: 'transparent',
    color: IVORY,
    fontWeight: 700,
    letterSpacing: '2px',
    fontSize: '12px',
    textDecoration: 'none',
    borderRadius: '3px',
    textTransform: 'uppercase' as const,
    border: '1px solid rgba(246,217,122,0.3)',
  },

  /* ───── SOVEREIGN SERVICE MAP ───── */
  mapSection: {
    position: 'relative' as const,
    zIndex: 1,
    padding: '110px 32px 60px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  mapHeadline: {
    color: IVORY,
    fontSize: 'clamp(40px, 6vw, 72px)',
    fontWeight: 900,
    letterSpacing: '-2px',
    textAlign: 'center' as const,
    margin: 0,
  },
  mapLede: {
    color: '#c7c7c7',
    fontSize: '16px',
    lineHeight: 1.65,
    maxWidth: '720px',
    textAlign: 'center' as const,
    margin: '24px auto 60px',
  },
  tileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 22,
  },
  serviceTile: {
    position: 'relative' as const,
    padding: '32px 28px 28px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
    color: IVORY,
    textDecoration: 'none',
    cursor: 'pointer',
    overflow: 'hidden' as const,
  },
  tileGoldRail: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: PVD_GRADIENT,
    opacity: 0.85,
  },
  tileTopRow: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  tileTag: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '3px',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    padding: '3px 8px',
    border: `1px solid ${PVD_GOLD}55`,
    borderRadius: '3px',
  },
  tileEnter: {
    color: STEEL_MID,
    fontSize: '10px',
    letterSpacing: '2.5px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
  },
  tileTitle: {
    color: IVORY,
    fontSize: '22px',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    lineHeight: 1.1,
    margin: 0,
  },
  tileBody: {
    color: '#b8b8b8',
    fontSize: '13px',
    lineHeight: 1.65,
    margin: 0,
    flexGrow: 1,
  },
  tileFooter: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'flex-end' as const,
    marginTop: 12,
    paddingTop: 14,
    borderTop: '1px solid rgba(246,217,122,0.18)',
    gap: 12,
  },
  tileMeta: {
    color: STEEL_MID,
    fontSize: '9px',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    maxWidth: '60%',
    lineHeight: 1.4,
  },
  tileKpi: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end' as const,
    gap: 2,
  },
  tileKpiValue: {
    fontSize: '28px',
    fontWeight: 900,
    letterSpacing: '-1px',
    lineHeight: 1,
  },
  tileKpiLabel: {
    color: STEEL_MID,
    fontSize: '8px',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
  },

  /* ───── 3D ESTIMATOR ───── */
  estimatorSection: {
    position: 'relative' as const,
    zIndex: 1,
    padding: '110px 32px 60px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  estimatorHeadline: {
    color: IVORY,
    fontSize: 'clamp(36px, 5.5vw, 68px)',
    fontWeight: 900,
    letterSpacing: '-2px',
    textAlign: 'center' as const,
    margin: 0,
    lineHeight: 1.05,
  },
  estimatorLede: {
    color: '#c7c7c7',
    fontSize: '16px',
    lineHeight: 1.65,
    maxWidth: '820px',
    textAlign: 'center' as const,
    margin: '24px auto 48px',
  },
  estimatorGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.25fr) minmax(280px, 1fr)',
    gap: 28,
    alignItems: 'start' as const,
  },
  estimatorAside: {
    padding: '28px',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
  },
  estimatorAsideTag: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '3.5px',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
  },
  estimatorAsideTitle: {
    color: IVORY,
    fontSize: 'clamp(22px, 2.4vw, 30px)',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    lineHeight: 1.15,
    margin: 0,
    textTransform: 'uppercase' as const,
  },
  estimatorAsideBody: {
    color: '#b8b8b8',
    fontSize: '14px',
    lineHeight: 1.65,
    margin: 0,
  },
  estimatorLabel: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '3px',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    marginTop: 4,
  },
  estimatorInput: {
    background: '#000',
    border: `1px solid ${PVD_GOLD}4D`,
    outline: 'none',
    padding: '14px 16px',
    color: IVORY,
    fontWeight: 700,
    fontSize: '15px',
    borderRadius: '6px',
    fontFamily: 'inherit',
  },
  estimatorGridChip: {
    fontSize: '10px',
    letterSpacing: '3px',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
  },
  estimatorError: {
    color: '#f87171',
    fontSize: '13px',
    fontWeight: 700,
  },
  estimatorSuccess: {
    color: PVD_GOLD,
    fontSize: '13px',
    fontWeight: 700,
    lineHeight: 1.55,
    borderLeft: `3px solid ${PVD_GOLD}`,
    paddingLeft: 12,
  },

  /* ───── STANDARD ───── */
  standardSection: {
    position: 'relative' as const,
    zIndex: 1,
    padding: '110px 32px 60px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  standardBlock: {
    position: 'relative' as const,
    padding: '56px 48px',
    borderRadius: '12px',
    maxWidth: '1100px',
    margin: '0 auto',
    overflow: 'hidden' as const,
  },
  standardGoldRail: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: PVD_GRADIENT,
  },
  standardTopTag: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '3px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    marginBottom: 14,
  },
  standardHeadline: {
    color: IVORY,
    fontSize: 'clamp(28px, 3.2vw, 40px)',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    margin: '0 0 28px',
    lineHeight: 1.1,
  },
  standardBody: {
    color: '#d5d5d5',
    fontSize: '16px',
    lineHeight: 1.8,
    margin: '0 0 16px',
  },
  standardBodyStrong: {
    color: IVORY,
    fontSize: '17px',
    lineHeight: 1.6,
    margin: '0 0 8px',
    fontWeight: 700,
    letterSpacing: '0.5px',
  },
  mandateRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 1.2fr) minmax(280px, 1fr)',
    gap: 36,
    alignItems: 'stretch' as const,
    marginTop: 4,
  },
  mandateBody: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
  },
  signaturePanel: {
    position: 'relative' as const,
    padding: '30px 26px 26px',
    borderRadius: '10px',
    background:
      'linear-gradient(160deg, rgba(18,18,22,0.75) 0%, rgba(6,6,10,0.85) 100%)',
    border: '1px solid rgba(246,217,122,0.45)',
    boxShadow:
      '0 30px 70px -30px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(246,217,122,0.2), 0 0 35px -8px rgba(212,168,68,0.3)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    textAlign: 'center' as const,
    gap: 10,
    overflow: 'hidden' as const,
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
  },
  signaturePanelTop: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '4.5px',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    marginBottom: 2,
  },
  signatureFrame: {
    width: '100%',
    maxWidth: '460px',
    padding: '8px 0 4px',
  },
  signaturePanelRole: {
    color: '#ded1a1',
    fontSize: '12px',
    letterSpacing: '2px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    fontStyle: 'italic' as const,
  },
  signaturePanelMeta: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    flexWrap: 'wrap' as const,
    color: '#c9b576',
    fontSize: '9px',
    letterSpacing: '2.5px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
  },
  signatureDot: {
    color: PVD_GOLD_CORE,
  },
  signaturePanelSeal: {
    marginTop: 14,
    width: 76,
    height: 76,
    borderRadius: '50%',
    border: `2px solid ${PVD_GOLD}`,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    background:
      'radial-gradient(circle at 30% 20%, rgba(246,217,122,0.2) 0%, rgba(10,10,12,0.6) 60%)',
    boxShadow: 'inset 0 0 0 2px rgba(246,217,122,0.4), 0 0 20px -5px rgba(212,168,68,0.5)',
  },
  signatureSealYear: {
    color: PVD_GOLD,
    fontSize: '8px',
    letterSpacing: '2.5px',
    fontWeight: 800,
  },
  signatureSealBig: {
    color: IVORY,
    fontSize: '22px',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    marginTop: 2,
  },

  /* ───── PROOF ───── */
  proofSection: {
    position: 'relative' as const,
    zIndex: 1,
    padding: '110px 32px 60px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  proofHeadline: {
    color: IVORY,
    fontSize: 'clamp(40px, 6vw, 72px)',
    fontWeight: 900,
    letterSpacing: '-2px',
    margin: '0 0 56px',
    textAlign: 'center' as const,
  },
  proofGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 22,
  },
  proofCard: {
    padding: '30px 28px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
  },
  proofTag: {
    color: PVD_GOLD,
    fontSize: '10px',
    letterSpacing: '3px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
  },
  proofCardTitle: {
    color: IVORY,
    fontSize: '18px',
    fontWeight: 900,
    letterSpacing: '-0.3px',
    lineHeight: 1.25,
    margin: 0,
  },
  proofCardBody: {
    color: '#b0b0b0',
    fontSize: '13px',
    lineHeight: 1.6,
    margin: 0,
  },
  silBar: {
    marginTop: 44,
    padding: '16px 22px',
    borderRadius: '999px',
    textAlign: 'center' as const,
  },
  silChip: {
    color: PVD_GOLD,
    fontSize: '11px',
    letterSpacing: '2.5px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
  },

  /* ───── SEAL ───── */
  sealSection: {
    position: 'relative' as const,
    zIndex: 1,
    padding: '110px 32px 140px',
    maxWidth: '1280px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  sealBlock: {
    position: 'relative' as const,
    padding: '72px 48px',
    borderRadius: '12px',
    maxWidth: '880px',
    margin: '0 auto',
    overflow: 'hidden' as const,
  },
  sealEyebrow: {
    color: PVD_GOLD,
    fontSize: '11px',
    letterSpacing: '4px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    marginBottom: 22,
  },
  sealHeadline: {
    color: IVORY,
    fontSize: 'clamp(32px, 4.5vw, 56px)',
    fontWeight: 900,
    letterSpacing: '-1px',
    lineHeight: 1.1,
    margin: 0,
  },
  sealCtaRow: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap' as const,
    justifyContent: 'center' as const,
    marginTop: 36,
  },
  sealCtaPrimary: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    padding: '18px 34px',
    background: PVD_GRADIENT,
    color: '#0a0a0a',
    fontWeight: 900,
    letterSpacing: '2px',
    fontSize: '13px',
    textDecoration: 'none',
    borderRadius: '3px',
    textTransform: 'uppercase' as const,
    boxShadow:
      '0 25px 45px -15px rgba(212,168,68,0.55), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(140,106,31,0.4)',
    border: '1px solid rgba(246,217,122,0.5)',
  },
  sealCtaSecondary: {
    padding: '18px 34px',
    background: 'transparent',
    color: IVORY,
    fontWeight: 700,
    letterSpacing: '2px',
    fontSize: '13px',
    textDecoration: 'none',
    borderRadius: '3px',
    textTransform: 'uppercase' as const,
    border: '1px solid rgba(246,217,122,0.35)',
  },
  sealCopy: {
    marginTop: 40,
    color: '#555',
    fontSize: '10px',
    letterSpacing: '2.5px',
    textTransform: 'uppercase' as const,
    fontWeight: 600,
  },
} satisfies Record<string, CSSProperties>;
