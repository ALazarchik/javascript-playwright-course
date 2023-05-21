import { expect } from '@playwright/test';

export class MyAccountPage {

    constructor(page) {
        this.page = page;
        this.myAccountHeading = page.getByRole('heading', { name: 'My Account' });
        this.errorMessage = page.locator('[data-qa="error-message"]');
    }

    async visit() {
        await this.page.goto('/my-account');
    }

    async waitToBeLoggedIn() {
        await this.myAccountHeading.waitFor();
    }

    async waitForErrorMessage(errorText) {
        await this.errorMessage.waitFor();
        await expect(this.errorMessage).toHaveText(errorText);
    }
}
