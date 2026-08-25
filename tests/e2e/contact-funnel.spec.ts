import { test, expect, type Route } from '@playwright/test';

/**
 * Contact funnel — locks in the most expensive-if-broken path on the site.
 *
 * Verifies:
 *   1. /contact loads and renders the form.
 *   2. Submitting hands the lead to the shared intake path
 *      (/.netlify/functions/kickserv-lead) with the fields the CRM needs.
 *   3. The success state renders only after a sink confirms the lead.
 *
 * Fan-out to the ops backend now happens inside the function, so it is no
 * longer visible from the browser. tests/e2e/lead-intake.spec.ts covers the
 * failure modes; this file covers the happy path.
 */

test.describe('contact funnel', () => {
  test('hands the lead to the intake function and confirms', async ({ page }) => {
    let hits = 0;
    let body: Record<string, unknown> | null = null;

    await page.route('**/.netlify/functions/kickserv-lead', async (route: Route) => {
      hits += 1;
      try {
        body = JSON.parse(route.request().postData() ?? '{}');
      } catch {
        body = {};
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, leadRef: 'WRD-TEST', delivered: ['netlify-forms'] }),
      });
    });

    await page.goto('/contact');
    // The page ships a hidden SEO <h1> as well, so match on the visible one.
    await expect(page.getByRole('heading', { name: /tell us about the job/i })).toBeVisible();

    await page.getByLabel(/first name/i).fill('Playwright');
    await page.getByLabel(/^phone/i).fill('804-555-0100');
    await page.getByLabel(/job description/i).fill('Driveway sealcoat ~600 sqft, ASAP.');

    await page.getByRole('button', { name: /send|submit|request/i }).click();

    await expect
      .poll(() => hits, { timeout: 10_000, message: 'Lead intake endpoint not called' })
      .toBeGreaterThanOrEqual(1);

    expect(body).toMatchObject({
      firstName: 'Playwright',
      phone: '804-555-0100',
      jobDescription: 'Driveway sealcoat ~600 sqft, ASAP.',
      source: 'contact_page',
      path: '/contact',
    });

    await expect(page.getByText(/thank you/i)).toBeVisible();
  });
});
