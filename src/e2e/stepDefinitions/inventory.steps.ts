import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { InventoryPage } from '../pageObjects/pages/InventoryPage';
import { ProductDetailsPage } from '../pageObjects/pages/ProductDetailsPage';

const inventoryPage = new InventoryPage();
const detailsPage = new ProductDetailsPage();

Given('the user is logged in as {string}', (user: 'standard' | 'locked') => {
  cy.login(user);
  inventoryPage.open();
});

Then('the products page should be displayed', () => {
  inventoryPage.shouldBeDisplayed();
});

Then('the product list should contain {int} products', (count: number) => {
  inventoryPage.e.items().should('have.length', count);
});

When('the user sorts products by {string}', (option: string) => {
  inventoryPage.sortBy(option);
});

Then('the products should be sorted by {word} in {word} order', (field: string, direction: string) => {
  const values = (field === 'price' ? inventoryPage.prices() : inventoryPage.names()) as Cypress.Chainable<Array<string | number>>;

  values.then((actual: Array<string | number>) => {
    const ascending = [...actual].sort((a, b) =>
      typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b)),
    );
    const expected = direction === 'descending' ? ascending.reverse() : ascending;
    expect(actual).to.deep.equal(expected);
  });
});

When('the user adds {string} to the cart', (productName: string) => {
  inventoryPage.addToCart(productName);
});

Then('the cart badge should show {int}', (count: number) => {
  inventoryPage.header.cartBadgeShouldShow(count);
});

When('the user removes {string} on the products page', (productName: string) => {
  inventoryPage.removeFromList(productName);
});

Then('the cart badge should not be shown', () => {
  inventoryPage.header.cartBadgeShouldNotExist();
});

When('the user reloads the page', () => {
  cy.reload();
});

When('the user opens the details of {string}', (productName: string) => {
  // Remember the list price, so the details page can be compared with it
  inventoryPage.priceOf(productName).as('listPrice');
  inventoryPage.openDetails(productName);
});

Then('the details page should show {string} with the price from the list', (productName: string) => {
  detailsPage.shouldBeOpen();
  detailsPage.e.name().should('have.text', productName);
  cy.get<string>('@listPrice').then((listPrice) => {
    detailsPage.e.price().should('have.text', listPrice);
  });
});

When('the user goes back to the products', () => {
  detailsPage.backToProducts();
});
