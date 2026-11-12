import { LoginPage } from '../e2e/pageObjects/pages/LoginPage';

type UserKey = 'standard' | 'locked';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in once per user and caches the session (cookies + storage),
       * so later scenarios skip the login form.
       */
      login(user: UserKey): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (user: UserKey) => {
  cy.fixture('users').then((users) => {
    const { username, password } = users[user];

    cy.session(
      ['login', user],
      () => {
        const loginPage = new LoginPage();
        loginPage.open();
        loginPage.login(username, password);
        cy.url().should('include', '/inventory.html');
      },
      {
        validate() {
          cy.getCookie('session-username').should('exist');
        },
      },
    );
  });
});

export {};
