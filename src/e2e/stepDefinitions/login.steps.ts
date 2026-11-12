import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pageObjects/pages/LoginPage';

const loginPage = new LoginPage();

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
