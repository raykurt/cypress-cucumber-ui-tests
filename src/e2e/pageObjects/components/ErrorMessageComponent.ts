import { byTest } from '../../../support/selectors';

/** Error box used by the login and checkout forms. */
export class ErrorMessageComponent {
  e = {
    errorMessage: () => byTest('error'),
  };

  shouldContain(text: string): void {
    this.e.errorMessage().should('be.visible').and('contain.text', text);
  }
}
