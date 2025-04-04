import { test, expect } from '@playwright/test';
import fs from 'fs';
//import { createObjectCsvWriter } from 'csv-writer';

test('Extract Cabinet Name and Price', async ({ page }) => {
    // Go to the cabinet page
    await page.goto('https://staging.barucabinets.com/customize');

    // Step 1: Extract Cabinet Name using the provided XPath
    const cabinetName = await page.locator("//p[@class='MuiTypography-root MuiTypography-body1 css-16rskou']").textContent();
    const cabinetTitle = await page.locator("//h4[@class='MuiTypography-root MuiTypography-h4 css-bu773g']").textContent();

    // Step 2: Extract Price (adjust the selector as per the actual price element on the page)
    const cabinetPrice = await page.locator('.price-selector').textContent(); // Replace with the correct selector for price

    // Display the extracted details in the console
    console.log(`Cabinet Name: ${cabinetName || cabinetTitle}`);
    console.log(`Price: ${cabinetPrice}`);

    // Store the extracted data into an array
    const cabinetData = [{ name: cabinetName || cabinetTitle, price: cabinetPrice }];

    // Step 3: Write the data to a CSV file
    const csvWriter = createObjectCsvWriter({
        path: 'cabinet_prices.csv',
        header: [
            { id: 'name', title: 'Cabinet Name' },
            { id: 'price', title: 'Price' }
        ]
    });

    await csvWriter.writeRecords(cabinetData);
    console.log('Cabinet name and price exported to CSV');
});
