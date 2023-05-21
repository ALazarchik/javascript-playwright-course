import { expect } from "@playwright/test";
import { usersDetails } from "../data/usersDetails";

export class PaymentPage {

    constructor(page) {
        this.page = page;
        this.discountCodeLabel = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.getByPlaceholder('Discount code');
        this.submitDiscountButton = page.getByRole('button', { name: 'Submit discount' });
        this.totalValue = page.locator('[data-qa="total-value"]');
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]');
        this.activatedDiscountMessage = page.locator('[data-qa="discount-active-message"]');
        this.creditCardOwnerInput = page.getByPlaceholder('Credit card owner');
        this.creditCardNumberInput = page.getByPlaceholder('Credit card number');
        this.validUntilInput = page.getByPlaceholder('Valid until');
        this.creditCardCVCInput = page.getByPlaceholder('Credit card CVC');
        this.payButton = page.locator('.pay-button');
    }

    async activateDiscount() {
        await this.discountCodeLabel.waitFor();
        const discountCode = await this.discountCodeLabel.innerText();
        await this.discountCodeInput.waitFor();

        // option 1 for laggy inputs: use .fill() with await expect()
        // await this.discountCodeInput.fill(discountCode);
        // await expect(this.discountCodeInput).toHaveValue(discountCode);

        // option 2 for laggy inputs: slow typing
        await this.discountCodeInput.focus();
        await this.page.keyboard.type(discountCode, { delay: 500 });

        await this.submitDiscountButton.waitFor();
        await this.submitDiscountButton.click();

        await expect(await this.activatedDiscountMessage.isVisible()).toBe(false);
        await this.activatedDiscountMessage.waitFor();
        await expect(this.activatedDiscountMessage).toContainText('Discount activated!');

        await this.discountedValue.waitFor();
        const discountedValue = parseInt((await this.discountedValue.innerText()).replaceAll('$', ''));
        const totalValue = parseInt((await this.totalValue.innerText()).replaceAll('$', ''));
        await expect(discountedValue).toBeLessThan(totalValue);
    }

    async fillCreditCardDetails() {
        await this.creditCardOwnerInput.waitFor();
        await this.creditCardOwnerInput.fill(`${usersDetails.firstName} ${usersDetails.lastName}`);
        await this.creditCardNumberInput.fill(usersDetails.creditCard.number);
        await this.validUntilInput.fill(usersDetails.creditCard.validUntil);
        await this.creditCardCVCInput.fill(usersDetails.creditCard.cvc);
    }

    async submitPayment() {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/gm);
    }
}
