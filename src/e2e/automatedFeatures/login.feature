@run @login
Feature: Login
  Users log in with their credentials; invalid attempts show a clear error.

  Background:
    Given the user is on the login page

  @smoke @regression @TC-3001
  Scenario: Standard user logs in successfully
    When the user logs in as "standard"
    Then the products page should be displayed

  @negative @regression @TC-3002
  Scenario Outline: Login fails with invalid data
    When the user logs in with username "<username>" and password "<password>"
    Then the login error message should contain "<message>"

    Examples:
      | username        | password       | message                              |
      | locked_out_user | secret_sauce   | Sorry, this user has been locked out |
      | standard_user   | wrong_password | Username and password do not match   |
      |                 | secret_sauce   | Username is required                 |
