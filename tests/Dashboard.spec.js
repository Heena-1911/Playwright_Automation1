const { test, expect } = require('@playwright/test');

test('Dashoboard', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Log the title of the page
    console.log(await page.title());

    // Set variables for reuse
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator("#signInBtn");

    // Fill in the username and password fields
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");

    // Click on the sign-in button
    await signIn.click();

    // [style*='none;'] css selector
    //await console.log(await page.locator("[style*='block']").textContent()); 
    //error message na content get karva mate

    //type - fill // username wrong htu to blank karvayu & then again correct nakhi sign in karvayu
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await page.locator(".card-body a").textContent());
    page.close();


});