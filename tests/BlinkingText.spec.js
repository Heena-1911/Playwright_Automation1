import { test, expect } from '@playwright/test';

test('BlinkingText', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Locate the document link using a partial href value
  const documentLink = page.locator("[href*='documents-request']");

  // Ensure the document link has the 'blinkingText' class
  await expect(documentLink).toHaveClass(/blinkingText/);
});

test('@BlinkingText', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Locate the document link using the href attribute
  const documentLink = page.locator("[href*='documents-request']");

  // Wait for the new page to open after clicking the link
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ]);

  // Assert that the new page URL contains 'documents-request'
  await expect(newPage).toHaveURL(/.*documents-request/);

  // Extract text from the new page
  const text = await newPage.locator('.red').textContent();
  console.log('Extracted Text: ', text); // Log the extracted text

  // Split the text and extract the domain without the 'if' condition
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  console.log(domain); //grab text & print it

  //grab texted added in username
  await page.locator("#username").fill(domain);
  await page.pause();
  console.log(await page.locator("#username").textContent());
});
