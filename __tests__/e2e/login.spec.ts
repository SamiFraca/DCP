import { test, expect } from "@playwright/test";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
test("User log in", async ({ page }) => {
  page.goto("/login");
  await page.fill('input[name="email"]', "yooho123@yopmail.com");
  await page.fill('input[name="password"]', "test1234");

  const [response] = await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/login") && response.status() === 200
    ),
    page.click('button[type="submit"]'),
  ]);

  expect(response.ok()).toBeTruthy();

  // Wait for the URL to change to the expected one
  await page.goto(`/en?login=success`);

  // Assert that the URL is as expected
  expect(page.url()).toBe(`${baseUrl}/en?login=success`);

  // Optionally, check if the success message is visible
  await expect(page.locator("text=/Welcome back!/")).toBeVisible();
});
