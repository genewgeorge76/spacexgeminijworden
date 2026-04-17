# Pull Request Merge Order — J. Worden & Sons Paving

> Generated 2026-04-17. Current `main` SHA: `9495b366`. Merge these in the sequence below for a clean, conflict-free deploy.

---

## ⚠️ Before You Start — Close These Duplicates First

| Close This PR | Keep Instead | Reason |
|---|---|---|
| **#116** Add Facebook/TikTok pixel tracking | **#117** (same change, one day newer) | Identical feature; #117 is slightly more recent |
| **#99** Ghost Protocol master switch | **#100** (same UI, same day) | Both add Ghost Protocol toggle — pick one and close the other |

---

## Merge Sequence

### Wave 1 — Cleanup & Foundation (merge these first — no conflicts)

| # | Title | Why First |
|---|---|---|
| **#147** | Fix deployment issues and address pull requests in order | Smallest PR (3 files), based on current `main`, removes 2 orphaned files (`geo-intercept.ts`, `foo.css`). Zero risk. |
| **#121** | Bump `actions/checkout` from 4 to 6 | GitHub Actions only — no source code touched |
| **#124** | Bump `actions/upload-artifact` from 4 to 7 | GitHub Actions only — no source code touched |

---

### Wave 2 — Repository Rebuild & Docs

| # | Title | Why Here |
|---|---|---|
| **#145** | Review and rebuild repository for accuracy and cleanliness | Comprehensive cleanup: removes unused deps, stray files, rewrites `AGENTS.md` to match reality. Must come *after* #147 to avoid double-removing the same files. |
| **#93** | Add `CLAUDE.md` master system prompt | Docs/config only, no source conflicts |
| **#97** | Add proprietary LICENSE and copyright headers | Legal/docs — standalone change |

---

### Wave 3 — npm & Dependency Updates

| # | Title | Why Here |
|---|---|---|
| **#140** | Bump 7 minor-and-patch npm packages (Dependabot) | Apply after #145 trims dead deps so lock-file diff is clean |

---

### Wave 4 — SEO & Config

| # | Title | Why Here |
|---|---|---|
| **#129** | Implement 301 redirects for SEO domain consolidation | `netlify.toml` only — no TS/TSX conflicts |
| **#136** | Fix JSON-LD schema markup to use valid Schema.org types | Fixes `__root.tsx` + 4 route files; pure correctness fix |

---

### Wave 5 — Backend / Netlify Functions

| # | Title | Why Here |
|---|---|---|
| **#142** | Pre-flight audit script for Worden Alliance | Adds `scripts/preflight-audit.sh` + `npm prebuild` hook; infra-level, no UI conflict |
| **#132** | Implement working Kickserv lead submission via Netlify Function | Adds `netlify/functions/kickserv-lead.js` + updates `ContactForm.tsx`; needs clean `package.json` from Wave 3 first |

---

### Wave 6 — AI / Voice Features

| # | Title | Why Here |
|---|---|---|
| **#89** | Integrate JWORDENAI Voice Assistant v1.0 | Base voice module; others build on it |
| **#90** | Add JWORDENAI Richmond Voice Hub (804 node) | Extends #89 |
| **#88** | Add Weather & Seasonality Module | Standalone AI panel; add after voice foundation is in |
| **#91** | Add `claudeDrop.ts` engine | CLAUDE DROP dashboard panel |
| **#92** | JWORDENAI Labor & Subcontractor Treasury Engine | Treasury panel |

---

### Wave 7 — Dashboard Pillars

| # | Title | Why Here |
|---|---|---|
| **#94** | Add Claude AI Intelligence & Projections panel | Dashboard panel |
| **#95** | Add Iron Matrix, A/R Enforcer, Plant Pulse pillars | Dashboard panels (depends on dashboard scaffold from #94) |
| **#96** | PWA manifest, `/field` foreman app, live status panel | PWA layer on top of dashboard |
| **#104** | Add Iron Grid War Room: Live SEO Heatmap + Search Intercept Radar | Advanced dashboard feature |

---

### Wave 8 — UI / Data Panels

| # | Title | Why Here |
|---|---|---|
| **#110** | Style dashboard card with conic gradient and blur effect | Pure CSS/styling |
| **#111** | Create agentic pipeline table with client & transaction info | Data table component |
| **#114** | Create directories and implement VLA models for macro-economic adjustments | New AI models directory |

---

### Wave 9 — Auth & Security

| # | Title | Why Here |
|---|---|---|
| **#100** | Add Ghost Protocol (Full Autonomy) master toggle switch | Master toggle UI (close #99) |
| **#101** | Executive Login Screen, RBAC, Field App & Ghost Protocol Switch | Full auth layer — depends on Ghost Protocol being in |
| **#115** | Create secure backend enclave and deploy zero-trust login screen | Security hardening — after RBAC is in |

---

### Wave 10 — Marketing & Tracking

| # | Title | Why Here |
|---|---|---|
| **#117** | Add Facebook and TikTok pixel tracking (close #116) | Marketing pixels — add last to avoid polluting earlier feature diffs |

---

### Wave 11 — Conflict Resolution (Review Before Merging)

| # | Title | Action |
|---|---|---|
| **#102** | Resolve merge conflicts and push changes to GitHub | Review carefully — may be fully superseded by #145 and current `main`. Compare diff against current `main` before merging; close if no additive content remains. |

---

## Quick Reference Summary

```
Wave 1:  #147 → #121 → #124
Wave 2:  #145 → #93 → #97
Wave 3:  #140
Wave 4:  #129 → #136
Wave 5:  #142 → #132
Wave 6:  #89 → #90 → #88 → #91 → #92
Wave 7:  #94 → #95 → #96 → #104
Wave 8:  #110 → #111 → #114
Wave 9:  #100 → #101 → #115
Wave 10: #117
Wave 11: #102 (review/possibly close)

Close before starting: #116 (dup of #117), #99 (dup of #100)
```

---

## Notes

- After each wave, verify the Netlify deploy preview passes before moving to the next wave.
- Many older PRs (Waves 6–11) were branched from earlier states of `main`. If GitHub shows a merge conflict warning, use the GitHub web editor "Resolve conflicts" button or ask Copilot to rebase the branch before merging.
- PRs #121 and #124 (GitHub Actions bumps) can be merged in any order — they touch different workflow files.
