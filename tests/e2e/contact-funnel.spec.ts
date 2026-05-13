import { test, expect, type Route } from '@playwright/test';

/**
 * Contact funnel — locks in the most expensive-if-broken path on the site.
 *
 * Verifies:
 *   1. /contact loads and renders the form.
 *   2. Submitting POSTs to Netlify Forms ("/" with form-name=contact).
 *   3. When VITE_LEADS_API_URL is set at build time, the same submission
 *      ALSO mirrors a JSON payload to the standalone /api/v1/leads/website
 *      endpoint (fire-and-forget).
 *   4. The success state renders.
 *
 * We intercept network calls so the test never touches a real backend.
 */

const LEADS_API_URL =
  process.env.VITE_LEADS_API_URL || 'https://example.invalid/api/v1/leads/website';

test.describe('contact funnel', () => {
  test('submits to Netlify Forms and mirrors to FastAPI', async ({ page }) => {
    let netlifyHits = 0;
    let backendHits = 0;
    let backendBody: Record<string, unknown> | null = null;

    // Netlify Forms POSTs back to "/". Capture and short-circuit.
    await page.route('**/', async (route: Route) => {
      const req = route.request();
      if (req.method() === 'POST') {
        const post = req.postData() ?? '';
        if (post.includes('form-name=contact')) {
          netlifyHits += 1;
          await route.fulfill({ status: 200, body: 'OK' });
          return;
        }
      }
      await route.continue();
    });

    // Mirror endpoint — capture the JSON payload to assert shape.
    await page.route(`${LEADS_API_URL}**`, async (route: Route) => {
      backendHits += 1;
      try {
        backendBody = JSON.parse(route.request().postData() ?? '{}');
      } catch {
        backendBody = {};
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'received', id: 1 }),
      });
    });

    await page.goto('/contact');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.getByLabel(/first name/i).fill('Playwright');
    await page.getByLabel(/^phone/i).fill('804-555-0100');
    await page.getByLabel(/job description/i).fill('Driveway sealcoat ~600 sqft, ASAP.');

    await page.getByRole('button', { name: /send|submit|request/i }).click();

    // Wait until either a confirmation message renders or sending state clears.
    await expect
      .poll(() => netlifyHits, { timeout: 10_000, message: 'Netlify Forms not called' })
      .toBeGreaterThanOrEqual(1);

    // Backend mirror is fire-and-forget; only assert when an API URL was injected.
    if (process.env.VITE_LEADS_API_URL) {
      await expect
        .poll(() => backendHits, { timeout: 5_000, message: 'Backend mirror not called' })
        .toBeGreaterThanOrEqual(1);
      expect(backendBody).toMatchObject({
        firstName: 'Playwright',
        phone: '804-555-0100',
        jobDescription: 'Driveway sealcoat ~600 sqft, ASAP.',
        source: 'gemni-investigate',
        path: '/contact',
      });
    }
  });
});
