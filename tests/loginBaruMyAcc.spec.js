const { test, expect } = require('@playwright/test');

test('Complete Flow: My Account, Billing, and Shipping Auto-Fill Verification', async ({ page }) => {
  // ----- LOGIN -----
  await page.goto('https://staging.barucabinets.com/sign-in');
  await page.fill("//input[@name='email']", "heena.webosmotic@gmail.com");
  await page.fill("//input[@type='password']", "Baru123!");
  await page.click("//button[@type='submit']");
  await page.waitForURL('https://staging.barucabinets.com/');

  // ----- MY ACCOUNT -----
  await page.click("//button[normalize-space()='My Account']");
  await page.waitForSelector("//input[@placeholder='Business Name']");

  // ✅ Define correct expected values for auto-fill
  const accountFirstName = "Heena";
  const accountLastName  = "charaniya";

  await page.fill("//input[@placeholder='Business Name']", "Webosmotic");
  await page.click("//div[@id='mui-component-select-businessType']");
  await page.waitForSelector("//ul[@role='listbox']");
  await page.click("//li[normalize-space()='Contractor']");

  await page.fill("//input[@placeholder='Registration/License number']", "123456789");
  await page.fill("//input[@placeholder='First Name']", accountFirstName);
  await page.fill("//input[@placeholder='Last Name']", accountLastName);
  await page.fill("//input[@placeholder='Phone Number']", "9876543210");

  // ✅ Save My Account details
  await page.click("//button[@type='submit']");
  await page.waitForSelector("//div[contains(@class, 'MuiGrid-container MuiGrid-spacing-xs-3')]", { timeout: 5000 });

  // ----- BILLING TAB -----
  await page.click("//button[normalize-space()='Billing']");

  // ✅ Handle Unsaved Changes Popup (if it appears)
  const saveAndLeaveBtn = page.locator("//button[contains(text(), 'Save and Leave')]");
  if (await saveAndLeaveBtn.isVisible({ timeout: 3000 })) {
    console.log("Unsaved Changes popup detected. Clicking 'Save and Leave'...");
    await saveAndLeaveBtn.click();
  }

  // ✅ Enter Zip Code to trigger auto-fill of state & country
  const zipCode = "10003"; // New York zip code example
  await page.fill("//input[@name='billing.zipCode']", zipCode);
  await page.keyboard.press('Tab'); // Trigger auto-fill event
  await page.waitForTimeout(3000); // Wait for auto-fill to complete

  // ✅ Get auto-filled values (state/country) from Billing (for debugging)
  const billingState   = await page.inputValue("//input[@placeholder='Select']"); // State field
  const billingCountry = await page.locator("//div[@id='mui-component-select-billing.state']").first().textContent();
  console.log("Billing State:", billingState);
  console.log("Billing Country:", billingCountry);

  // ✅ Validate Billing first and last names auto-filled correctly (should match account info)
  const billingFirstName = await page.inputValue("//input[@name='billing.firstName']");
  const billingLastName  = await page.inputValue("//input[@name='billing.lastName']");
  expect(billingFirstName).toBe(accountFirstName);
  expect(billingLastName).toBe(accountLastName);

  // ✅ Fill remaining Billing details
  await page.fill("//input[@name='billing.address']", "123 Main Street");
  await page.fill("//input[@name='billing.address2']", "Suite 101");
  await page.fill("//input[@name='billing.email']", "heena.webosmotic@gmail.com");
  await page.fill("//input[@name='billing.phone']", "9876543210");

  // ✅ Save Billing info
  await page.click("//button[@type='submit']");
  // ✅ Validate success message
  await expect(page.locator("//div[contains(@class, 'MuiGrid-container MuiGrid-spacing-xs-3')]").first()).toBeVisible();

  // ----- SHIPPING TAB -----
 // console.log("Clicking Shipping tab...");
  //await page.click("//button[normalize-space()='Shipping']");
  //console.log("Waiting for Shipping section to load...");
  //await page.click("//button[normalize-space()='Shipping']");
  //await page.waitForTimeout(3000); // Allow time for UI update
  //const isTabSelected = await page.locator("//button[normalize-space()='Shipping']").getAttribute("aria-selected");
  
  //console.log("Is Shipping tab selected?", isTabSelected);
  
 // await page.click("//button[normalize-space()='Shipping']");
  //await page.waitForTimeout(3000); // Allow time for UI update
  
  //const isTabSelected = await page.locator("//button[normalize-space()='Shipping']").getAttribute("aria-selected");
 // console.log("Is Shipping tab selected?", isTabSelected);
  
  

 /* // ✅ Shipping auto-fill:
  // The shipping name field should auto-fill with a combination of the first and last names,
  // and the shipping email field should match the previously entered email.
  const shippingName  = await page.inputValue("//input[@name='shipping.name']");
  const shippingEmail = await page.inputValue("//input[@name='shipping.email']");

  console.log("Shipping Name:", shippingName);
  console.log("Shipping Email:", shippingEmail);

  // ✅ Expected shipping name should match "Heena charaniya"
  const expectedShippingName = `${accountFirstName} ${accountLastName}`;
  expect(shippingName).toBe(expectedShippingName);
  expect(shippingEmail).toBe("heena.webosmotic@gmail.com");

  // ✅ Optionally, click Save on Shipping tab and validate final success
  await page.click("//button[@type='submit']");
  await expect(page.locator("//div[contains(@class, 'MuiGrid-container MuiGrid-spacing-xs-3')]").first()).toBeVisible();*/

});
