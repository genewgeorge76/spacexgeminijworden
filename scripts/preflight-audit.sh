#!/usr/bin/env bash
# JWordenAI™ PRE-FLIGHT AUDIT
# Legacy Leadership Calibration — verifies the Library is intact before Commencing Build.

set -euo pipefail

echo "------------------------------------------------"
echo "Starting Worden Alliance Pre-Flight Audit..."
echo "------------------------------------------------"

# Netlify sets CONTEXT to one of: production, deploy-preview, branch-deploy, dev
CONTEXT="${CONTEXT:-dev}"
IS_PROD="false"
if [ "$CONTEXT" = "production" ]; then
  IS_PROD="true"
fi

# 1. Essential Environment Variables ------------------------------------------
# VITE_SITE_URL is the Canonical Anchor — required in every context.
if [ -z "${VITE_SITE_URL:-}" ]; then
  echo "ERROR: Site URL not found. Canonical Anchor missing."
  exit 1
fi

# GA4 ID is required on production deploys. On previews and local dev we
# downgrade to a warning so builds aren't halted while the key is intentionally
# absent (the runtime guards against a missing ID — see GoogleIntelligence.tsx).
if [ -z "${VITE_GA4_MEASUREMENT_ID:-}" ]; then
  if [ "$IS_PROD" = "true" ]; then
    echo "ERROR: GA4 ID is missing from the Library. Production build halted."
    exit 1
  else
    echo "WARNING: GA4 ID not set (context=$CONTEXT). Analytics will be skipped at runtime."
  fi
fi

# 2. CrossSectionViewer Dependencies ------------------------------------------
# The Worden Standard cross-section is rendered as an inline SVG diagram — no
# three.js / WebGL dependency is required. Verify the component is present so
# routes importing it won't break the build.
VIEWER="src/components/CrossSectionViewer.tsx"
if [ ! -f "$VIEWER" ]; then
  echo "ERROR: $VIEWER is missing — CrossSectionViewer cannot render."
  exit 1
fi

if ! grep -q "<svg" "$VIEWER"; then
  echo "ERROR: $VIEWER no longer contains an <svg> element. Cross-section render will fail."
  exit 1
fi

echo "Audit Complete. The Gold Standard is maintained. Commencing Build..."
exit 0
