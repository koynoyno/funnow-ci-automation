// Note: Authentication setup through API and UI, used before all tests

import { test as setup, expect } from '@playwright/test';
import { AUTH_PARAMS } from '../data/auth';

const authFile = '../.auth/user.json';

// API authentication, fast (~600ms)
setup('authenticate', async ({ request }) => {
    const response = await request.post('/v2/funnow/login', {
        data: AUTH_PARAMS
    });
    await expect(response).toBeOK();
    await request.storageState({ path: authFile });
});




// UI authentication, very slow (~8000ms)
// setup.use({
//     locale: 'en',
// });
// setup('authenticate', async ({ page }) => {
//     await page.goto('/');
//     await expect(page).toHaveTitle(/FunNow/);

//     await page.getByRole('button', { name: 'Login / Sign Up' }).click();
//     await page.getByRole('button', { name: 'Login', exact: true }).click();
//     await page.getByPlaceholder('Please enter email').click();
//     await page.getByPlaceholder('Please enter email').fill(process.env.MYFUNNOW_USERNAME as string);
//     await page.getByPlaceholder('Please enter email').press('Tab');
//     await page.getByPlaceholder('Please enter password').fill(process.env.MYFUNNOW_PASSWORD as string);
//     await page.getByPlaceholder('Please enter password').press('Enter');
//     await expect(page.locator('#user-menu')).toBeVisible();
//     await page.context().storageState({ path: authFile });
// });