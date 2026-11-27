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

When('the user starts checkout leaving {string} empty', (field: keyof Customer) => {
  cartPage.startCheckout();
  cy.fixture<Customer>('customer').then((customer) => {
    checkoutPage.fillCustomer({ ...customer, [field]: '' });
  });
  checkoutPage.continue();
});

Then('the item total should equal the sum of the product prices', () => {
  checkoutPage.itemTotalShouldMatchProductPrices();
});

Then('the order total should equal the item total plus tax', () => {
  checkoutPage.totalShouldBeItemTotalPlusTax();
});

When('the user starts checkout', () => {
  cartPage.startCheckout();
  checkoutPage.shouldBeOpen();
});

When('the user cancels the checkout', () => {
  checkoutPage.cancel();
});

Then('the cart should contain {string}', (productName: string) => {
  cartPage.shouldBeOpen();
  cartPage.shouldContain(productName);
});

When('the user continues shopping', () => {
  cartPage.continueShopping();
});

When('the user goes back home', () => {
  checkoutPage.backHome();
});
