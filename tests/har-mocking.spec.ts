import { test, expect } from '@playwright/test';

// This test demonstrates how to use a HAR file to mock API responses
// 1. Record a HAR file for the API endpoint you want to mock (see docs)
// 2. Place the HAR file in your project (e.g., ./hars/fruit.har)
// 3. Use page.routeFromHAR() to replay responses from the HAR file

test('gets the json from HAR and checks the new fruit has been added', async ({ page }) => {
  // Replay API requests from HAR.
  // Either use a matching response from the HAR,
  // or abort the request if nothing matches.
  await page.routeFromHAR('./hars/fruit.har', {
    url: '*/**/api/v1/fruits',
    update: false,
  });

  // Go to the page that makes the API call
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Playwright fruit is visible (from the HAR mock)
  await expect(page.getByText('Playwright', { exact: true })).toBeVisible();
});

