import { test } from "@playwright/test";
import { MyAccountPage } from "../pageObjects/MyAccountPage";
import { getLoginToken } from "../http/getLoginToken";

test('My Account using cookie injection and mocking network request', async ({ page }) => {
    const loginToken = await getLoginToken(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    const errorText = 'PLAYWRIGHT ERROR FROM MOCKING';

    await page.route('**/api/user**', async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ message: errorText })
        });
    });

    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.visit();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = `token=${loginTokenInsideBrowserCode}`;
    }, [loginToken]);
    await myAccountPage.visit();
    await myAccountPage.waitToBeLoggedIn();
    await myAccountPage.waitForErrorMessage(errorText);
});
