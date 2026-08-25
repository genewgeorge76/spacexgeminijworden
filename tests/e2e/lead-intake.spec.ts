import { test, expect, type Route } from '@playwright/test';

/**
 * Lead intake — regression cover for the August 2026 outage.
 *
 * Every form POSTed to /.netlify/functions/kickserv-lead, which did not exist.
 * The 404 was swallowed and a thank-you screen rendered anyway, so leads were
 * lost silently. These tests lock in the two rules that prevent a repeat:
 *
 *   1. When the function is gone, the lead still reaches Netlify Forms.
 *   2. When nothing stores the lead, the visitor is told to call — never thanked.
 */

const FUNCTION_URL = '**/.netlify/functions/kickserv-lead';
const FORMS_URL = '**/__forms.html';
const SUCCESS_TEXT = /thank you/i;

async function fillContactForm(page: import('@playwright/test').Page) {
  await page.goto('/contact');
  // The page ships a hidden SEO <h1> as well, so match on the visible one.
  await expect(page.getByRole('heading', { name: /tell us about the job/i })).toBeVisible();
  await page.getByLabel(/first name/i).fill('Playwright');
  await page.getByLabel(/^phone/i).fill('804-555-0100');
  await page.getByLabel(/job description/i).fill('Parking lot overlay ~9,000 sqft.');
  await page.getByRole('button', { name: /send|submit|request/i }).click();
}

test.describe('lead intake', () => {
  test('delivers through the function and confirms only then', async ({ page }) => {
    let payload: Record<string, unknown> | null = null;

    await page.route(FUNCTION_URL, async (route: Route) => {
      payload = JSON.parse(route.request().postData() ?? '{}');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, leadRef: 'WRD-TEST', delivered: ['netlify-forms', 'leads-api'] }),
      });
    });

    await fillContactForm(page);

    await expect(page.getByText(SUCCESS_TEXT)).toBeVisible();
    expect(payload).toMatchObject({
      firstName: 'Playwright',
      phone: '804-555-0100',
      source: 'contact_page',
      path: '/contact',
    });
  });

  test('falls back to Netlify Forms when the function is missing', async ({ page }) => {
    let formsBody = '';

    // Exactly how a missing function behaves on Netlify: the SPA fallback
    // serves index.html with a 200, so the response is HTML, not JSON.
    await page.route(FUNCTION_URL, async (route: Route) => {
      await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html></html>' });
    });

    await page.route(FORMS_URL, async (route: Route) => {
      if (route.request().method() === 'POST') {
        formsBody = route.request().postData() ?? '';
        await route.fulfill({ status: 200, body: 'OK' });
        return;
      }
      await route.continue();
    });

    await fillContactForm(page);

    await expect(page.getByText(SUCCESS_TEXT)).toBeVisible();
    expect(formsBody).toContain('form-name=contact');
    expect(formsBody).toContain('Playwright');
  });

  test('never shows a thank-you when no sink stored the lead', async ({ page }) => {
    await page.route(FUNCTION_URL, async (route: Route) => {
      await route.fulfill({ status: 404, contentType: 'text/html', body: '<!doctype html><html></html>' });
    });
    await page.route(FORMS_URL, async (route: Route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 500, body: 'nope' });
        return;
      }
      await route.continue();
    });

    await fillContactForm(page);

    // The failure message must name the phone number — a dead end is not an option.
    await expect(page.getByText(/could not confirm your request — please call 804-446-1296/i)).toBeVisible();
    await expect(page.getByText(SUCCESS_TEXT)).toHaveCount(0);
  });

  test('never POSTs a lead to "/" — the SPA fallback fakes success there', async ({ page }) => {
    const rootPosts: string[] = [];

    page.on('request', (request) => {
      if (request.method() !== 'POST') return;
      const url = new URL(request.url());
      if (url.pathname === '/') rootPosts.push(request.postData() ?? '');
    });

    await page.route(FUNCTION_URL, async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, delivered: ['netlify-forms'] }),
      });
    });

    await fillContactForm(page);
    await expect(page.getByText(SUCCESS_TEXT)).toBeVisible();

    expect(rootPosts).toHaveLength(0);
  });
});
