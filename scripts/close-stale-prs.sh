#!/usr/bin/env bash
# ============================================================================
# close-stale-prs.sh — J. Worden & Sons PR Cleanup Script
# ============================================================================
# Closes all stale/experimental PRs to keep the main branch clean and focused
# on the Sovereign Engine deployment.
#
# Prerequisites: GitHub CLI (`gh`) must be installed and authenticated.
#   brew install gh   # macOS
#   gh auth login     # authenticate
#
# Usage:
#   chmod +x scripts/close-stale-prs.sh
#   ./scripts/close-stale-prs.sh          # dry-run (shows what would close)
#   ./scripts/close-stale-prs.sh --execute # actually close the PRs
# ============================================================================

set -euo pipefail

REPO="genewgeorge76/J.Worden-SonsPavingfinal-gemni-site"
DRY_RUN=true

if [[ "${1:-}" == "--execute" ]]; then
  DRY_RUN=false
fi

# ── PRs to KEEP open (do NOT close these) ──────────────────────────────────
# Add PR numbers here that should remain open
KEEP_OPEN=(
  150  # Dependabot: Bump minor-and-patch group (7 dependency updates — review for merge)
)

# ── PRs to CLOSE (old experiments, duplicates, superseded work) ─────────────
# These are all experiments and feature branches that have been superseded
# by the Sovereign Master Engine on main. Code is preserved in branches.
CLOSE_PRS=(
  # Apr 17 — deployment attempts & meta-PRs (superseded by #152 merge)
  156  # Update and deploy website infrastructure — superseded by main
  155  # Update and configure project files — superseded
  154  # Update and configure files — superseded
  153  # Deploying Netlify site with SovereignEngine — superseded
  151  # Fix the repository — superseded by #152 merge
  149  # fix: resolve open PRs — meta-PR, no longer needed
  148  # docs: PR merge order guide — meta-PR, no longer needed
  147  # Fix deployment issues — superseded

  # Apr 16 — feature branches
  142  # Pre-flight audit script — experimental
  136  # fix: update JSON-LD schema markup — can be re-done if needed
  132  # feat: Kickserv lead submission — can be re-done if needed

  # Apr 14 — redirects & dependabot
  129  # Implement 301 redirects — can be re-done if needed
  124  # Bump actions/upload-artifact 4→7 — dependabot, can be re-triggered
  121  # Bump actions/checkout 4→6 — dependabot, can be re-triggered

  # Apr 13 — pixel tracking, security, dashboards
  117  # Add Facebook/TikTok pixel tracking (duplicate)
  116  # Add Facebook/TikTok pixel tracking (duplicate)
  115  # Create secure backend enclave — experimental
  114  # Create VLA models for macro-economic — experimental
  111  # Create agentic pipeline table — experimental
  110  # Style dashboard card — experimental

  # Apr 12 — SEO heatmap & merge conflicts
  104  # Add Iron Grid War Room — experimental
  102  # Resolve merge conflicts — stale

  # Apr 11 — bulk feature PRs (all experimental, superseded by Sovereign Engine)
  101  # Executive Login Screen, RBAC — experimental
  100  # Ghost Protocol toggle switch (duplicate)
  99   # Ghost Protocol autonomous mode — experimental
  97   # Add proprietary LICENSE — can be re-done
  96   # PWA manifest, /field foreman app — experimental
  95   # Iron Matrix, A/R Enforcer, Plant Pulse — experimental
  94   # Claude AI Intelligence panel — experimental
  93   # CLAUDE.md master system prompt — experimental
  92   # Labor & Subcontractor Treasury — experimental
  91   # claudeDrop.ts engine — experimental
  90   # Richmond Voice Hub — experimental
  89   # Voice Assistant v1.0 — experimental
  88   # Weather & Seasonality Module — experimental
  81   # Prized Services database — experimental
)

echo "═══════════════════════════════════════════════════════════════"
echo "  J. Worden & Sons — PR Cleanup Script"
echo "  Repository: $REPO"
echo "═══════════════════════════════════════════════════════════════"
echo ""

if $DRY_RUN; then
  echo "  ⚠️  DRY RUN — no PRs will be closed."
  echo "  Run with --execute to actually close PRs."
  echo ""
fi

echo "── PRs to KEEP OPEN ──────────────────────────────────────────"
for pr in "${KEEP_OPEN[@]}"; do
  echo "  ✅ PR #$pr — KEEP"
done
echo ""

echo "── PRs to CLOSE ────────────────────────────────────────────"
CLOSED=0
FAILED=0
for pr in "${CLOSE_PRS[@]}"; do
  if $DRY_RUN; then
    echo "  🔴 PR #$pr — would close"
  else
    echo -n "  Closing PR #$pr... "
    if gh pr close "$pr" --repo "$REPO" --comment "Closing as part of job-site cleanup. This experimental branch is superseded by the Sovereign Master Engine on main. Branch code is preserved — reopen if needed." 2>/dev/null; then
      echo "✅ closed"
      ((CLOSED++))
    else
      echo "❌ failed (may already be closed)"
      ((FAILED++))
    fi
  fi
done

echo ""
echo "═══════════════════════════════════════════════════════════════"
if $DRY_RUN; then
  echo "  DRY RUN COMPLETE: ${#CLOSE_PRS[@]} PRs would be closed"
  echo "  Run: ./scripts/close-stale-prs.sh --execute"
else
  echo "  DONE: $CLOSED closed, $FAILED failed"
fi
echo "  PRs kept open: ${#KEEP_OPEN[@]}"
echo "═══════════════════════════════════════════════════════════════"
