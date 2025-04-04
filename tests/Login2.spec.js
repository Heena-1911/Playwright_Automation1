import { test } from "@playwright/test";

test("login2", async ({ page }) => {

    const Title =  page.locator(".card-body a");
  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Log the title of the page
  console.log(await page.title());

  // Set variables for reuse
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const Titles = page.locator(".card-body a"); //parent to child add space

  // Fill in the username and password fields
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");

  // Click on the sign-in button
  await signIn.click();

  // Wait for the card elements to be visible before interacting with them
  //await cardTitles.first().waitFor();

  // Log the text of the first card title
  console.log(await WebTransportBidirectionalStream.first().textContent()); // Logs the first card title
  console.log(await Titles.nth(1).textContent()); // Logs the second card title

  // If you need to get all the titles, loop through the locator
  const allTitle = await cardTitle.allTextContents(); 
  console.log(allTitle);

  // Optionally, close the page after tests are done
  await page.close();
});
