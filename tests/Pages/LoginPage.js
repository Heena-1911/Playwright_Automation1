import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.domainInput = page.getByPlaceholder('Company Domain Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.dashboardElement = page.locator('h1:has-text("Dashboard")'); // Adjust based on your UI
    }

    async navigateToLogin() {
        await this.page.goto('https://stg.narad.io/sign-in');
        await this.domainInput.waitFor({ state: 'visible', timeout: 5000 });
        console.log("✅ Login page loaded");
    }

    async login(domain, email, password) {
        console.log("🔄 Attempting login...");
        
        // Wait for input fields
        await this.domainInput.fill(domain);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        // Click sign-in & wait for successful login
        await this.signInButton.click();
        await this.page.waitForTimeout(3000);

        // Verify login success
        await expect(this.dashboardElement).toBeVisible({ timeout: 10000 });
        console.log("✅ Sign-in complete. Ready to explore!");
    }
}
