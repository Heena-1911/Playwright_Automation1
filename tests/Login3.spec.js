const { test, expect } = require("@playwright/test");

test("@Web UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click(); //radio 2 opion so select last 1
  await page.locator("#okayBtn").click();
  expect(page.locator(".radiotextsty").last()).toBeChecked(); //verify that value is there or not
  console.log(await page.locator(".radiotextsty").last().isChecked()); //  we can use this method also

  //terms checkbox checked or uncheck
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  // await page.pause();
});
