import { test, expect } from '@playwright/test';

test('Edit and Delete Policy', async ({ page }) => {
    // Step 1: Navigate to Login Page
    await page.goto('https://stg.narad.io/sign-in');
    console.log("🔄 Navigated to Login Page");

    // Step 2: Perform Login
    await page.fill('input[placeholder="Company Domain Name"]', 'enterprise');
    await page.fill('input[placeholder="Email"]', 'heena.webosmotic+enterprise@gmail.com');
    await page.fill('input[placeholder="Password"]', 'Narad123!');
    await page.click('button:has-text("Sign in")');

    // Wait for successful login confirmation
    await expect(page.locator('text=Sign-in complete. Ready to explore?')).toBeVisible({ timeout: 10000 });
    console.log("✅ Sign-in successful!");

    // Step 3: Navigate to Policies Page
    await page.goto('https://stg.narad.io/cabinet/policies', { waitUntil: 'networkidle' });
    console.log("✅ Navigated to Policies Page");

    // Step 4: Click the First Edit Button
    const editButton = page.locator('(//div[@aria-label="Edit"]/button)[1]');
    await editButton.waitFor({ state: 'visible', timeout: 10000 });
    await editButton.click();
    console.log("✅ Clicked First Edit Button");

    // Step 5: Wait for Edit Popup
    const editPopup = page.locator('.MuiDialog-container');
    await editPopup.waitFor({ state: 'visible', timeout: 10000 });
    console.log("✅ Edit Popup Opened");

    // Step 6: Retrieve and Update Policy Name
    const nameInput = editPopup.locator('input[placeholder="Folder Name"]');
    await nameInput.waitFor({ state: 'visible', timeout: 5000 });
    const currentPolicyName = await nameInput.inputValue();
    const newPolicyName = `${currentPolicyName} NEW`;
    await nameInput.fill(newPolicyName);
    console.log(`✅ Updated Policy Name to: ${newPolicyName}`);

    // Step 7: Click Update Button (Fixed selector)
    await page.locator('//p[text()="Update"]').click();
    console.log("✅ Clicked Update Button");

    // Step 8: Wait for success message after update
    const editSuccessMessageLocator = page.locator('.MuiAlert-message');
    await editSuccessMessageLocator.waitFor({ state: 'visible', timeout: 10000 });
    const editSuccessMessage = await editSuccessMessageLocator.innerText();
    console.log(`✅ Edit Success Message: ${editSuccessMessage}`);

    // Step 9: Wait for a moment to ensure UI is updated
    await page.waitForTimeout(2000);

    // Step 10: Click Delete Button for the edited policy
    const deleteButton = page.locator(`//p[contains(text(), "${newPolicyName}")]/ancestor::tr//button[@aria-label="Delete"]`);
    await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await deleteButton.click();
    console.log("✅ Clicked Delete Button");

    // Step 11: Handle Delete Confirmation Dialog
    const deleteDialog = page.locator('.MuiDialog-paper');
    await deleteDialog.waitFor({ state: 'visible', timeout: 10000 });
    console.log("✅ Delete Confirmation Dialog Opened");

    // Step 12: Click Yes on confirmation dialog
    await page.locator('button:has-text("Yes")').click();
    console.log("✅ Clicked 'Yes' in Confirmation Dialog");

    // Step 13: Wait for success message after delete
    const deleteSuccessMessageLocator = page.locator('.MuiAlert-message');
    await deleteSuccessMessageLocator.waitFor({ state: 'visible', timeout: 10000 });
    const deleteSuccessMessage = await deleteSuccessMessageLocator.innerText();
    console.log(`✅ Delete Success Message: ${deleteSuccessMessage}`);

    // Step 14: Verify policy is removed
    await expect(page.locator(`text=${newPolicyName}`)).not.toBeVisible({ timeout: 10000 });
    console.log("✅ Policy removal verified");
});
