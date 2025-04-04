import { test, expect } from "@playwright/test";
import { LoginPage } from "./Pages/LoginPage.js";
import { HomePage } from "./Pages/HomePage.js";
import { CartPage} from './Pages/CartPage.js';

test("Add product to cart after login", async ({ page }) => {
    // Login
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login("pavanol", "test@123");
    await page.waitForTimeout(3000);

    // Home actions
    const home = new HomePage(page);
    await home.addProductToCart("Nexus 6");
    await page.waitForTimeout(3000);
    await home.gotoCart();
     //Cart
  const cart=new CartPage(page)
  await page.waitForTimeout(3000)
  const status=await cart.checkProductInCart('Nexus 6')
  expect(await status).toBe(true);
});
