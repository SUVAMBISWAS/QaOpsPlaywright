// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: 'html',
  use: {
    headless: false,
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        viewport:{width:800, height:800},
        ignoreHTTPSErrors: true,
        permissions:['geolocation'],
        video:'retain-on-failure'
      },
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 11'],
        headless: false,
        screenshot: 'on',
        trace: 'on',
      },
    },
  ],
});
