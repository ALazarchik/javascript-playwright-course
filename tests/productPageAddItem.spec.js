import { test, expect } from "@playwright/test";

test.skip("Product page add to basket", async ({ page }) => {
    await page.goto("/");
    const addToBasketButton = page.locator('[data-qa="product-button"]').first();
    const basketProductCounter = page.locator('[data-qa="header-basket-count"]');

    await expect(addToBasketButton).toHaveText("Add to Basket");
    await expect(basketProductCounter).toHaveText("0");

    await addToBasketButton.waitFor();
    await addToBasketButton.click();

    await expect(addToBasketButton).toHaveText("Remove from Basket");
    await expect(basketProductCounter).toHaveText("1");

    const checkoutLink = page.getByRole('link', { name: 'Checkout' });
    await checkoutLink.waitFor();
    await checkoutLink.click();

    await page.waitForURL('/basket');
});
