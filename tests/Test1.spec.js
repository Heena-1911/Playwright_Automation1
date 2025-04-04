const { test, expect } = require('@playwright/test');

test('test1', async ({ page }) => {
    // Set timeout to 60 seconds
    test.setTimeout(60000);

    // Navigate to the Demoblaze website
    await page.goto('https://www.demoblaze.com/');
    
    // Wait for the page to finish loading
    await page.waitForLoadState('networkidle');
    
    // Get all product titles inside .card-title
    const titles = await page.locator('.row .col-lg-4 .card-title').allTextContents();
    
    // Define the target product name
    const productName = "Iphone 6 32gb";
    
    // Loop through the product titles and check for the target product
    for (let i = 0; i < titles.length; i++) {
        if (titles[i] === productName) {
            // Use a more reliable locator that finds the link by its text content
            const productLinkLocator = page.locator(`.row .col-lg-4 .card-title:has-text("${productName}") a`);

            // Ensure the product link is available and visible before clicking
            await productLinkLocator.waitFor({ state: 'visible', timeout: 10000 });

            // Click the corresponding product link
            await productLinkLocator.click();
            break;
        }
    }
    await page.locator("//a[text()='Add to cart']").click();
    await page.locator("#cartur").click();
    await page.getByText("Iphone 6 32gb").isVisible();
    await page.getByRole("button", {name : " Place Order"}).click();
await page.locator("id='name'").fill("heena");
await page.locator("//input[@id='country']").fill("india");
await page.getByLabel("City:").fill("surat");
await page.locator("#card").fill(4242424242424242);
await page. locator("#month").fill(5);
await page. locator("#year").fill(2015);
await page.getByText("Purchase").click();


});
