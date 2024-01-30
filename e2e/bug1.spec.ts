/*
  Note: test to reproduce a bug where 'Category' button 
  is not visible after selecting a category 
*/

import { test, expect } from '../fixtures';

test.use({
  locale: 'en',
});

test.only('Category button is visible after selecting a category', async ({ page }) => {
  await page.goto('/regions/1/search');
  await page.getByRole('button', { name: 'Category' }).click();
  await expect(page.getByRole('button', { name: 'Category' })).toBeVisible();
  await page.getByRole('option', { name: 'Family Outdoor' }).click();
  await page.waitForURL('**/regions/1/categories/11148');
  // bug! Category button should be still visible
  await expect(page.getByRole('button', { name: 'Category' })).toBeVisible();
});