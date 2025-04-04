const {test, expect} = require('@playwright/test')
 test('Home Page', async({page})=> {

   await page.goto('https://staging.barucabinets.com/')

    const Pagetitle= await page.title();
    console.log('Page title is: ', Pagetitle);
    await expect(page).toHaveTitle('Baru');
    await expect(page).toHaveURL('https://staging.barucabinets.com/');

    const pageURL= await page.url();
    console.log('Page url is:', pageURL);

    //await page.close();

 })