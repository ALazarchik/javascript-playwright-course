import { test } from "@playwright/test";
import { ProductsPage } from "../pageObjects/ProductsPage";
import { NavigationBar } from "../pageObjects/NavigationBar";
import { BasketPage } from "../pageObjects/BasketPage";
import { LoginPage } from "../pageObjects/LoginPage";
import { SignUpPage } from "../pageObjects/SignUpPage";
import { DeliveryDetailsPage } from "../pageObjects/DeliveryDetailsPage";
import { usersDetails } from "../data/usersDetails";
import { PaymentPage } from "../pageObjects/PaymentPage";


test("New user full end-to-end flow", async ({ page }) => {

    const productsPage = new ProductsPage(page);
    await productsPage.visit();
    await productsPage.sortByAscendingPrice();
    await productsPage.addProductToBasket(1);
    await productsPage.addProductToBasket(2);
    await productsPage.addProductToBasket(3);

    const navigationBar = new NavigationBar(page);
    await navigationBar.goToCheckout();

    const basketPage = new BasketPage(page);
    await basketPage.removeCheapestProductFromBasket();
    await basketPage.continueToCheckout();

    const loginPage = new LoginPage(page);
    await loginPage.clickRegisterButton();

    const signUpPage = new SignUpPage(page);
    await signUpPage.submitRegistrationForm(usersDetails.email, usersDetails.password);

    const deliveryDetailsPage = new DeliveryDetailsPage(page);
    await deliveryDetailsPage.fillDeliveryDetails(usersDetails);
    await deliveryDetailsPage.saveDeliveryDetails();
    await deliveryDetailsPage.continueToPayment();

    const paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.fillCreditCardDetails();
    await paymentPage.submitPayment();
});
