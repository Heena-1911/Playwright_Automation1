// Import necessary Playwright modules
import { test, expect } from '@playwright/test';

test('locators', async ({ page }) => {
    // Navigate to the Demoblaze website
 //const context= browser.newContext();


    await page.goto('https://www.demoblaze.com/');

    // Click on the login button using the correct selector
    await page.locator('id=login2').click();

   // await page.click('#login2');  //id etle # use karyu 
    // Fill in the username
    //await page.locator('#loginusername').fill("pavanol") //1st method
    await page.fill('#loginusername', 'pavanol'); //id use karelu che

    // Fill in the password using CSS selector
    await page.fill('input[id="loginpassword"]', 'test@123');

    // Click on the login button using XPath
    await page.click('(//button[normalize-space()="Log in"])[1]');  //xpath use karyo

    // Verify the presence of the logout link
    const logoutLink = await page.locator('(//a[normalize-space()="Log out"])[1]');
    await expect(logoutLink).toBeVisible();

    // Close the page
    await page.close(); 
});