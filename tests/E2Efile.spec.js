const { test, expect } = require('@playwright/test');
const LoginPage = require('../BaruTest/LoginPage.js'); // Remove extra "BaruTest/"
const Myacc = require('../BaruTest/myacc.js');


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openurl();
    await loginPage.Login('heena.webosmotic@gmail.com', 'Baru123!');
    await expect(page).toHaveURL("https://staging.barucabinets.com/sign-in");
});

test('customer information form', async ({ page }) => {
    const myAccPage = new Myacc(page); 

    await myAccPage.Customer_Info(
        'Cabinet Store',        // Customer Business Name
        'Cabinet maker',        // Customer Type
        '12345',                // Business Registration Number
        'Heena',                // First Name
        'Charaniya',            // Last Name
        'heena.webosmotic@gmail.com', // Email
        '859-696-8569'          // Phone Number
    );
});
