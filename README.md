# J. Worden & Sons | Municipal-Grade Asphalt Authority
### 4th-Generation Excellence · Richmond, VA Metro · 41-City Grid

> **"The Worden Minimum"** — A 6-Inch Compacted Aggregate Base is not an upgrade. It is required on every project.

This is the **Consolidated Master Repository** for the official J. Worden & Sons Asphalt Paving digital platform. It is engineered to dominate Google AI search results, integrate with Kickserv dispatch, and position J. Worden & Sons as the uncontested Asphalt Authority across Central Virginia.

---

## 🏗️ Core Architecture

Built on **Vite + React + TanStack Router** with full TypeScript and Tailwind CSS.

| Layer | Technology |
|---|---|
| Framework | React 18+ / TanStack Router (file-based) |
| Build | Vite |
| Styling | Tailwind CSS (Zinc/Safety-Yellow Industrial Theme) |
| Deployment | Netlify |
| Dispatch | Kickserv Self-Service Integration |
| SEO | JSON-LD: PavingContractor, FAQPage, AggregateRating, ServiceArea |

---

## 🚀 Deployment (Netlify Zero-Confusion Config)

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

**Node Version Requirement:** `>=22.12.0` (set `NODE_VERSION=22` in Netlify environment variables)

---

## 🛠️ Development

```bash
npm install       # Install dependencies
npm run dev       # Start local dev server (Vite)
npm run build     # Generate routes + Vite production build
npm run preview   # Preview production build locally
```

---

## 📲 Kickserv Lead Integration

Contact form submissions are automatically routed to Kickserv via a server-side Netlify Function proxy, eliminating browser CORS issues.

### How It Works

1. User fills out `ContactForm.tsx` and submits.
2. The browser POSTs JSON to `/.netlify/functions/kickserv-lead`.
3. The Netlify Function translates the payload to `application/x-www-form-urlencoded` and forwards it to `https://app.kickserv.com/account/60655/leads`.
4. On success the form shows an in-app confirmation. On failure it shows an error with a direct phone fallback.

### Field Mapping

| Form Field | Kickserv Field |
|---|---|
| Full Name (first token) | `customer[first_name]` |
| Full Name (remaining tokens) | `customer[last_name]` |
| Dispatch Phone | `customer[phone]` |
| Email Address | `customer[email]` |
| Project Site Address | `customer[service_address]` |
| Service + Sqft + Soil + Region + Notes | `job[description]` |
| *(static)* | `source` = `jworden_gemini_site` |

### Environment Variables

No additional environment variables are required for Kickserv. The endpoint is configured directly in `netlify/functions/kickserv-lead.js`.

Optional (for AI estimate via Worden Brain):

| Variable | Purpose |
|---|---|
| `CLAUDE_API_KEY` | Anthropic Claude API key for AI bid generation |

---


### Precision Estimator (`src/components/PrecisionEstimator.tsx`)
- Live sq-ft × rate calculation (standard: $4.50/sqft, 6" base: $8.25/sqft)
- 41-city dropdown with Google Analytics `demand_heatmap` event tracking
- Dynamic dispatch banner: *"High-Capacity Dispatch Available for [Date] in [City]"*
- CTA deep-links directly to Kickserv self-service request portal

### Contact Form (`src/components/ContactForm.tsx`)
- Syncs with **Kickserv** (`https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new`)
- Fields: Name, Phone, Email, Project Address (with VA city extraction), Project Scope, Square Footage, Details
- High-conversion CTA: **"⚡ Get Your Estimate Now — Stop Waiting for No-Show Paving Companies"**
- Logs city intent to Google Analytics demand heatmap on submit

---

## 🔍 SEO & Schema Intelligence (`src/routes/__root.tsx`)

Full JSON-LD injection targeting Google Rich Results:

| Schema Type | Purpose |
|---|---|
| `PavingContractor` | Core business entity with address, geo, phone, services |
| `AggregateRating` | 4.9 stars / 127 reviews — triggers star display in SERPs |
| `ServiceArea` (41-city) | Individual `City` objects for every municipality in the grid |
| `FAQPage` | 5 high-value Q&A pairs targeting "paving cost VA" queries |
| `OfferCatalog` | 6 service items including QSR Fast-Track and 6" Base Paving |

**External Authority Links:**
- [Houzz Live Profile](https://www.houzz.com/pro/jwordenandsonspaving/j-worden-sons-paving-l-l-c) — 4-time Best of Houzz winner
- [BBB A+ Profile](https://www.bbb.org/us/va/chester/profile/paving-contractors/j-worden-and-sons-paving-llc) — Accredited since 1994

---

## 🏛️ Commercial Authority (`src/routes/commercial.tsx`)

### Vetted by Giants
Official project documentation on file for national brands:

| Brand | Project | Documentation |
|---|---|---|
| KFC (Big Chicken) | 2017 $2.2M Remodel Repave | [Responsibility Matrix (Dropbox)](https://www.dropbox.com/scl/fi/698i3dtphbwfr6egjcppd/KFC-Responsibility-Matrix-GC-2.13.2018.xlsx?rlkey=byqlj2dnggo10zsjnllvau8co) |
| Arby's | Jennings, LA · Elton St. | [Environmental Phase I (Dropbox)](https://www.dropbox.com/scl/fi/qifo13kbofo8tda0oooqb/3380.17-Phase-I-Vacant-land-1424-Elton-Street-Jennings-LA.PDF?rlkey=if2imh89dy4983nwzu5220yo0) |
| Taco Bell | QSR Fast-Track Development | On-file documentation |

### 90-Day Developer Fast-Track Timeline
1. **Days 1–30:** Grading, demolition, 6" compacted aggregate base
2. **Days 31–60:** Binder course, surface course, compaction
3. **Days 61–90:** ADA striping, signage, permit sign-off

---

## 📍 41-City Service Grid

Richmond · Midlothian · Glen Allen · Chesterfield · Mechanicsville · Chester · Powhatan · Henrico · Ashland · Colonial Heights · Petersburg · Hopewell · Bon Air · Short Pump · Moseley · Goochland · Hanover · Caroline · King William · New Kent · Charles City · Dinwiddie · Prince George · Amelia · Cumberland · Fluvanna · Louisa · Orange · Culpeper · Spotsylvania · Stafford · Fredericksburg · Prince William · King George · Sandston · Lakeside · Chesapeake · Norfolk · Portsmouth · Newport News · Hampton

---

## 🏆 The Worden Minimum

Every project. No exceptions.

1. **6-Inch Compacted Aggregate Base** — prevents frost-heave, cracking, sub-base failure
2. **Municipal-Grade Surface Mix** — engineered for Virginia's freeze-thaw cycles
3. **0% Sub-Contracted Labor** — all work performed by J. Worden & Sons crews

---

*© 2026 J. Worden & Sons Asphalt Paving LLC. Chester, VA 23836. Class A Licensed & Insured. BBB A+ Since 1994.*
