const { test, expect } = require('@playwright/test');

// Test 1: Alert with OK
test('Alert with OK', async ({ page }) => {
  // Navigate to the target URL
  await page.goto('https://demo.automationtesting.in/Alerts.html');

  // Click the "Alert with OK" tab
  await page.click("//a[@href='#OKTab']");

  // Set up a dialog handler to verify the alert message and accept it
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert'); // Ensure it's an alert dialog
    expect(dialog.message()).toContain('I am an alert box!'); // Verify the alert message
    await dialog.accept(); // Accept the alert
  });

  // Click the button to trigger the alert
  await page.click("//button[contains(text(),'click the button to display an')]");

  // Wait briefly to ensure the dialog is handled
  await page.waitForTimeout(2000);
});

// Test 2: Alert with OK & Cancel
test('Alert with OK & Cancel', async ({ page }) => {
  // Navigate to the target URL
  await page.goto('https://demo.automationtesting.in/Alerts.html');

  // Click the "Alert with OK & Cancel" tab
  await page.click("//a[normalize-space()='Alert with OK & Cancel']");

  // Set up a dialog handler to verify the confirmation dialog and accept it
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm'); // Ensure it's a confirm dialog
    expect(dialog.message()).toContain('Press a Button !'); // Verify the dialog message
    await dialog.accept(); // Accept the confirmation
  });

  // Click the button to trigger the confirmation dialog
  await page.click("//button[normalize-space()='click the button to display a confirm box']");

  // Wait briefly to ensure the dialog is handled
  await page.waitForTimeout(2000);
});

// Test 3: Prompt Dialog
test('Prompt Dialog', async ({ page }) => {
    // Navigate to the target URL
    await page.goto('https://demo.automationtesting.in/Alerts.html');
  
    // Click the "Alert with Textbox" tab
    await page.click("//a[@href='#Textbox']");
  
    // Set up a dialog handler to verify the prompt and provide input
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt'); // Ensure it's a prompt dialog
      expect(dialog.message()).toContain('Please enter your name'); // Verify the prompt message
      await dialog.accept('test'); // Provide input to the prompt
    });
    await page.waitForTimeout(7000);
    // Click the button to trigger the prompt
    await page.click("//button[normalize-space()='click the button to demonstrate the prompt box']");
  
    // Additional wait for stability (optional)
    await page.waitForTimeout(2000);
  });
  
