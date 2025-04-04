const { test, expect } = require('@playwright/test');

test('Inner frames', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');

  const frame3 = await page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' });

  // Nested frame
  const childFrames = await frame3.childFrames();

  // Interacting with the first radio button (i9)
  await childFrames[0].locator("//*[@id='i9']/div[3]/div").click(); // Radio button click
  await page.waitForTimeout(5000);
 // await childFrames[0].locator("//*[@id='i21']/div[1]").waitFor({ state: 'visible', timeout: 5000 }); // Wait for the element to be visible
  await childFrames[0].locator("//*[@id='i24']/div[2]").click(); // Click
  

  // Selecting an option from the second dropdown (i27)
  await childFrames[0].locator("//*[@id='i27']/div[2]").click(); // Select box click

  // Optionally, you can log the results for debugging
  //console.log("Radio buttons and select boxes interacted with successfully.");
// Wait for the dropdown to open
await childFrames[0].locator("//*[@id='mG61Hd']/div[2]/div[1]/div[2]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]").click(); // Open dropdown

// Selecting the "Yes" option
await childFrames[0].locator("//div[@class='MocG8c HZ3kWc mhLiyf LMgvRb KKjvXb DEh1R'][@role='option']/span[text()='Yes']").click(); // Click on "Yes" option
  await page.waitForTimeout(5000); // Wait for 5 seconds to observe the action
});
