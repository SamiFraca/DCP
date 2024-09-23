import { test, expect } from "@playwright/test";

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

   // Listen for console messages (optional)
   page.on('console', msg => console.log(msg.text()));

   // Submit the registration form
   const [response] = await Promise.all([
     page.waitForResponse(response => response.url().includes('/register') && response.status() === 200), // Adjust this to the actual registration URL
     page.click('button[type="submit"]'),
   ]);

   // Check if the response was successful
   expect(response.ok()).toBeTruthy();
  // Wait for the URL to change to the expected one
  await page.waitForURL("http://localhost:3000/en?register=success");

  // Assert that the URL is as expected
  expect(page.url()).toBe("http://localhost:3000/en?register=success");

  // Optionally, check if the success message is visible
  await expect(page.locator("text=Registered successfully!")).toBeVisible();
});