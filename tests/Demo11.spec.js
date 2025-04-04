import { test, expect } from '@playwright/test';

test('Demo12', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

   await page.locator('[id="user-name"]').click();
    await page.locator('[id="user-name"]').fill("heena");
   // await page.locator('[id="password"]').fill("test");
});
