const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false, // Run sequentially to avoid storage conflicts
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker to avoid extension conflicts
  reporter: [['html', { outputFolder: 'tests/playwright-report' }]],
  use: {
    headless: false, // Run headed for extension testing
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        // Note: Extension loading requires manual setup in headed mode
        launchOptions: {
          slowMo: 1000, // Slow down for visual verification
        }
      },
    },
  ],
});