import { BasePage } from '../BasePage';
import { ErrorMessageComponent } from '../components/ErrorMessageComponent';
import { byTest } from '../../../support/selectors';

export class LoginPage extends BasePage {
  protected readonly path = '/';

  errorMessage = new ErrorMessageComponent();

  // One element map for the whole page: own elements + its components' elements
  e = {
    ...this.errorMessage.e,
    username: () => byTest('username'),
    password: () => byTest('password'),
    loginButton: () => byTest('login-button'),
  };

  login(username: string, password: string): void {
    this.typeOrClear(this.e.username, username);
    this.typeOrClear(this.e.password, password, false);
    this.e.loginButton().click();
  }

  // cy.type('') fails, so empty values (negative tests) only clear the field
  private typeOrClear(field: () => Cypress.Chainable<JQuery<HTMLElement>>, value: string, log = true): void {
    field().clear();
    if (value) {
      field().type(value, { log });
    }
  }
}
