const { test, expect, request } = require('@playwright/test');

const loginPayload = { 
    userEmail: "honey@gmail.com", 
    userPassword: "Admin@123*" 
};

let token; // Declare token globally

test.beforeAll(async () => {
    // Create API context properly
    const apiContext = await request.newContext();
    
    // Perform login request
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        json: loginPayload // Corrected payload
    });

    await new Promise(resolve => setTimeout(resolve, 5000)); // ✅ Corrected wait 

    expect(loginResponse.ok()); // Validate response

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token; // Store token globally

    console.log("Token:", token); // Debugging output
});

// Create order test
test('@API Place the order', async ({ page }) => { 
    // Inject token into localStorage before loading the page
    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
        
    await page.waitForSelector("button[routerlink*='myorders']", { timeout: 20000 });
    await page.locator("button[routerlink*='myorders']").click();
    
    
    //button[@routerlink='/dashboard/myorders']
    await page.waitForTimeout(5000); // ✅ Added wait for orders page to load

    await page.locator("tbody").waitFor();
    
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        
        if (rowOrderId && token.includes(rowOrderId)) { // Corrected condition
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    await page.waitForTimeout(3000); // ✅ Additional wait before validation
    
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(token.includes(orderIdDetails)).toBeTruthy(); // Validate order ID
});
