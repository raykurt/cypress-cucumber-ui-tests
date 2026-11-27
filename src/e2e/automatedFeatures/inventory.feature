@run @inventory
Feature: Product list
  Logged-in users see the products, sort them and add them to the cart.

  Background:
    Given the user is logged in as "standard"

  @smoke @regression @TC-3101
  Scenario: Products are listed after login
    Then the products page should be displayed
    And the product list should contain 6 products

  @regression @TC-3102
  Scenario Outline: Sort the product list
    When the user sorts products by "<option>"
    Then the products should be sorted by <field> in <direction> order

    Examples:
      | option              | field | direction  |
      | Name (A to Z)       | name  | ascending  |
      | Name (Z to A)       | name  | descending |
      | Price (low to high) | price | ascending  |
      | Price (high to low) | price | descending |

  @regression @TC-3103
  Scenario: Adding a product updates the cart badge
    When the user adds "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1

  @regression @TC-3104
  Scenario: Adding several products counts all of them
    When the user adds "Sauce Labs Backpack" to the cart
    And the user adds "Sauce Labs Bike Light" to the cart
    And the user adds "Sauce Labs Bolt T-Shirt" to the cart
    Then the cart badge should show 3

  @regression @TC-3105
  Scenario: Removing a product on the list clears the cart badge
    When the user adds "Sauce Labs Backpack" to the cart
    And the user removes "Sauce Labs Backpack" on the products page
    Then the cart badge should not be shown

  @regression @TC-3106
  Scenario: The cart is kept after a page reload
    When the user adds "Sauce Labs Backpack" to the cart
    And the user reloads the page
    Then the cart badge should show 1

  @regression @TC-3107
  Scenario: Product details show the same name and price as the list
    When the user opens the details of "Sauce Labs Fleece Jacket"
    Then the details page should show "Sauce Labs Fleece Jacket" with the price from the list
    When the user goes back to the products
    Then the products page should be displayed
