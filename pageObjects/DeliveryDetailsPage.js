import { expect } from '@playwright/test';

export class DeliveryDetailsPage {

    constructor(page) {
        this.page = page;

        this.firstNameInput = page.getByPlaceholder('First name');
        this.lastNameInput = page.getByPlaceholder('Last name');
        this.streetInput = page.getByPlaceholder('Street');
        this.postCodeInput = page.getByPlaceholder('Post code');
        this.cityInput = page.getByPlaceholder('City');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]');
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainers = page.locator('.saved-address-container');
        this.savedAddressFirstName = page.locator('.saved-address-firstName');
        this.savedAddressLastName = page.locator('.saved-address-lastName');
        this.savedAddressStreet = page.locator('.saved-address-street');
        this.savedAddressPostCode = page.locator('.saved-address-postcode');
        this.savedAddressCity = page.locator('.saved-address-city');
        this.savedAddressCountry = page.locator('.saved-address-country');
    }

    async fillDeliveryDetails(userDetails) {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(userDetails.firstName);
        await this.lastNameInput.fill(userDetails.lastName);
        await this.streetInput.fill(userDetails.address.street);
        await this.postCodeInput.fill(userDetails.address.postCode);
        await this.cityInput.fill(userDetails.address.city);
        await this.countryDropdown.selectOption(userDetails.address.country);
    }

    async saveDeliveryDetails() {
        const savedAddressesCountBeforeSaving = await this.savedAddressContainers.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        await expect(this.savedAddressContainers).toHaveCount(savedAddressesCountBeforeSaving + 1);
        await this.savedAddressFirstName.first().waitFor();
        await expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());
        await expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());
        await expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue());
        await expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue());
        await expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue());
        await expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());
    }

    async continueToPayment() {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();
        await this.page.waitForURL(/\/payment/gm);
    }
}
