const { test, expect } = require('@playwright/test');
const { Eyes, Target } = require('@applitools/eyes-playwright');

// Initialize Applitools Eyes
const eyes = new Eyes();

test('Visual Testing with Applitools and Playwright', async ({ page }) => {
  // Open the browser page using Playwright
  await page.goto('https://webosmotic.com/'); // Replace with your website URL

  // Start visual testing session with Applitools Eyes
  await eyes.open(page, 'TestApp', 'Visual Test Scenario');

  // Perform a visual check using Applitools
  await eyes.check('Homepage', Target.window().fully()); // Fully capture the window

  // Close the Applitools Eyes session and confirm results
  await eyes.close();
});
