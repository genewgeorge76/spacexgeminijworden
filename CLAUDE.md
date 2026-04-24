<!--
============================================================================
PROPRIETARY AND CONFIDENTIAL
Copyright (c) 2026 Gene W. George / J. Worden & Sons Asphalt Paving.
All Rights Reserved.

Unauthorized copying of this file, via any medium, is strictly prohibited.
The algorithms, pricing models, and logic contained herein ("JWORDENAI")
are the exclusive property of Gene W. George.
============================================================================
-->

# CLAUDE.md — Persistent Memory for J. Worden & Sons AI Agents

> This file is read by Claude Code on every session. Update it whenever meaningful state changes. Last updated: 2026-04-24.

---

## 🧠 Session Memory — April 23–24, 2026

### Yesterday (April 23, 2026)
- **AI Lead Gatekeeper** was running on its hourly GitHub Actions schedule all day (`scripts/lead_scoring.py`).
- 14+ automated commits landed on `main` under `chore(leads): update scored leads [skip ci]`, each refreshing `data/leads_scored.json` with the latest scored and tiered leads.
- No manual code changes were merged to `main` on April 23.
- Top scored lead as of April 23: **LD-001 — US Army Corps of Engineers** (USACE base road resurfacing, $2.5M, VA, Score: 97, Tier 1 🐋 Whale).

### Early This Morning (April 24, 2026)
- A new private Python repository **`jwordenaii/codexbuildfreeofbase44`** was created at 03:18 UTC under the `jwordenaii` GitHub organization.
  - This is a Codex-build free-base scaffold — a Python-based foundation for extending JWORDENAI capabilities outside the main Vite/React site.
  - Treat this org (`jwordenaii`) as the secondary AI-tooling and automation org for J. Worden & Sons.
- Automated lead scoring continued on the main repo throughout the morning.

---

## 📌 Current Project State (as of April 24, 2026)

