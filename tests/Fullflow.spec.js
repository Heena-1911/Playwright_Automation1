const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("@Fullflow", async ({ page }) => {
  const email = "honey@gmial.com";
  const productName = "IPHONE 13 PRO";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Admin@123*");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  const titles = await page.locator(".card-body b").allTextContents(); //get all product name

  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  //await page.pause();

  //await page.locator("div li").first().waitFor();
  await page.locator("div ul li").first().waitFor();
  const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();

  // Fill the first .input.txt element with "123"
  const inputField = await page.locator(".input.txt").nth(0); //first element ne click karva
  await inputField.fill("123"); // Fill the input box with the value "123"

  await page.locator(".input.txt").nth(1).fill("honey tester");

  //rahulshettyacademy

      // Apply coupon
  //const couponInput = page.locator('[name="coupon"]');
  //await couponInput.waitFor({ state: 'visible' });
 // await couponInput.fill("rahulshettyacademy");

  //const applyCouponButton = page.locator("text=Apply Coupon");
  //await applyCouponButton.waitFor({ state: 'visible' });  // Use waitFor here, not waitForLoadState
  //await applyCouponButton.click();

  await page.locator("[placeholder='Select Country']").pressSequentially("ind"); //when we type each leter line by line
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);  //first element 
  await page.locator(".action__submit").click(); //classname
  await expect(page.locator(".hero-primary")).toHaveText(  " Thankyou for the order. "); //tohavetext text is there not for verify
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); //textconten for get a text   use two class with space 
  console.log(orderId); //for print

  //for my order page code

  await page.locator("li [routerlink='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();


await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

   //for order details page 
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 

  // await expect(page.locator("div p").first().toHaveText( honey@gmial.com ));
    //await expect (await page.getByText(" honey@gmial.com ").toHaveText( honey@gmial.com ));
    //await expect (await page.getByTitle(" IPHONE 13 PRO ")).toHaveText( IPHONE 13 PRO );

    const text = await page.locator('text= IPHONE 13 PRO ').textContent();
    expect(text).toBe(' IPHONE 13 PRO ');
    

  });
  
 
 


