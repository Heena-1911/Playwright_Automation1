import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ninetheme.com/themes/goldsmith/');
  await page.getByLabel('Add to cart: “Beaded double').first().click();
  await page.locator('.panel-header > .goldsmith-panel-close').click();
  await page.getByLabel('Add to cart: “Beaded double').nth(1).click();
  await page.locator('.panel-header > .goldsmith-panel-close').click();
  await page.locator('div:nth-child(5) > .e-con-inner > div:nth-child(2) > .elementor-element > .elementor-widget-container > .section-custom-categories > div > .goldsmith-products > div:nth-child(5) > .woocommerce > .goldsmith-product-thumb-wrapper > .product_type_simple').click();
  await page.getByRole('link', { name: 'View Cart' }).nth(1).click();
  await page.locator('.quantity > div:nth-child(4)').first().click();
  await page.getByRole('link', { name: 'Proceed to checkout' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('jack');
  await page.getByRole('textbox', { name: 'First name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('thomas');
  await page.getByRole('textbox', { name: 'Company name (optional)' }).click();
  await page.getByRole('textbox', { name: 'Company name (optional)' }).fill('test company');
  await page.getByRole('textbox', { name: 'United States (US)' }).click();
  await page.getByRole('option', { name: 'United States (US)', exact: true }).click();
  await page.getByRole('textbox', { name: 'Street address *' }).click();
  await page.getByRole('textbox', { name: 'Street address *' }).fill('23');
  await page.getByRole('textbox', { name: 'Apartment, suite, unit, etc' }).click();
  await page.getByRole('textbox', { name: 'Apartment, suite, unit, etc' }).fill('railstone');
  await page.getByRole('textbox', { name: 'Town / City *' }).click();
  await page.getByRole('textbox', { name: 'Town / City *' }).fill('newyork');
  await page.getByRole('combobox', { name: 'State' }).click();
  await page.getByRole('option', { name: 'New York' }).click();
  await page.getByRole('textbox', { name: 'ZIP Code *' }).click();
  await page.getByRole('textbox', { name: 'ZIP Code *' }).fill('10003');
  await page.getByLabel('Phone *').click();
  await page.locator('#billing_email').click();
  await page.locator('#billing_email').fill('test1@gmail.com');
  await page.getByLabel('Cash on delivery').check();
  await page.getByLabel('I have read and agree to the').check();
  await page.getByRole('button', { name: 'Place order' }).click();
});