### Repository
- **Repo:** `genewgeorge76/J.Worden-SonsPavingfinal-gemni-site`
- **Main branch:** `main` — last non-automated commit: `b958dc7` (fix: add missing /sovereign-command route, PR #160, April 18)
- **Deployed:** Netlify project `doooone` → `jwordenasphaltpaving.com`
- **Current version:** JWORDENAI 2026.4.17 "Breadwinner Edition"

### Open Pull Requests
| # | Title | Status | Agent |
|---|-------|--------|-------|
| [#162](https://github.com/genewgeorge76/J.Worden-SonsPavingfinal-gemni-site/pull/162) | Bump minor-and-patch group (9 packages) | Open | Dependabot |
| [#161](https://github.com/genewgeorge76/J.Worden-SonsPavingfinal-gemni-site/pull/161) | Fix Netlify SPA routing + `/sovereign-command` direct nav | Open | Netlify Coding |
| [#159](https://github.com/genewgeorge76/J.Worden-SonsPavingfinal-gemni-site/pull/159) | 4D Virtual Foreman: 3D Estimator, SharpImage, SovereignDispatcher, Tactile UI | Open | Netlify Coding |

**Action needed:** PRs #159 and #161 target `main` and are waiting for review/merge. PR #161 supersedes the fix in #160 (already merged). PR #162 is a routine dependabot bump.

### Recently Merged
- **PR #160** — fix: `/sovereign-command` SPA route + `public/_redirects` fallback ✅
- **PR #158** — Sovereign Master Build v2026.4.17 (Breadwinner Edition) ✅
- **PR #157** — Bulk-close 36 stale PRs ✅

---

## 🏗️ Architecture Quick Reference

| Layer | Technology |
|-------|------------|
| Build | Vite 7 |
| Frontend | React 19 |
| Routing | TanStack Router v1 (file-based, `src/routes/`) |
| Styling | Tailwind CSS 4 |
| 3D / Maps | Three.js, Leaflet |
| PDF | @react-pdf/renderer |
| AI | @anthropic-ai/sdk (Claude, direct) |
| Server | Netlify Functions (`netlify/functions/`) |
| Language | TypeScript 5 (strict, `@/` → `src/`) |
| Deployment | Netlify static SPA + edge functions |

**This is a Vite SPA — NOT TanStack Start.** No SSR. Server logic lives in `netlify/functions/`.

### Key Files
- `src/routes/index.tsx` — Homepage (Sovereign Powerhouse, JWORDENAI 2026.4.17)
- `src/routes/sovereign-command.tsx` — Command Center with gatekeeper (VITE_COMMAND_CENTER_KEY)
- `src/ai/JWordenAIEngine.ts` — Primary AI engine (Anthropic/Claude)
- `src/ai/BidIntelligenceEngine.ts` — RFP scoring + proposal generation
- `src/ai/MultiModelRouter.ts` — Claude (bidding) + GPT-4 (scheduling) + Gemini (specs)
- `src/ai/RAGKnowledgeBase.ts` — VDOT specs, Davis-Bacon, SAM.gov, Worden Standards
- `src/ai/swarm/SwarmCoordinator.ts` — Multi-agent parallel execution
- `scripts/lead_scoring.py` — Hourly lead gatekeeper (GitHub Actions)
- `data/leads_scored.json` — Live lead pipeline with tier/score/qualification
- `netlify/functions/worden-bidder.js` — Server-side bid endpoint
- `netlify/functions/kickserv-lead.js` — Lead forwarding to Kickserv CRM

### Route Tree Summary
The following client routes are registered (non-exhaustive):
`/`, `/about`, `/services`, `/estimator`, `/contact`, `/admin`, `/dashboard`,
`/sovereign`, `/sovereign-master`, `/sovereign-command`, `/command-center`, `/command-bot`,
`/gallery`, `/gc-bid`, `/whale-hunter`, `/field`, `/dispatch`, `/portal`, `/login`,
`/masonry`, `/roofing`, `/concrete`, `/sealcoating`, `/commercial`, `/residential`,
`/standards`, `/safety`, `/weather-intel`, `/mr-worden-3d`,
`/locations/*` (41 Virginia cities), `/virginia/*`, `/maryland/*`, `/minnesota/*`, `/illinois/*`

---

## 🤖 AI Agent Organizations

| Org | Purpose |
|-----|---------|
| `genewgeorge76` | Main production website repo |
| `jwordenaii` | AI tooling, automation, Codex experiments (created April 24, 2026) |

**`jwordenaii/codexbuildfreeofbase44`** — Python Codex scaffold, created 2026-04-24T03:18 UTC. Used as the free-base builder for off-site automation and AI workflow tooling.

---

## 📊 Lead Pipeline Status (April 24, 2026)

The AI Lead Gatekeeper has scored **8+ leads** continuously. Top leads:

| Lead | Company | Value | Tier | Score |
|------|---------|-------|------|-------|
| LD-001 | US Army Corps of Engineers (USACE) | $2.5M | 🐋 Whale | 97 |
| LD-003 | Fairfax County DPW | $620K | 🐋 Whale | 86 |
| LD-007 | City of Richmond DOT | $450K | 🐋 Whale | 88 |
| LD-002 | KBP Foods (KFC Portfolio, 12 sites) | $185K | 🦈 Shark | 72 |

---

## ⚡ Worden Engineering Standards (Non-Negotiable)

These MUST appear in every paving spec, proposal, and AI response:

| Standard | Value |
|----------|-------|
| Compaction | **96% Marshall Unit Weight** (minimum floor) |
| Base | **VDOT Section 315 structural stone base** |
| Oil Shield | **±$9/ton** liquid asphalt price buffer in all estimates |
| Medical | **Zero-Downtime DOT Medical** compliance for crew scheduling |

Reference standards: VDOT Sec 315 (paving), ASTM C90/C270 (masonry), FM Global RoofNav (roofing), ACI 318 (concrete), AASHTO T99/T180 (compaction), FAR 48 CFR + Davis-Bacon (federal work).

---

## 🎯 Active Roadmap Focus (v2.0 "The Foundation", Q2 2026)

In-progress items:
- [ ] Multi-Model Router — Claude/GPT-4/Gemini routing (< 3s latency target)
- [ ] RAG Knowledge Base — VDOT + Davis-Bacon + SAM.gov citations
- [ ] Bid Intelligence Engine — RFP → scored tier + full proposal in < 10s
- [ ] Voice Interface — Web Speech API for field crew (Chrome mobile)
- [ ] Admin Intelligence Dashboard — Bid pipeline, SEO, security widgets
- [ ] GitHub Actions CI Quality Gate — TS + Lighthouse ≥ 90 + CodeQL on every PR

---

*J. Worden & Sons — 4th Generation. Since 1984. Built to Last.*
