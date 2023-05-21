import { expect } from "@playwright/test";
import { NavigationBar } from "./NavigationBar";

export class ProductsPage {

    constructor(page) {
        this.page = page;
        this.addProductToBasketButtons = page.locator('[data-qa="product-button"]');
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('[data-qa="product-title"]');
    }

    async visit() {
        await this.page.goto('http://localhost:2221');
    }

    async addProductToBasket(productNumber) {
        const navigationBar = new NavigationBar(this.page);
        if(productNumber > 0) {
            const addButton = this.addProductToBasketButtons.nth(productNumber - 1);
            await addButton.waitFor();
            const basketCounterBeforeAdding = await navigationBar.getBasketCount();
            await expect(addButton).toHaveText("Add to Basket");
            await addButton.click();
            await expect(addButton).toHaveText("Remove from Basket");
            const basketCounterAfterAdding = await navigationBar.getBasketCount();
            await expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding);
        } else {
            throw new Error("Product number must be greater than 0.");
        }
    }

    async sortByAscendingPrice() {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
        await this.sortDropdown.selectOption('price-asc');
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
        await expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
    }
}
