import { BasePage } from '../BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { byTest, toSlug } from '../../../support/selectors';

export class CartPage extends BasePage {
  protected readonly path = '/cart.html';

  header = new HeaderComponent();

  e = {
    ...this.header.e,
    cartItems: () => byTest('inventory-item'),
    checkoutButton: () => byTest('checkout'),
    removeButton: (productName: string) => byTest(`remove-${toSlug(productName)}`),
  };

  removeItem(productName: string): void {
    this.e.removeButton(productName).click();
  }

  startCheckout(): void {
    this.e.checkoutButton().click();
  }

  shouldBeEmpty(): void {
    this.e.cartItems().should('not.exist');
  }
}
