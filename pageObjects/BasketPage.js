import { expect } from "@playwright/test";

export class BasketPage {

    constructor(page) {
        this.page = page;
        this.basketItemsCards = page.locator('[data-qa="basket-card"]');
        this.basketItemsPrices = page.locator('[data-qa="basket-item-price"]');
        this.removeFromBasketButtons = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
    }

    async removeCheapestProductFromBasket() {
        await this.basketItemsCards.first().waitFor();
        await this.basketItemsPrices.first().waitFor();
        const numberOfItemsBeforeRemoval = await this.basketItemsCards.count();
        const indexOfItemToBeRemoved = await this.findIndexOfCheapestProduct();
        await this.removeFromBasketButtons.nth(indexOfItemToBeRemoved).click();
        await expect(this.basketItemsCards).toHaveCount(numberOfItemsBeforeRemoval - 1);
    }

    async findIndexOfCheapestProduct() {
        const allPricesValues = await this.basketItemsPrices.allInnerTexts();

        const allProductsPricesInNumbers = allPricesValues.map(element => {
            const withoutDollarSign = element.replace('$', '');
            return parseInt(withoutDollarSign, 10);
        });
        const minPrice = Math.min(allProductsPricesInNumbers);
        return allProductsPricesInNumbers.indexOf(minPrice);
    }

    async continueToCheckout() {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/gm);
    }
}
