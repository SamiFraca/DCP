import { test, expect } from "@playwright/test";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
test("User registration", async ({ page }) => {
  // Navigate to the registration page
  await page.goto("/register");

  // Fill in the registration form
  await page.fill('input[name="email"]', "testuser@example.com");
  await page.fill('input[name="options.data.name"]', "Test");
  await page.fill('input[name="password"]', "Password123");
  await page.fill('input[name="options.data.lastName"]', "Testing");
  await page.fill('input[name="options.data.country"]', "testCountry");
  await page.selectOption('select[name="options.data.mainField"]', 'Sports');


   page.on('console', msg => console.log(msg.text()));

   // Submit the registration form
   const [response] = await Promise.all([
     page.waitForResponse(response => response.url().includes('/register') && response.status() === 200), 
     page.click('button[type="submit"]'),
   ]);

   // Check if the response was successful
   expect(response.ok()).toBeTruthy();

  await page.goto(`/en?register=success`);

  // Assert that the URL is as expected
  expect(page.url()).toBe(`${baseUrl}/en?register=success`);

  // Optionally, check if the success message is visible
  await expect(page.locator('text=/Registered succesfully!/')).toBeVisible();
});