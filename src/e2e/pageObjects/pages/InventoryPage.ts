import { BasePage } from '../BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { byTest, toSlug } from '../../../support/selectors';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';

  header = new HeaderComponent();

  e = {
    ...this.header.e,
    title: () => byTest('title'),
    items: () => byTest('inventory-item'),
    itemNames: () => byTest('inventory-item-name'),
    itemPrices: () => byTest('inventory-item-price'),
    sortSelect: () => byTest('product-sort-container'),
    addToCartButton: (productName: string) => byTest(`add-to-cart-${toSlug(productName)}`),
  };

  shouldBeDisplayed(): void {
    this.shouldBeOpen();
    this.e.title().should('have.text', 'Products');
  }

  addToCart(productName: string): void {
    this.e.addToCartButton(productName).click();
  }

  sortBy(visibleOption: string): void {
    this.e.sortSelect().select(visibleOption);
  }

  /** Returns the product names in the order they are shown */
  names(): Cypress.Chainable<string[]> {
    return this.e.itemNames().then(($els) => Cypress._.map($els, (el) => el.innerText.trim()));
  }

  /** Returns the product prices as numbers ("$29.99" -> 29.99) */
  prices(): Cypress.Chainable<number[]> {
    return this.e.itemPrices().then(($els) => Cypress._.map($els, (el) => Number(el.innerText.replace('$', ''))));
  }
}
