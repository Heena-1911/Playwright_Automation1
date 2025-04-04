import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test('Baruregister', async ({ page }) => {

    await page.goto('https://staging.barucabinets.com/');
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.locator("name='businessName'").fill("teststore");
    await page.locator("//div[@id='mui-component-select-businessType']").selectOption("Cabinet maker");
    await page.locator("#:ri:").fill("124124");
    await page.getByPlaceholder("First Name").fill("heena");
    await page.locator("name='lastName'").fill("tester");
await page.getByRole('type', text).fill("heena.webosmotic+qa1@gmail.com");
await page.locator("//input[@id=':rf:']").fill("Baru123!");
await page.locator("//input[@id=':rg:']").fill("346-346-3463");
await page.getByRole('button', {name: "submit"}).click();

});