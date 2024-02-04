/* 
    https://playwright.dev/docs/test-fixtures#automatic-fixtures

    autoFixtures.ts combines all of the automatically applied fixtures 
    and exports `test, expect` modules for using in tests.

    To use automatic fixtures, import `test, expect` as following:
    import { test, expect } from '../autoFixtures';
*/

import { mergeTests } from '@playwright/test';
import { test as testrailScreenshot } from './testrailScreenshot.fixture';

export const test = mergeTests(testrailScreenshot);
export { expect } from '@playwright/test';