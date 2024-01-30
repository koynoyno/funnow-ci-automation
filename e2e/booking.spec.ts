// Note: booking flow (happy path)

import { test, expect } from '../fixtures/fixtures';
import { mastercard } from '../data/creditCards';

const SPECIAL_REQUEST = 'special request'

test.use({
  locale: 'en',
});

test('booking flow', async ({ page }) => {
  await page.goto('/branches/880');
  await expect(page.locator('#user-menu')).toBeVisible();

  await page.getByLabel('Select product').click();
  await page.locator('.v-input--selection-controls__ripple').first().click();
  await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByPlaceholder('Select Booking Time').click();

  const dialogSelectBookingTime = await page.getByText('Select Booking Time');
  await dialogSelectBookingTime.filter({ hasText: 'OK' }).click()

  // await page.getByRole('button', { name: 'OK', exact: true }).click();
  await page.getByRole('button', { name: 'Next (TWD 2500)' }).click();
  await page.getByPlaceholder('Tell us your needs. We will').click();
  await page.getByPlaceholder('Tell us your needs. We will').fill('special request');
  await page.getByRole('button', { name: 'Select A Promotion' }).click();
  await page.getByText('測試用 Promo Code (中文翻譯)').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('My Credit Card').click();
  await page.getByRole('button', { name: 'Pay TWD' }).click();
  await page.getByRole('button', { name: 'Continue booking' }).click();
  await expect(page.getByText('Successful Transaction')).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByText('Booking Completed')).toBeVisible();
});