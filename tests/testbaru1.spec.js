// Required Playwright Modules
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Global Variables
const USER_EMAIL = "heena.webosmotic+qa2@gmail.com";
const USER_PASSWORD = "Baru123!";
const LOG_DIRECTORY = path.join(__dirname, 'Logs');
const currentDatetime = new Date().toISOString().replace(/[:.]/g, '-');
const logFilename = path.join(LOG_DIRECTORY, `calculation_check_${currentDatetime}.txt`);
const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=vn_tOaIWM0eIdgjygXc_xokvU7-84CFrRJiMvbaCoRz2vngzHGtOWOIcWY25L_M2700AHmpOcKkd_Bo7HZNsNzTR0pEAU-8IOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa5BTUqdwLduY-bNw2S_0Xmx_yQT_GapGbpViUmw5DNVAtiXE8FTmRwW7jQxEou1kNTEZ9pnf2GbAt0ICl289Hcz0S7MqNcg03BRXZqHQgsmykVYAOg5-nafP1b6FKTMi0Zjz6loM1y2-&lib=MpkKY1A2VRsd_XnvCB-SnjzGMDrXgciAG";

// Create Logs Directory
if (!fs.existsSync(LOG_DIRECTORY)) {
    fs.mkdirSync(LOG_DIRECTORY);
}

// Logging Function
function logMessage(message) {
    console.log(message);
    fs.appendFileSync(logFilename, message + '\n');
}

(async () => {
    logMessage("\n########################################");
    logMessage(`Opening account with credentials: ${USER_EMAIL}`);
    logMessage("########################################\n");

    const startTime = new Date();
    logMessage(`Process started at: ${startTime.toISOString()}`);

    // Launch Browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Open Login Page
        await page.goto('https://staging.barucabinets.com/sign-in');
        await page.fill('input[name="email"]', USER_EMAIL);
        await page.fill('input[name="password"]', USER_PASSWORD);
        await page.press('input[name="password"]', 'Enter');
        logMessage("Logged in successfully.");

        // Fetch API Data
        logMessage("Fetching codes from the sheet...");
        const response = await page.evaluate(async (url) => {
            const res = await fetch(url);
            return res.json();
        }, API_URL);

        const sheetData = response.data || [];
        const errorCodes = [];
        let lastCategory = null;

        for (const item of sheetData) {
            const { Code: code, "Short Name": shortName, "Long Name": longName, Index: index, "Order Total": orderTotal } = item;

            if (!code) {
                logMessage(`Index ${index}: No valid code found. Skipping.`);
                continue;
            }

            const currentCategory = code.startsWith('B') ? 'BASE' : code.startsWith('T') ? 'TALL' : code.startsWith('W') ? 'WALL' : 'EXTRAS';

            if (currentCategory !== lastCategory) {
                logMessage(`\n******************\n${currentCategory}\n******************`);
                lastCategory = currentCategory;
            }

            try {
                // Search by Code
                await page.fill('input[placeholder="Search"]', code);
                await page.waitForTimeout(2000);
                await page.click('li[role="option"]');
                await page.waitForTimeout(5000);

                const appPriceText = await page.textContent('h4:has-text("$")');
                const appPrice = parseFloat(appPriceText.replace('$', '').replace(',', '').trim());
                const sheetPrice = parseFloat(orderTotal || 0);

                if (appPrice === sheetPrice) {
                    logMessage(`Index ${index}: App Price: $${appPrice} | Sheet Price: $${sheetPrice} | Match: ✅`);
                } else {
                    logMessage(`Index ${index}: App Price: $${appPrice} | Sheet Price: $${sheetPrice} | Match: ❌`);
                    errorCodes.push({ index, code, shortName, longName });
                }
            } catch (error) {
                logMessage(`Index ${index}: Error processing code ${code}: ${error.message}`);
                errorCodes.push({ index, code, shortName, longName });
            }
        }

        // Log Errors
        if (errorCodes.length > 0) {
            logMessage("\nCODES WITH ISSUES:");
            for (const error of errorCodes) {
                logMessage(JSON.stringify(error));
            }
        }
    } catch (error) {
        logMessage(`Unexpected error: ${error.message}`);
    } finally {
        await browser.close();
        const endTime = new Date();
        logMessage(`\nProcess ended at: ${endTime.toISOString()}`);
        logMessage(`Total time taken: ${(endTime - startTime) / 1000} seconds`);
    }
})();
