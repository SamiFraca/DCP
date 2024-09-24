import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir:'./__tests__/e2e',
  use: {
    baseURL:process.env.BASE_URL || 'http://localhost:3000',
    headless: false,  
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