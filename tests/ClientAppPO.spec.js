const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./POM/LoginPage.js'); // Ensure this file exists
const { DashboardPage } = require('./POM/DashboardPage.js')
const { CartPage } = require('./POM/CartPage.js'); // New Cart Page

test.describe('E-commerce Flow', () => {
    test('User should be able to login and add a product to the cart', async ({ page }) => {
        // Test Data
        const email = "honey@gmail.com";  // Fixed typo in "gmail"
        const password = "Admin@123*";  
        const productName = "IPHONE 13 PRO";

        // Step 1: Login
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(email, password);

        // Step 2: Wait for products to load
        await page.waitForSelector(".card-body");

        // Step 3: Find all products
        const products = page.locator(".card-body");
        const count = await products.count();

        for (let i = 0; i < count; i++) {
            const productTitle = await products.nth(i).locator("b").textContent();

            if (productTitle.trim() === productName) {
                await products.nth(i).locator("text=Add To Cart").click(); // Ensure spacing in "Add To Cart"
                break; // Stop loop after adding the product
            }
        }

        // Step 4: Navigate to cart and verify product is added
        await page.locator("[routerlink='/dashboard/cart']").click();
        const cartItem = page.locator(`h3:has-text("${productName}")`);
        await expect(cartItem).toBeVisible();

        console.log("✅ Test Passed: Product added to cart successfully!");
    });
});
