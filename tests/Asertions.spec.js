const { test, expect } = require('@playwright/test');

test('AssertionTest', async ({ page }) => {

  // Open the URL
  await page.goto('https://demo.nopcommerce.com/register');

  // Expect the page to have the specified URL
  await expect(page).toHaveURL('https://demo.nopcommerce.com/register');
  
  // Expect the page to have the correct title
  await expect(page).toHaveTitle('nopCommerce demo store. Register');

  // Verify if the element is visible
  const logoelement = page.locator("//div[@class='header-logo']");
  await expect(logoelement).toBeVisible();

  // Verify if the search box element is enabled
  const searchstorebox = page.locator('#small-searchterms');
  await expect(searchstorebox).toBeEnabled();

  // Verify if the radio button can be selected and checked
  const maleRadioButton = page.locator('#gender-male');
  await maleRadioButton.click();
  await expect(maleRadioButton).toBeChecked();

  // Verify if the checkbox is checked
  //const newsletterCheckbox = await page.locator('#Newsletter');
  //await newsletterCheckbox.click(); // Ensure it’s clicked
  //await expect(newsletterCheckbox).toBeChecked();

  // Verify if the page title element contains the text 'Register'
  const pageTitle = await page.locator('.page-title');
  await expect(pageTitle).toHaveText('Register'); // Ensures the exact text 'Register' is present

  const emailInput= await page.locator('#Email')
  await emailInput.fill('test@gmail.com')
  await expect(emailInput).toHaveValue('test@gmail.com')


 //10) expect(locator).toHaveCount()  List of elements has given length


 const options= await page.locator('select[name="DateOfBirthMonth"] option')
  await expect(options).toHaveCount(13)
})