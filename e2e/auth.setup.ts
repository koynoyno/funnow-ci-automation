import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

const LOGIN_PARAMS = {
    "username": process.env.MYFUNNOW_USERNAME as string,
    "password": process.env.MYFUNNOW_PASSWORD as string,
    "os": "automation", // necessary fields, otherwise request will fail
    "osVersion": "Playwright",
    "appVersion": "1.0",
    "deviceId": "PW",
    "verification_token": "0"
}

// API authentication, faster
setup('authenticate', async ({ request }) => {
    await request.post('/v2/funnow/login', {
        data: LOGIN_PARAMS
    });
    await request.storageState({ path: authFile });
});

// UI authentication, slower
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