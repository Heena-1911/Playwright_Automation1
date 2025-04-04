import { test, expect } from '@playwright/test';
import path from 'path';

test('Upload file, verify in table, and open preview', async ({ page }) => {
    // **File name for dynamic verification**
    const uploadedFileName = 'SBI Policy.pdf'; // Change this if needed
    const filePath = path.join('/home/webosmotic/Documents/NARAD/sbi/', uploadedFileName);

    // **Go to sign-in page**
    await page.goto('https://stg.narad.io/sign-in');

    // **Login**
    await page.getByPlaceholder('Company Domain Name').fill('amazoninfo');
    await page.getByPlaceholder('Email').fill('heena.webosmotic+info@gmail.com');
    await page.getByPlaceholder('Password').fill('Narad123!');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // **Wait for the dashboard to load**
    await page.waitForTimeout(5000);

    // **Go to 'Policies' page**
    await page.goto('https://stg.narad.io/cabinet/policies');

    // **Click 'Add' → 'Upload Files'**
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByText('Upload Files').click();

    // **Ensure correct file input is available**
    const fileInput = page.locator('#file-input-main'); // Select only the correct file input

    // **Upload the file**
    await fileInput.setInputFiles(filePath);

    // **Wait for upload to complete**
    await page.waitForTimeout(5000);

    // **Assert success message appears**
    const successMessage = page.getByText('File uploaded successfully');
    await expect(successMessage).toBeVisible({ timeout: 10000 });

    console.log('✅ File upload success message verified.');

    // **Find the uploaded file dynamically in the table**
    const fileLocator = page.locator(`p.MuiTypography-root[aria-label="${uploadedFileName.replace('.pdf', '')}"]`);

    // **Assert file is visible in the table**
    await expect(fileLocator).toBeVisible({ timeout: 10000 });

    console.log('✅ File verified in the table.');

    // **Click 'Preview' icon in the correct row**
    const row = fileLocator.locator('xpath=ancestor::tr'); // Get the parent row of the file
    await row.getByLabel('Preview').click();

    console.log('✅ File preview opened successfully!');
});
