export class NavigationBar {

    constructor(page) {
        this.page = page;
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
    }

    async getBasketCount() {
        await this.basketCounter.waitFor();
        const counter = await this.basketCounter.innerText();
        return parseInt(counter, 10);
    }

    async goToCheckout() {
        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL('/basket');
    }
}
