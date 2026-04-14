# Contributing to JWORDENAI

> **J. Worden & Sons Paving & General Contracting — 4th Generation Since 1984**  
> All contributors — internal team, AI agents, and external developers — must read and follow these standards before touching any code.

---

## The Worden Quality Gate

**No PR merges unless all of these pass:**

| Check | Requirement | Tool |
|-------|-------------|------|
| TypeScript | Zero type errors in strict mode | `npx tsc --noEmit` |
| Build | Production build succeeds | `npm run build` |
| CodeQL | No new security alerts | GitHub Actions |
| Lighthouse | Score ≥ 90 on Performance, Accessibility, SEO | Lighthouse CI |
| Standards | No Worden Standard is weakened | Code review |

---

## Engineering Standards

All code must respect the **Worden Standards** (non-negotiable):

1. **96% Marshall Unit Weight** — All paving specs reference this floor
2. **VDOT Section 315 Base** — All paving specs reference VDOT aggregate base
3. **$9/Ton Oil Price Shield** — All cost calculations include the buffer
4. **Zero-Downtime Medical Compliance** — Crew scheduling respects DOT medical requirements
5. **Tier 3 Lockdown Capability** — Security logic always defaults to highest response

---

## Code Standards

### TypeScript
- Strict mode — no `any` without comment justification
- Import paths use `@/` alias for `src/`
- Type-only imports use `import type`
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### AI Modules (`src/ai/`)
- All AI calls must handle API key absence gracefully (return fallback, never crash)
- All prompts must include `WORDEN_SYSTEM_CONTEXT` from `MultiModelRouter.ts`
- RAG context must be injected for any knowledge-based query
- Never log API keys or sensitive data

### SEO
- Every page route must have: `<title>`, `<meta description>`, and at least one JSON-LD schema block
- Location pages must include LocalBusiness schema with correct `addressLocality`
- All images must have `alt` attributes

### Security
- No secrets committed to source — use `VITE_*` env vars for API keys
- Rate-limit all AI API endpoints
- All user input must be validated before passing to AI models
- `dangerouslyAllowBrowser: true` only acceptable when `VITE_` key is used (browser-safe)

---

## Commit Message Format

```
type(scope): short description

Types: feat, fix, docs, style, refactor, perf, test, chore
Scopes: ai, seo, routes, components, security, ci, research

Examples:
feat(ai): add multi-model router with Claude/GPT/Gemini support
fix(seo): correct JSON-LD schema for Richmond location page
chore(ci): add weekly SEO health report workflow
perf(routes): lazy-load dashboard components
```

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — protected, requires passing quality gate |
| `feature/...` | New features |
| `fix/...` | Bug fixes |
| `seo/...` | SEO improvements |
| `ai/...` | AI engine updates |
| `research/...` | R&D experiments |

---

## Issue Labels

Tag every issue with a business impact label:

| Label | Meaning |
|-------|---------|
| `whale-impact` | Affects $500K+ client acquisition |
| `shark-impact` | Affects $100K–$499K projects |
| `fish-impact` | Affects residential/small commercial |
| `security` | Security/vulnerability issue |
| `seo` | Search engine optimization |
| `ai-core` | JWORDENAI engine improvement |
| `government-compliance` | Federal/state compliance |
| `bug` | Something broken |
| `enhancement` | New feature/improvement |

---

## Setting Up Your Environment

```bash
# Clone and install
git clone https://github.com/genewgeorge76/J.Worden-SonsPavingfinal-gemni-site.git
cd J.Worden-SonsPavingfinal-gemni-site
npm install

# Set environment variables (copy from .env.example)
cp .env.example .env
# Add your API keys to .env

# Run dev server
npm run dev

# Type check
npx tsc --noEmit

# Build
npm run build
```

### Required Environment Variables

```bash
VITE_ANTHROPIC_API_KEY=   # Claude — for bidding/general AI
VITE_OPENAI_API_KEY=      # GPT-4o — for scheduling AI
VITE_GEMINI_API_KEY=      # Gemini — for specs/standards AI
```

---

## R&D Contributions

All R&D work lives in the `research/` directory:

- `research/ROADMAP.md` — Add items to the next version milestone
- `research/experiments/` — Document your A/B test before starting it
- `research/specs/` — Update Worden Engineering Standards after any spec change
- `research/benchmarks/` — Record Lighthouse scores after every major release

---

## The Mission

**Dominate the 50-state infrastructure market for J. Worden & Sons.**

Every line of code serves this mission. Hunt whales. Protect margins. Never weaken the standards.

*J. Worden & Sons — 4th Generation. Since 1984. Built to Last.*
