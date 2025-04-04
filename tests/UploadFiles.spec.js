const { test, expect } = require('@playwright/test');

test('Single File', async ({ page }) => {
    await page.goto('https://www.foundit.in/');

    await page.waitForSelector('.mqfihd-upload');
    await page.locator('.mqfihd-upload').click();

    // Corrected file upload path
    await page.locator('#filesToUpload')
        .setInputFiles(['/home/webosmotic/Documents/demoadress.pdf']);

    await page.waitForTimeout(5000);
});

test.only('Multiple Files', async ({ page }) => {
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    // Corrected file paths for multiple uploads
    await page.locator('#filesToUpload')
        .setInputFiles([
            '/home/webosmotic/Documents/demoadress.pdf',
            '/home/webosmotic/Documents/ISTQB_CTFL_Syllabus_v4.0.1.pdf'
        ]);

    await page.waitForTimeout(3000);

    // Corrected assertion syntax
    await expect(page.locator('#fileList li:nth-child(1)')).toHaveText('demoadress.pdf');
    await expect(page.locator('#fileList li:nth-child(2)')).toHaveText('ISTQB_CTFL_Syllabus_v4.0.1.pdf');

    await page.waitForTimeout(3000);

    // Removing files
    await page.locator('#filesToUpload').setInputFiles([]);
    await page.waitForTimeout(3000);

    await expect(page.locator('#fileList')).toHaveText('No Files Selected');

    await page.waitForTimeout(3000);
});
