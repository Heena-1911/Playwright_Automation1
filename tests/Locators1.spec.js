const { test, expect } = require('@playwright/test');

test('Built-in locators', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Verify the logo is visible
  const logo = await page.getByAltText('company-branding');
  await expect(logo).toBeVisible();

  // Use getByPlaceholder correctly to fill in the username and password fields
  await page.getByPlaceholder('Username').fill('Admin'); // Corrected placeholder text for 'Username'
  await page.getByPlaceholder('Password').fill('admin123'); // Corrected placeholder text for 'Password'
  
  // Locate and click the submit button using getByRole with name property instead of type
  await page.getByRole('button', { name: 'Login' }).click(); // Changed from 'type' to 'name' property
  
  // Get the name text content and verify visibility
  const name = await page.locator("//p[@class='oxd-userdropdown-name']").textContent(); // Fixed the string quotation style in locator
  await expect(page.getByText(name)).toBeVisible(); // Pass `name` variable correctly instead of a hardcoded string
});