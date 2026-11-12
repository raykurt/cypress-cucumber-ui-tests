@run @checkout
Feature: Cart and checkout
  Users review the cart and complete an order.

  Background:
    Given the user is logged in as "standard"

  @smoke @regression @TC-3201
  Scenario: Complete an order
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user opens the cart
    And the user checks out with the default customer data
    And the user finishes the order
    Then the order confirmation should be displayed

  @negative @regression @TC-3202
  Scenario: Checkout requires a first name
    Given the user has added "Sauce Labs Bike Light" to the cart
    When the user opens the cart
    And the user starts checkout without a first name
    Then the checkout error message should contain "First Name is required"

  @regression @TC-3203
  Scenario: Remove a product from the cart
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user opens the cart
    And the user removes "Sauce Labs Backpack" from the cart
    Then the cart should be empty
