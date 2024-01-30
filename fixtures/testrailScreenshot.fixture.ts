// Note: TestRail screenshot generation for failed tests

import { test as base } from '@playwright/test';
import { v4 as randomUUID } from 'uuid';

export const test = base.extend<{ testrailScreenshot: void }>({
    testrailScreenshot: [async ({ page }, use, testInfo) => {
        await use(); // test body

        // following code is equal to .afterEach hook
        if (testInfo.status !== testInfo.expectedStatus) {
            let screenshotPath = `test-results/screenshots/screenshot-${randomUUID()}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
        }
    }, { auto: true }],
});