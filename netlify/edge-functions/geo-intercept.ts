import type { Context } from "@netlify/edge-functions";

// Routes /strike/* — geo-annotates the SPA response so the client can
// render the correct regional landing content for rapid-dispatch sprints.
// The actual page is served by the SPA (index.html via the catch-all
// redirect); this function just attaches geo headers and passes through.
export default async (request: Request, context: Context) => {
  const response = await context.next();
  const geo = context.geo ?? {};
  const headers = new Headers(response.headers);

  headers.set("x-worden-geo-country", geo.country?.code ?? "");
  headers.set("x-worden-geo-subdivision", geo.subdivision?.code ?? "");
  headers.set("x-worden-geo-city", geo.city ?? "");
  headers.set("Cache-Control", "no-cache");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const config = {
  path: "/strike/*",
};
