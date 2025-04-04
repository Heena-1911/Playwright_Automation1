const {test,expect} = require('@playwright/test')

test("@Web Popup validations",async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
        // await page.goto("http://google.com");
         //await page.goBack();
         //await page.goForward();

         //verify that text box is visible or not
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
       await expect(page.locator("#displayed-text")).toBeHidden();

//pop up handle yes & no
       page.on('dialog',dialog => dialog.accept());  //clicl on yes or ok
      // page.on('dialog',dialog => dialog.dismiss()); //click on no or cancel
       await page.locator("#confirmbtn").click();

       //mouse hover
       await page.locator("#mousehover").hover();


       //handle farames
       const framesPage = page.frameLocator("#courses-iframe");

       //if there is 2 element & one is not visbile then use : visible
       await framesPage.locator("li a[href*='lifetime-access']:visible").click();

       //after cliking go to next page & grab the text
       //div[class='text'] h2     div.text h2
       const textCheck = await framesPage.locator(".text h2").textContent();
       console.log(textCheck.split(" ")[1]);
   
    }
);