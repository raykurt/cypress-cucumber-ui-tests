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
      | Name (Z to A)       | name  | descending |
      | Price (low to high) | price | ascending  |
      | Price (high to low) | price | descending |

  @regression @TC-3103
  Scenario: Adding a product updates the cart badge
    When the user adds "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1
