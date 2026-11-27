import { BasePage } from '../BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { byTest } from '../../../support/selectors';

/** Detail page of a single product (opened by clicking a product name on the list). */
export class ProductDetailsPage extends BasePage {
  protected readonly path = '/inventory-item.html';

  header = new HeaderComponent();

  e = {
    ...this.header.e,
    name: () => byTest('inventory-item-name'),
    price: () => byTest('inventory-item-price'),
    backButton: () => byTest('back-to-products'),
  };

  backToProducts(): void {
    this.e.backButton().click();
  }
}
