import { test, expect } from '@playwright/test';

test('Edit Policy', async ({ page }) => {
    // Step 1: Navigate to Login Page
    await page.goto('https://stg.narad.io/sign-in');
    console.log("🔄 Navigated to Login Page");

    // Step 2: Perform Login
    await page.getByPlaceholder('Company Domain Name').fill('your-domain');
    await page.getByPlaceholder('Email').fill('your-email');
    await page.getByPlaceholder('Password').fill('your-password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait for successful login confirmation
    await expect(page.getByText("Sign-in complete. Ready to explore?")).toBeVisible({ timeout: 10000 });
    console.log("✅ Sign-in successful!");

    // Step 3: Navigate to Policies Page
    await page.goto('https://stg.narad.io/cabinet/policies', { waitUntil: 'networkidle' });
    console.log("✅ Navigated to Policies Page");

    // Step 4: Find the "Regulatory Compliance" row
    const policyName = "Regulatory Compliance";
    const policyRow = await page.locator(`//tr[td[contains(text(), '${policyName}')]]`);
    await policyRow.waitFor({ state: 'visible', timeout: 10000 });

    // Step 5: Click the Edit Button
    const editButton = policyRow.locator("//div[@aria-label='Edit']/button[1]");
    await editButton.waitFor({ state: 'visible', timeout: 5000 });
    await editButton.click();
    console.log("✅ Clicked Edit");

    // Step 6: Wait for Edit Popup
    await page.waitForSelector('.MuiDialog-container', { timeout: 5000 });
    console.log("✅ Edit Popup Opened");

    // Step 7: Edit Policy Name
    const nameInput = page.locator("input[placeholder='Folder Name']");
    await nameInput.waitFor({ state: 'visible', timeout: 5000 });
    await nameInput.fill('QA TESTING');
    console.log("✅ Updated Policy Name");

    // Step 8: Click Update Button
    await page.locator("//p[normalize-space()='Update']").click();
    console.log("✅ Policy Updated");
});
