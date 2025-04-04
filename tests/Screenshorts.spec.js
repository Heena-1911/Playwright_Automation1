const {test,expect} = require('@playwright/test')

test("Screenshots",async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator('#displayed-text').screenshot({path:'partialScreenshot.png'});
        await page.locator("#hide-textbox").click();
        await page.screenshot({path: 'screenshot.png'});
        await expect(page.locator("#displayed-text")).toBeHidden();
    });
    //screenshot -store -> screenshot -> 
    test('visual',async({page})=>
    {
        //make payment -when you 0 balance
          await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        expect(await page.screenshot()).toMatchSnapshot('landing.png');
    
    })

    test.only('visual',async({page})=>
        {
            //make payment -when you 0 balance
              await page.goto("https://staging.barucabinets.com/");
            expect(await page.screenshot()).toMatchSnapshot('baruhome.png');
        
        })
    
    