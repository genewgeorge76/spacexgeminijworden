/**
 * JWORDENAI: 50-STATE GEO-INTERCEPTOR
 * -----------------------------------
 * Runs on Netlify's Edge network. Detects user IP location in milliseconds
 * and passes the market data to the React front-end for shape-shifting.
 */
import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const response = await context.next();

  // Extract location or default to Corporate HQ location
  const city = context.geo?.city || "Richmond";
  const region = context.geo?.subdivision?.code || "VA";

  // Inject the location into a secure cookie for the frontend to read
  response.headers.append(
    "Set-Cookie",
    `jworden_market=${city}|${region}; Path=/; Secure; SameSite=Lax`
  );

  return response;
};
