import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { InventoryPage } from '../pageObjects/pages/InventoryPage';
import { CartPage } from '../pageObjects/pages/CartPage';
import { CheckoutPage, Customer } from '../pageObjects/pages/CheckoutPage';

const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

Given('the user has added {string} to the cart', (productName: string) => {
  inventoryPage.addToCart(productName);
  inventoryPage.header.cartBadgeShouldShow(1);
});

When('the user opens the cart', () => {
  inventoryPage.header.openCart();
  cartPage.shouldBeOpen();
});

When('the user checks out with the default customer data', () => {
  cartPage.startCheckout();
  cy.fixture<Customer>('customer').then((customer) => {
    checkoutPage.fillCustomer(customer);
  });
  checkoutPage.continue();
});

When('the user starts checkout without a first name', () => {
  cartPage.startCheckout();
  cy.fixture<Customer>('customer').then((customer) => {
    checkoutPage.fillCustomer({ ...customer, firstName: '' });
  });
  checkoutPage.continue();
});

When('the user finishes the order', () => {
  checkoutPage.finish();
});

Then('the order confirmation should be displayed', () => {
  checkoutPage.confirmationShouldBeDisplayed();
});

Then('the checkout error message should contain {string}', (message: string) => {
  checkoutPage.errorMessage.shouldContain(message);
});

When('the user removes {string} from the cart', (productName: string) => {
  cartPage.removeItem(productName);
});

Then('the cart should be empty', () => {
  cartPage.shouldBeEmpty();
  cartPage.header.cartBadgeShouldNotExist();
});
