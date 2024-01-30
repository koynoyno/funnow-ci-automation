/*
  Note: test to reproduce a bug where branches on the last page of search
  redirect to the main page instead of the branch page
*/

import { test, expect } from '../fixtures/fixtures';

test.use({
  locale: 'en',
});

test.skip('Branch link opens a branch page', async ({ page }) => {
  await page.goto('/regions/1/search');
  // label value and branch name are hardcoded for the sake of simplicity
  await page.getByLabel('Goto Page 46').click();
  const branchLink = await page.getByRole('link', { name: 'Hot 哈拉影城 From TWD 240 0 (0)' });
  const branchUrl = await branchLink.getAttribute('href');
  await page.goto(branchUrl as string);
  // bug!
  await expect(page, 'Branch page should be opened')
    .toHaveURL(branchUrl as string)
});