#!/usr/bin/env node
/**
 * check-lead-intake — build-time guard for the lead path.
 *
 * In August 2026 every form on the site POSTed to
 * /.netlify/functions/kickserv-lead, a function that did not exist. The client
 * swallowed the 404 and showed a thank-you screen anyway, so real leads were
 * lost silently for weeks with nothing going red.
 *
 * This script makes that class of failure a build error. It runs as `prebuild`,
 * so a deploy with a broken intake path cannot ship, and in CI on every PR.
 *
 * Invariants:
 *   1. Every /.netlify/functions/<name> referenced in src/ has a function file.
 *   2. Every Netlify form name used in src/ is declared in public/__forms.html.
 *   3. public/__forms.html declares each form with data-netlify.
 *   4. No lead POSTs to "/" — the SPA fallback answers 200 and fakes success.
 *   4b. Functions use the module format package.json declares, or they throw on
 *       first invocation — the same silent 500 as a missing endpoint.
 *   5. With --dist (postbuild): __forms.html survived into the published bundle.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const FUNCTIONS_DIR = join(ROOT, 'netlify', 'functions');
const FORMS_FILE = join(ROOT, 'public', '__forms.html');
const FUNCTION_EXTENSIONS = ['.js', '.mjs', '.cjs', '.ts', '.mts'];

const failures = [];
const fail = (message) => failures.push(message);

function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...sourceFiles(full));
    } else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

if (!existsSync(SRC)) {
  console.error('[lead-intake] no src/ directory — run from the repo root.');
  process.exit(1);
}

const files = sourceFiles(SRC).map((path) => ({ path, text: readFileSync(path, 'utf8') }));
const rel = (path) => path.replace(`${ROOT}/`, '');

// ── 1. Every referenced Netlify Function exists ──────────────────────────────
// A missing function on the lead path loses a customer, so that is a hard
// failure. Elsewhere (reviews, widgets) callers fall back to static content, so
// a missing function is reported but does not block the deploy.
const referencedFunctions = new Map();
for (const { path, text } of files) {
  const onLeadPath = text.includes('lead-intake') || rel(path).endsWith('src/lib/lead-intake.ts');
  for (const match of text.matchAll(/\/\.netlify\/functions\/([A-Za-z0-9_-]+)/g)) {
    const existing = referencedFunctions.get(match[1]);
    if (!existing) {
      referencedFunctions.set(match[1], { where: rel(path), onLeadPath });
    } else if (onLeadPath && !existing.onLeadPath) {
      referencedFunctions.set(match[1], { where: rel(path), onLeadPath });
    }
  }
}

const warnings = [];
for (const [name, { where, onLeadPath }] of referencedFunctions) {
  const exists = FUNCTION_EXTENSIONS.some((ext) => existsSync(join(FUNCTIONS_DIR, `${name}${ext}`)));
  if (exists) continue;

  const message =
    `${where} calls /.netlify/functions/${name}, but netlify/functions/${name}.js does not exist.`;
  if (onLeadPath) {
    fail(`${message}\n        Every submission to it would 404 and the lead would be lost.`);
  } else {
    warnings.push(`${message} (caller falls back, so this is not blocking)`);
  }
}

// ── 2 & 3. Netlify Forms are declared where Netlify can actually find them ───
if (!existsSync(FORMS_FILE)) {
  fail(
    'public/__forms.html is missing. This is a Vite SPA, so Netlify never sees the\n' +
      '        React-rendered forms — without this file no form is registered and every\n' +
      '        submission is dropped.',
  );
} else {
  const formsHtml = readFileSync(FORMS_FILE, 'utf8');
  const declared = new Map();
  for (const match of formsHtml.matchAll(/<form\b([^>]*)>/g)) {
    const attrs = match[1];
    const name = attrs.match(/\bname="([^"]+)"/);
    if (name) declared.set(name[1], attrs);
  }

  for (const [name, attrs] of declared) {
    if (!/data-netlify="true"/.test(attrs)) {
      fail(`public/__forms.html: form "${name}" is missing data-netlify="true", so Netlify ignores it.`);
    }
  }

  const usedFormNames = new Map();
  const record = (name, path) => {
    if (!usedFormNames.has(name)) usedFormNames.set(name, rel(path));
  };
  for (const { path, text } of files) {
    // submitLead(payload, 'contact')
    for (const m of text.matchAll(/submitLead\([\s\S]*?,\s*'([A-Za-z0-9_-]+)'\s*\)/g)) record(m[1], path);
    // params.append('form-name', 'contact') / URLSearchParams entries
    for (const m of text.matchAll(/'form-name',\s*'([A-Za-z0-9_-]+)'/g)) record(m[1], path);
    // LEAD_FORM_NAME = 'lead-intake'
    for (const m of text.matchAll(/LEAD_FORM_NAME\s*=\s*'([A-Za-z0-9_-]+)'/g)) record(m[1], path);
    // <input type="hidden" name="form-name" value="contact" />
    for (const m of text.matchAll(/name="form-name"\s+value="([A-Za-z0-9_-]+)"/g)) record(m[1], path);
  }

  for (const [name, where] of usedFormNames) {
    if (!declared.has(name)) {
      fail(
        `${where} submits to Netlify form "${name}", which is not declared in public/__forms.html.\n` +
          '        Netlify rejects submissions for forms it has not detected.',
      );
    }
  }
}

// ── 4. Nothing posts a lead to "/" ───────────────────────────────────────────
for (const { path, text } of files) {
  if (/fetch\(\s*'\/'\s*,/.test(text) && text.includes('form-name')) {
    fail(
      `${rel(path)} POSTs a form to "/". The SPA fallback redirect answers that with\n` +
        '        index.html and HTTP 200, so a lost lead looks delivered. POST to\n' +
        '        /__forms.html via submitLead() instead.',
    );
  }
}

// ── 4b. Functions match the package's module format ─────────────────────────
// package.json says "type": "module", so a .js function written in CommonJS
// (exports.handler / require) throws the moment Netlify invokes it.
const pkgType = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).type;
if (existsSync(FUNCTIONS_DIR)) {
  for (const entry of readdirSync(FUNCTIONS_DIR)) {
    if (!['.js', '.mjs', '.ts', '.mts'].includes(extname(entry))) continue;
    const text = readFileSync(join(FUNCTIONS_DIR, entry), 'utf8');
    const isCommonJs = /\bexports\.handler\b/.test(text) || /\brequire\(/.test(text);

    if (pkgType === 'module' && extname(entry) === '.js' && isCommonJs) {
      fail(
        `netlify/functions/${entry} uses CommonJS, but package.json declares "type": "module".\n` +
          '        Netlify will throw on the first request. Use `export const handler` and\n' +
          '        `import`, or rename the file to .cjs.',
      );
    }

    if (!/\bexport\s+(const|default|async)\b/.test(text) && !isCommonJs) {
      fail(`netlify/functions/${entry} exports no handler.`);
    }
  }
}

// ── 5. The forms file survives the build ─────────────────────────────────────
// Only meaningful straight after a build (`--dist`, wired into postbuild);
// a stale dist/ from an older build must not fail the next prebuild.
if (process.argv.includes('--dist')) {
  const dist = join(ROOT, 'dist');
  if (!existsSync(join(dist, '__forms.html'))) {
    fail('dist/__forms.html is missing after the build — the form definitions never reach Netlify.');
  }
}

if (failures.length > 0) {
  console.error('\n[lead-intake] Lead path is broken — refusing to build:\n');
  for (const failure of failures) console.error(`  ✗ ${failure}\n`);
  console.error('  Fix the above, or leads will be silently lost in production.\n');
  process.exit(1);
}

for (const warning of warnings) console.warn(`[lead-intake] warning: ${warning}`);

console.log(
  `[lead-intake] OK — lead path verified across ${referencedFunctions.size} function reference(s) ` +
    'and the Netlify form definitions.',
);
