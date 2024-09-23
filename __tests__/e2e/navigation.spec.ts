import { test, expect } from '@playwright/test'
 
test('should navigate to the about page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // Find an element with the text 'projects' and click on it
  await page.click('text=Projects')
  // The new URL should be "/projects" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/en/projects')
  // The new page should contain an h1 with "Project"
  await expect(page.locator('h1')).toContainText('Projects')
})