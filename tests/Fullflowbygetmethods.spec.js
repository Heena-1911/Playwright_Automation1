const { test, expect } = require('@playwright/test');
const { waitForDebugger } = require('inspector');

test('@fullflow by get methods', async ({ page }) => {
   const email = "anshika@gmail.com";
   const productName = 'Banarsi Saree';

   // Navigate to the login page
   await page.goto("https://rahulshettyacademy.com/client");

   // Login
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button', { name: "Login" }).click();
   
   // Wait for page load and ensure elements are available
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   // Add item to the cart
   const addToCartButton = await page.locator(".card-body").filter({ hasText: productName }).getByRole("button", { name: "Add to Cart" });
   //await addToCartButton.waitFor({ state: 'visible', timeout: 60000 });  // 1 minute timeout
   // Ensure the button is visible
   //await page.pause();
   await addToCartButton.click();

   // Navigate to cart
   await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();
   
   // Wait for cart items and check for ZARA COAT 3 in cart
   await page.locator("div li").first().waitFor();
   await expect(page.getByText(productName)).toBeVisible();

   // Proceed to checkout
   await page.getByRole("button", { name: "Checkout" }).click();
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   
   // Select India from the country optionsclear
   await page.getByRole("button", { name: "India" }).nth(1).click();
   await page.getByText("PLACE ORDER").click();
   
   // Verify the order confirmation message
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   
   // Verify the order ID and other order details
   await expect(page.locator("//label[normalize-space()='| 675d2653e2b5443b1ff2e626 |']")).toBeTruthy();
   await expect(page.getByText(productName)).toBeVisible();
  // await expect(page.getByText("$ 31500")).toBeVisible();
});
