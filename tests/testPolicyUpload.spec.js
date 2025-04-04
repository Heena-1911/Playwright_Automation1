import { test } from '@playwright/test';
import path from 'path';
import { LoginPage } from './Narad/LoginPage.js';
import { PoliciesPage } from './Narad/PoliciesPage.js';

test('Upload multiple policy files, verify in table, preview, and re-upload', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const policiesPage = new PoliciesPage(page);

    // **Login**
    await loginPage.navigateToLogin();
    await loginPage.login('enterprise', 'heena.webosmotic+enterprise@gmail.com', 'Narad123!');

    // **Navigate to Policies**
    await policiesPage.navigateToPolicies();

    // **File Paths for first upload**
    const filesToUpload = [
        path.join('/home/webosmotic/Documents/NARAD/sbi/', 'SBI Policy.pdf'),  
        path.join('/home/webosmotic/Documents/NARAD/sbi/', 'sbi doc.docx')
    ];
    
    // **Upload, verify in table, and preview**
    for (const file of filesToUpload) {
        const fileName = path.basename(file);
        
        console.log(`🔹 Trying to upload: ${fileName}`);
        const uploaded = await policiesPage.uploadFile(file);

        if (uploaded) {
            console.log(`✅ Upload successful: ${fileName}`);

            // Wait for table to update
            await page.waitForTimeout(2000);

            const appearedInTable = await policiesPage.verifyFileInTable(fileName);
            if (appearedInTable) {
                console.log(`✅ File found in table: ${fileName}`);

                const previewSuccess = await policiesPage.previewFile(fileName);
                if (previewSuccess) {
                    console.log(`✅ Preview successful: ${fileName}`);
                } else {
                    console.error(`❌ Preview failed: ${fileName}`);
                }
            } else {
                console.error(`❌ File not found in table: ${fileName}`);
            }
        } else {
            console.error(`❌ Upload failed: ${fileName}`);
        }
    }

    console.log("🔄 Re-uploading a second batch of files...");

    // **File Paths for second upload**
    const secondUploadFiles = [
        path.join('/home/webosmotic/Documents/NARAD/sbi/', 'sbi doc.docx')
    ];

    for (const file of secondUploadFiles) {
        const fileName = path.basename(file);

        console.log(`🔹 Trying to upload again: ${fileName}`);
        const uploaded = await policiesPage.uploadFile(file);

        if (uploaded) {
            console.log(`✅ Second upload successful: ${fileName}`);

            await page.waitForTimeout(2000);

            const appearedInTable = await policiesPage.verifyFileInTable(fileName);
            if (appearedInTable) {
                console.log(`✅ File found in table after re-upload: ${fileName}`);

                const previewSuccess = await policiesPage.previewFile(fileName);
                if (previewSuccess) {
                    console.log(`✅ Preview successful after re-upload: ${fileName}`);
                } else {
                    console.error(`❌ Preview failed after re-upload: ${fileName}`);
                }
            } else {
                console.error(`❌ File not found in table after re-upload: ${fileName}`);
            }
        } else {
            console.error(`❌ Second upload failed: ${fileName}`);
        }
    }
});
