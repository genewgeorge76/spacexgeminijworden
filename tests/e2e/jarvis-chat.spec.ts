import { test, expect, type Route } from '@playwright/test';

/**
 * Jarvis chat — verifies the floating concierge widget end-to-end.
 *
 * Asserts:
 *   1. FAB mounts (after idle), opens panel, focuses input
 *   2. Sending a question POSTs to the chat endpoint with session_id + page_context
 *   3. Backend reply renders, quick_reply chips render and are clickable
 *   4. Handoff="form" surfaces the Free Estimate CTA
 *   5. ESC closes the panel and returns focus to the FAB
 *
 * The chat endpoint is fully intercepted; this test never touches Railway.
 */

const CHAT_URL_GLOB = '**/api/v1/public/chat';

test.describe('jarvis chat widget', () => {
  test('opens, sends a message, renders reply + quick replies + handoff CTA', async ({ page }) => {
    let chatHits = 0;
    let lastBody: Record<string, unknown> | null = null;

    await page.route(CHAT_URL_GLOB, async (route: Route) => {
      chatHits += 1;
      try {
        lastBody = JSON.parse(route.request().postData() ?? '{}');
      } catch {
        lastBody = {};
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message:
            "Yes — driveway sealcoating in Chester runs roughly $0.15–$0.35 per square foot. Want a free site estimate?",
          quick_replies: ['Book my free estimate', 'Call me now', 'How long does it last?'],
          handoff: 'form',
          session_id: (lastBody?.session_id as string) ?? 'mock-sid',
        }),
      });
    });

    await page.goto('/');

    // Widget is lazy/idle-mounted — wait up to 6s for the FAB to appear.
    const fab = page.getByTestId('jarvis-fab');
    await expect(fab).toBeVisible({ timeout: 6_000 });

    await fab.click();

    const panel = page.getByTestId('jarvis-panel');
    await expect(panel).toBeVisible();

    const input = page.getByTestId('jarvis-input');
    await expect(input).toBeFocused();

    await input.fill('Do you sealcoat driveways in Chester?');
    await page.getByTestId('jarvis-send').click();

    await expect
      .poll(() => chatHits, { timeout: 6_000, message: 'chat backend was not called' })
      .toBeGreaterThanOrEqual(1);

    expect(lastBody).toMatchObject({
      message: 'Do you sealcoat driveways in Chester?',
      page_context: '/',
    });
    expect(typeof (lastBody as unknown as Record<string, unknown>)?.session_id).toBe('string');

    // Reply text renders
    await expect(panel.getByText(/sealcoating in Chester/i)).toBeVisible();

    // Quick-reply chips render
    await expect(panel.getByRole('button', { name: 'Book my free estimate' })).toBeVisible();
    await expect(panel.getByRole('button', { name: 'How long does it last?' })).toBeVisible();

    // Handoff CTA renders for handoff='form'
    await expect(panel.getByRole('link', { name: /free estimate/i })).toBeVisible();

    // ESC closes and returns focus to the FAB
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(fab).toBeFocused();
  });
});
