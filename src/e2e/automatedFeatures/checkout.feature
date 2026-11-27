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

  @negative @regression @TC-3204
  Scenario Outline: Checkout requires every customer field
    Given the user has added "Sauce Labs Bike Light" to the cart
    When the user opens the cart
    And the user starts checkout leaving "<field>" empty
    Then the checkout error message should contain "<message>"

    Examples:
      | field      | message                 |
      | lastName   | Last Name is required   |
      | postalCode | Postal Code is required |

  @regression @TC-3205
  Scenario: Order total is the item total plus tax
    When the user adds "Sauce Labs Backpack" to the cart
    And the user adds "Sauce Labs Bike Light" to the cart
    And the user opens the cart
    And the user checks out with the default customer data
    Then the item total should equal the sum of the product prices
    And the order total should equal the item total plus tax

  @regression @TC-3206
  Scenario: Cancelling checkout returns to the cart with the items kept
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user opens the cart
    And the user starts checkout
    And the user cancels the checkout
    Then the cart should contain "Sauce Labs Backpack"

  @regression @TC-3207
  Scenario: Continue shopping from the cart
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user opens the cart
    And the user continues shopping
    Then the products page should be displayed
    And the cart badge should show 1

  @regression @TC-3208
  Scenario: After the order the cart is empty and the user can go back home
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user opens the cart
    And the user checks out with the default customer data
    And the user finishes the order
    Then the order confirmation should be displayed
    And the cart badge should not be shown
    When the user goes back home
    Then the products page should be displayed
