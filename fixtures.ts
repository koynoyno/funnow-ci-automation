/* 
    fixtures.ts combines all of the applied fixtures 
    and exports test, expect modules for use in tests

    to use fixtures, import test and expect in your test file as following:
    import { test, expect } from '../fixtures';
*/

import { mergeTests } from '@playwright/test';
import { test as testrailScreenshot } from './e2e/helpers/testrailScreenshot.fixture';

export const test = mergeTests(testrailScreenshot);
export { expect } from '@playwright/test';