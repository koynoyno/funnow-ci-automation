/*
  Note: active bugs on web. These test are expected to fail until the bugs are fixed.
  These tests aren't using page objects for the sake of simplicity.
*/

import { test, expect } from '../fixtures/autoFixtures';

test.use({
  locale: 'en',
});

test.describe.configure({ retries: 0 });

// BUG 'Category' button is not visible after selecting a category
test('Category button is visible after selecting a category', async ({ page }) => {
  test.fail();
  await page.goto('/regions/1/search');
  await page.getByRole('button', { name: 'Category' }).click();
  await expect(page.getByRole('button', { name: 'Category' })).toBeVisible();
  await page.getByRole('option', { name: 'Family Outdoor' }).click();
  await page.waitForURL('**/regions/1/categories/11148');
  // bug here
  await expect(page.getByRole('button', { name: 'Category' }),
    'Category button should still be visible').toBeVisible();
});


// BUG branches on the last page of search redirect to the main page instead of the branch page
test('Branch link opens a branch page', async ({ page }) => {
  test.fail();
  await page.goto('/regions/1/search');
  await page.getByLabel('Goto Page 46').click();
  const branchLink = await page.getByRole('link', { name: 'VIESHOW' }).first();
  const branchUrl = await branchLink.getAttribute('href');
  await page.goto(branchUrl as string);
  // bug here
  await expect(page, 'Branch page should be opened')
    .toHaveURL(branchUrl as string);
});
