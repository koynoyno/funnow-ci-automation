import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const testRailOptions = {
  embedAnnotationsAsProperties: true,
  outputFile: './test-results/junit-report.xml'
};

export default defineConfig({
  timeout: 30 * 1000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  // workers: process.env.CI ? 1 : undefined,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [
    ['list'],
    ['github'],
    ['junit', testRailOptions]
  ] : [['list'], ['junit', testRailOptions]],

  use: {
    baseURL: 'https://stg2-www.myfunnow.com/',
    trace: 'on-first-retry',
    locale: 'zh-TW',
    timezoneId: 'Asia/Taipei',
  },

  projects: [

    // Setup project
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use prepared auth state.
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     // Use prepared auth state.
    //     storageState: '.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     // Use prepared auth state.
    //     storageState: '.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
  ],
});
