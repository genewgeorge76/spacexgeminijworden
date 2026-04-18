/**
 * J. Worden & Sons — Sovereign Command service worker.
 *
 * Strategy:
 *  • Pre-cache the app shell (manifest, icons) on install so the home-screen
 *    icon can boot offline at least to the PIN screen.
 *  • Network-first for navigations (HTML) to stay current.
 *  • Cache-first for static assets (JS, CSS, images, fonts).
 *
 * Version is bumped manually; clients pick it up on the next load.
 */

const VERSION = 'jw-sovereign-v1';
const APP_SHELL = [
  '/',
  '/sovereign-command',
  '/manifest.json',
  '/icons/jw-icon-192.svg',
  '/icons/jw-icon-512.svg',
  '/icons/jw-icon-maskable.svg',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(VERSION).then((cache) =>
      Promise.all(
        APP_SHELL.map((url) =>
          cache.add(url).catch(() => {
            /* best-effort precache */
          }),
        ),
      ),
    ),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never intercept cross-origin or Netlify function calls.
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/.netlify/')) return;

  // Network-first for HTML navigations so deploys are picked up immediately.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(VERSION);
          cache.put('/', fresh.clone()).catch(() => {});
          return fresh;
        } catch {
          const cached = await caches.match('/');
          if (cached) return cached;
          return new Response(
            '<h1>Offline — Sovereign Command unavailable.</h1>',
            { headers: { 'content-type': 'text/html; charset=utf-8' }, status: 503 },
          );
        }
      })(),
    );
    return;
  }

  // Cache-first for static assets.
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req)
        .then((res) => {
          if (!res || res.status !== 200 || res.type !== 'basic') return res;
          const clone = res.clone();
          caches.open(VERSION).then((cache) => cache.put(req, clone));
          return res;
        })
        .catch(() => hit);
    }),
  );
});
