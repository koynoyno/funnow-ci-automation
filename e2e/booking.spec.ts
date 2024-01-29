import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

const SPECIAL_REQUEST = 'special request'

test.use({
  locale: 'en',
});

// TestRail screenshot attachment for failed tests
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    let screenshotPath = `test-results/screenshots/screenshot-${randomUUID()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
  }
});

test('booking flow', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#user-menu')).toBeVisible();
});