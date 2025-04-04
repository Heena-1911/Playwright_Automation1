import { test, expect } from "@playwright/test";  // Import expect from Playwright

test("Register", async ({ page }) => {
  //.card-body h5
  const cardTitles = page.locator(".card-body h5 ");
  
  // Navigate to the registration page
  await page.goto("https://rahulshettyacademy.com/client");

  // Click on the register link
  await page.locator(".login-wrapper-footer-text").click();

  // Fill in the form fields
  await page.locator("#firstName").fill("Honey");
  await page.locator('[formcontrolname="lastName"]').fill("test");
  await page.locator("#userEmail").fill("honey@gmial.com");
  await page.locator("#userMobile").fill("9898989898");

  // Select an option from the occupation dropdown
  const occupationSelect = page.locator('[formcontrolname="occupation"]'); // Define the dropdown
  await occupationSelect.selectOption({ value: "2: Student" });

  // Select gender radio
  await page.locator('input[value="Male"]').click(); // Correct selector for gender
  
  // Assert that the 'Male' radio button is checked
  await expect(page.locator('input[value="Male"]')).toBeChecked();

  // Fill password and confirm password fields
  await page.locator("#userPassword").fill("Admin@123*");
  await page.locator("#confirmPassword").fill("Admin@123*");

  // Click on the checkbox to agree to the terms
  await page.locator('[type="checkbox"]').click();
  await expect(page.locator('[type="checkbox"]')).toBeChecked();  // Assert the checkbox is checked

  // Click the register/login button
  await page.locator("#login").click();
  await page.goto("https://rahulshettyacademy.com/client");
  
  // Fill in login details
  await page.locator('[type="email"]').fill("honey@gmial.com"); // Correct selector for email input
  await page.locator("#userPassword").fill("Admin@123*");

  // Click the login button
  await page.locator("#login").click();
  
  // Wait for the card titles to appear
  await page.locator(".card-body h5").first().waitFor();
  
  // If you need to get all the titles, loop through the locator
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});
