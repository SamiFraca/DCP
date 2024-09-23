import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir:'./__tests__/e2e',
  use: {
    // Browser settings, like headless mode or viewport size
    headless: false,  // Set to true for running tests without a UI
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});