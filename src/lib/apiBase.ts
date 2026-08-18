/**
 * apiBase — resolves the origin of the FastAPI ops backend.
 *
 * Hosting moved from Netlify to Vercel + Fly.io, which removed the
 * `/.netlify/functions/*` layer this site used to call.  Those endpoints now
 * live on the FastAPI backend (see app/routers/ in the ops repo):
 *
 *   /.netlify/functions/kickserv-lead  ->  POST {API_BASE}/api/v1/leads/website
 *   /.netlify/functions/reviews        ->  GET  {API_BASE}/api/v1/reviews
 *
 * Set VITE_API_BASE_URL to the backend origin (e.g. https://api.example.com).
 * Leaving it empty issues same-origin requests, which is correct only when the
 * SPA is served behind a proxy that forwards /api to the backend.
 */

const RAW = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '';

/** Backend origin with any trailing slash removed. */
export const API_BASE = RAW.trim().replace(/\/$/, '');

/** Build an absolute backend URL from a root-relative API path. */
export function apiUrl(path: string): string {
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
