import { BasePage } from '../BasePage';
import { ErrorMessageComponent } from '../components/ErrorMessageComponent';
import { byTest } from '../../../support/selectors';

export interface Customer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/** Covers the three checkout steps: customer info, overview, confirmation. */
export class CheckoutPage extends BasePage {
  protected readonly path = '/checkout-step-one.html';

  errorMessage = new ErrorMessageComponent();

  e = {
    ...this.errorMessage.e,
    firstName: () => byTest('firstName'),
    lastName: () => byTest('lastName'),
    postalCode: () => byTest('postalCode'),
    continueButton: () => byTest('continue'),
    cancelButton: () => byTest('cancel'),
    itemPrices: () => byTest('inventory-item-price'),
    subtotal: () => byTest('subtotal-label'),
    tax: () => byTest('tax-label'),
    total: () => byTest('total-label'),
    backHomeButton: () => byTest('back-to-products'),
    finishButton: () => byTest('finish'),
    completeHeader: () => byTest('complete-header'),
  };

  fillCustomer(customer: Partial<Customer>): void {
    if (customer.firstName) this.e.firstName().type(customer.firstName);
    if (customer.lastName) this.e.lastName().type(customer.lastName);
    if (customer.postalCode) this.e.postalCode().type(customer.postalCode);
  }

  continue(): void {
    this.e.continueButton().click();
  }

  cancel(): void {
    this.e.cancelButton().click();
  }

  backHome(): void {
    this.e.backHomeButton().click();
  }

  /** Overview page: "Item total" must be the sum of the product prices listed above it. */
  itemTotalShouldMatchProductPrices(): void {
    this.e.itemPrices().then(($prices) => {
      const sum = Cypress._.sum(Cypress._.map($prices, (el) => toAmount(el.innerText)));
      this.e.subtotal().invoke('text').then((text) => {
        expect(toAmount(text), 'item total').to.be.closeTo(sum, 0.001);
      });
    });
  }

  /** Overview page: "Total" must be "Item total" + "Tax" (rounded to cents). */
  totalShouldBeItemTotalPlusTax(): void {
    this.e.subtotal().invoke('text').then((subtotalText) => {
      this.e.tax().invoke('text').then((taxText) => {
        this.e.total().invoke('text').then((totalText) => {
          const expected = Math.round((toAmount(subtotalText) + toAmount(taxText)) * 100) / 100;
          expect(toAmount(totalText), 'total').to.equal(expected);
        });
      });
    });
  }

  finish(): void {
    this.e.finishButton().click();
  }

  confirmationShouldBeDisplayed(): void {
    this.isCurrentUrlIncludes('/checkout-complete.html');
    this.e.completeHeader().should('have.text', 'Thank you for your order!');
  }
}

/** "Item total: $39.98" -> 39.98 */
function toAmount(text: string): number {
  return Number(text.replace(/[^0-9.]/g, ''));
}
