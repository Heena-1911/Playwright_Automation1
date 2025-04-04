import { expect } from '@playwright/test';

export class PoliciesPage {
    constructor(page) {
        this.page = page;
        this.uploadInput = page.locator('#file-input-main');
        this.successMessage = this.page.getByText('File uploaded successfully').first();
        this.errorMessage = this.page.getByText('1 file(s) were skipped. Only PDF, DOC, DOCX allowed.').first();
    }

    async navigateToPolicies() {
        await this.page.goto('https://stg.narad.io/cabinet/policies');
        console.log('✅ Navigated to Policies Page');
    }

    async uploadFile(filePath) {
        console.log(`📤 Uploading: ${filePath}`);
        await this.uploadInput.setInputFiles(filePath);
        await this.page.waitForTimeout(3000); // Wait for upload process

        if (await this.successMessage.isVisible()) {
            console.log(`✅ File uploaded: ${filePath}`);
            return true;
        } else if (await this.errorMessage.isVisible()) {
            console.error(`❌ Error: ${filePath} failed to upload.`);
            return false;
        } else {
            console.error(`⚠️ Unknown issue with ${filePath}.`);
            return false;
        }
    }

    async verifyFileInTable(fileName) {
        await this.page.waitForTimeout(5000); // Wait for the table to load
    
        const allFiles = await this.page.locator('//p[contains(@class, "MuiTypography-root")]').allTextContents();
        console.log("📋 Files in table:", allFiles);
    
        if (allFiles.some(file => file.trim().toLowerCase() === fileName.trim().toLowerCase())) {
            console.log(`✅ File found: ${fileName}`);
        } else {
            console.log(`❌ File not found: ${fileName}`);
        }
    }
    

    async previewFile(fileName) {
        console.log(`🔎 Attempting to preview: ${fileName}`);

        // Locate file in the table
        const fileLocator = this.page.locator(`xpath=//p[@aria-label="${fileName}"]`).first();

        try {
            await fileLocator.waitFor({ state: 'visible', timeout: 5000 });

            // Find the preview button in the same row
            const previewButton = fileLocator.locator('xpath=ancestor::tr//button[@aria-label="Preview"]');

            // Click Preview
            await previewButton.waitFor({ state: 'visible', timeout: 5000 });
            await previewButton.click();
            console.log(`✅ Preview opened for: ${fileName}`);

            // Wait for the preview modal to appear
            const previewModal = this.page.locator('div[role="dialog"]').first();
            await previewModal.waitFor({ state: 'visible', timeout: 5000 });

            // Close preview modal
            const closeButton = previewModal.locator('button:has-text("Close")').first();
            await closeButton.waitFor({ state: 'visible', timeout: 5000 });
            await closeButton.click();
            console.log(`❌ Preview closed for: ${fileName}`);

            return true;
        } catch (error) {
            console.error(`❌ Preview failed for: ${fileName}`);
            return false;
        }
    }

    async editFileName(oldName, newName) {
        console.log(`✏️ Editing file: ${oldName} → ${newName}`);

        const fileRow = this.page.locator(`//p[contains(text(), "${oldName}")]`).first();
        await fileRow.waitFor({ state: 'visible', timeout: 5000 });

        const editButton = fileRow.locator('xpath=ancestor::tr//button[@aria-label="Edit"]');
        await editButton.click();

        const nameInput = this.page.locator('input[name="fileName"]');
        await nameInput.fill(newName);

        const saveButton = this.page.locator('button:has-text("Save")');
        await saveButton.click();

        console.log(`✅ File name updated successfully to: ${newName}`);
    }
}