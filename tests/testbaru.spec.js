import { test, expect } from '@playwright/test';

test('Baruflowes', async ({ page }) => {
  // Go to the site
  await page.goto('https://staging.barucabinets.com/');

  // Login steps
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Email Address*').fill('heena.webosmotic+qa@gmail.com');
  await page.getByLabel('Password*').fill('Baru123!');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  // Click on the button to open the project dropdown
  await page.locator("//div[@class='MuiStack-root css-btw0e7']//div[@class='MuiBox-root css-50xlku']").click();

  // Wait for dropdown to load and get all project names
  const projectLocator = page.locator("//ul[@role='listbox']//li");
  await projectLocator.first().waitFor();

  const projectNames = await projectLocator.allTextContents();

  // Base project name
  let projectName = 'Store_6aa';
  let counter = 1;

  // Check if the project name already exists and modify it if necessary
  while (projectNames.includes(projectName)) {
    projectName = `Store_6aa_QA${counter}`;
    counter++;
  }

  // Close the dropdown
  await page.keyboard.press('Escape');

  // Create a new project with the unique name
  await page.locator('.MuiStack-root > div > .MuiBox-root > .MuiButtonBase-root').first().click();
  await page.getByRole('menuitem', { name: 'Add a New Project' }).click();
  await page.getByLabel('Project name').fill(projectName);
  await page.getByRole('button', { name: 'Create' }).click();

  console.log(`Project created with name: ${projectName}`);
});
