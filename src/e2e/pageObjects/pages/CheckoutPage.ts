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

  finish(): void {
    this.e.finishButton().click();
  }

  confirmationShouldBeDisplayed(): void {
    this.isCurrentUrlIncludes('/checkout-complete.html');
    this.e.completeHeader().should('have.text', 'Thank you for your order!');
  }
}
