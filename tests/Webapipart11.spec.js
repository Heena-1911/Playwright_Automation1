const { test, expect, request } = require('@playwright/test');

const loginPayLoad1 = { 
    userEmail: "honey@gmial.com", 
    userPassword: "Admin@123*" 
};

let token; // Declare token globally to access outside

test.beforeAll(async ({ request }) => {
    const apiContext = await request.newContext();
    
    const loginResponse1 = await apiContext.post("https://rahulshettyacademy.com/client", {
        data: loginPayLoad
    });

    expect(loginResponse1.ok()).toBeTruthy(); // Validate successful response
    
    const loginResponseJson1 = await loginResponse1.json();
    token = loginResponseJson1.token; // Assign token value
    
    console.log(token); // Print token
});

//create order is success
test('@API Place the order1', async ({page})=>
{ 
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");


for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});