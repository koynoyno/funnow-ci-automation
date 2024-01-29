import { test, expect } from '@playwright/test';

const SPECIAL_REQUEST = 'special request'

test.use({
  locale: 'en',
});

test('booking flow', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#user-menu')).toBeVisible();
});