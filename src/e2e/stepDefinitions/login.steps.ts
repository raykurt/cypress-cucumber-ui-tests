import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pageObjects/pages/LoginPage';
import { HeaderComponent } from '../pageObjects/components/HeaderComponent';

const loginPage = new LoginPage();
const header = new HeaderComponent();

Given('the user is on the login page', () => {
  loginPage.open();
});

When('the user logs in as {string}', (user: string) => {
  cy.fixture('users').then((users) => {
    loginPage.login(users[user].username, users[user].password);
  });
});

When('the user logs in with username {string} and password {string}', (username: string, password: string) => {
  loginPage.login(username, password);
});

Then('the login error message should contain {string}', (message: string) => {
  loginPage.errorMessage.shouldContain(message);
});

When('the user logs out', () => {
  header.logout();
});

Then('the login page should be displayed', () => {
  loginPage.e.loginButton().should('be.visible');
  loginPage.e.username().should('have.value', '');
});
