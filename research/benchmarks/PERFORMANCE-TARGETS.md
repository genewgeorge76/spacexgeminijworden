# Performance Benchmarks — JWORDENAI

> Run these benchmarks before every major release. Target: All GREEN.

## Core Web Vitals Targets

| Metric | Target | Critical Fail |
|--------|--------|--------------|
| LCP (Largest Contentful Paint) | < 2.5s | > 4.0s |
| FID (First Input Delay) | < 100ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| TTFB (Time to First Byte) | < 600ms | > 1800ms |
| FCP (First Contentful Paint) | < 1.8s | > 3.0s |

## Lighthouse Score Targets

| Category | Target | Minimum |
|----------|--------|---------|
| Performance | ≥ 95 | ≥ 90 |
| Accessibility | ≥ 95 | ≥ 90 |
| Best Practices | ≥ 95 | ≥ 90 |
| SEO | 100 | ≥ 95 |
| PWA | n/a | n/a |

## AI Response Latency Targets

| Task | Target | Maximum |
|------|--------|---------|
| Bid proposal generation | < 8s | < 15s |
| Spec lookup (RAG) | < 3s | < 5s |
| Voice recognition | < 2s | < 4s |
| Model routing decision | < 50ms | < 200ms |

## Bundle Size Targets

| Asset | Target | Maximum |
|-------|--------|---------|
| Initial JS bundle | < 150KB gzip | < 200KB gzip |
| CSS | < 20KB gzip | < 30KB gzip |
| Total page weight | < 300KB | < 500KB |

## How to Run Benchmarks

```bash
# Lighthouse CI
npx lighthouse https://jwordenasphaltpaving.com --output=json --output-path=./research/benchmarks/latest.json

# Bundle analysis
npm run build && npx vite-bundle-visualizer

# Core Web Vitals (via web-vitals library)
# Already instrumented in src/utils/plantPulse.ts
```

## Benchmark History

| Date | Performance | Accessibility | SEO | Notes |
|------|-------------|---------------|-----|-------|
| 2026-04-13 | Pending | Pending | Pending | Initial baseline |
