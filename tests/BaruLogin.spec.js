const { test, expect } = require("@playwright/test");

test("Baru Add Project", async ({ page }) => {
  // Navigate to the login page
  await page.goto("https://staging.barucabinets.com");

  // Click the "Login" button (using text selector)
  await page.locator('button:has-text("Login")').click();

  // Fill out the email and password
  await page.fill('input[name="email"]', "heena.webosmotic@gmail.com");
  await page.fill('input[name="password"]', "Heena@123*");

  // Click the login button
  await page.click('button[type="submit"]');

  // Wait for success message to appear (targeting the Toastify notification)
  const successMessageLocator = page.locator(
    'div.Toastify__toast-body:has-text("Sign in successful")'
  );

  // Wait for the message text to be visible and grab its content
  await expect(successMessageLocator).toBeVisible(); // Ensure it's visible
  const successMessageText = await successMessageLocator.textContent();
  console.log("Success message:", successMessageText);

  // Click the "Add Project" dropdown
  await page
    .locator(".MuiStack-root > div > .MuiBox-root > .MuiButtonBase-root")
    .first()
    .click();
    
  await page.getByRole("menuitem", { name: "Add a New Project" }).click();
  await page.getByLabel("Project name").click();
  await page.getByLabel("Project name").fill("heenaproejct1112323");
  await page.getByRole("button", { name: "Create" }).click();

  // Optional: Add further actions like clicking "Save" or interacting with other elements
});
