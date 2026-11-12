import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { InventoryPage } from '../pageObjects/pages/InventoryPage';

const inventoryPage = new InventoryPage();

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
