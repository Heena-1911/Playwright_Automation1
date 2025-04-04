const { test, expect } = require('@playwright/test');

test('Checkbox', async ({ page }) => {
    // Open the target URL
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Wait for the checkboxes to be visible
    await page.waitForSelector('#sunday', { timeout: 5000 }); // Wait for 'Sunday' checkbox
    await page.waitForSelector('#Monday', { timeout: 5000 }); // Wait for 'Monday' checkbox
    await page.waitForSelector('#saturday', { timeout: 5000 }); // Wait for 'Saturday' checkbox

    // Check the checkbox for 'Sunday'
    await page.check('#sunday'); // Check Sunday checkbox

    // Assert that the 'Sunday' checkbox is checked
    await expect(page.locator('#sunday')).toBeChecked();

    // Assert that the 'Monday' checkbox is not checked
    await expect(page.locator('#Monday')).toBeUnchecked();

    // Define an array of checkbox locators
    const checkboxLocators = ['#Monday', '#sunday', '#saturday'];

    // Check all checkboxes
    for (const locator of checkboxLocators) {
        await page.check(locator); // Check each checkbox
    }

    // Optional: Wait for 3 seconds to observe the result (if needed)
    await page.waitForTimeout(3000);

    // Uncheck all checkboxes
    for (const locator of checkboxLocators) {
        if (await page.locator(locator).isChecked()) {
            await page.uncheck(locator); // Uncheck each checkbox if checked
        }
    }

    await page.waitForTimeout(3000); // Optional wait
});