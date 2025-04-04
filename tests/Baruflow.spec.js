import { test, expect } from '@playwright/test';

test('Baruflow', async ({ page }) => {



  await page.goto('https://staging.barucabinets.com/');
  const cabinetName = "Base - Left Hinge Door";
  const productscabinet = page.locator(".MuiGrid-root div p");
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Email Address*').click();
  await page.getByLabel('Email Address*').fill('heena.webosmotic+qa@gmail.com');
  await page.getByLabel('Password*').fill('Baru123!');

  await page.locator('form').getByRole('button', { name: 'Login' }).click();


  await page.locator('.MuiStack-root > div > .MuiBox-root > .MuiButtonBase-root').first().click();

  await page.getByRole('menuitem', { name: 'Add a New Project' }).click();
  await page.getByLabel('Project name').click();
  await page.getByLabel('Project name').fill('hhhdgdsghh45745hh');
  await page.getByRole('button', { name: 'Create' }).click();
await page.locator("//div[@class='MuiStack-root css-btw0e7']//div[@class='MuiBox-root css-50xlku']").click();
  
await page.locator('[value="Add a New Project"]').click();
//await page.getByText("Wall - Right Hinge Door").getByRole('button', { name: 'CUSTOMIZE' }).click();

await page.locator(".slick-track div").first().waitFor();

//await page.locator(".slick-track div .main-container")

//const titles = await page.locator(".card-body b").allTextContents(); //get all product name

 //console.log(titles);

  /*const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }*/

  /*const titlesproduct = await page.locator(".MuiGrid-root div p").first().allTextContents(); //get all product name
  console.log(titlesproduct);
//await page.locator('text=Wall - Right Hinge Door').getByRole('button', { name: 'CUSTOMIZE' }).waitFor({ state: 'visible' });
//await page.locator('text=Wall - Right Hinge Door').getByRole('button', { name: 'CUSTOMIZE' }).click();
//.MuiGrid-root div
for (let i = 0; i < count; ++i) {
  if ((await products.nth(i).locator("p").textContent()) === cabinetName) {
    //add to cart
    await products.getByRole('button', { name: 'CUSTOMIZE' }).click();
    break;
  }
}*/

//await page.getByRole('banner').getByRole('paragraph').click();
await page.getByText('Browse cabinets').click();
await page.locator('[id="\\:r12\\:"]').click();


});