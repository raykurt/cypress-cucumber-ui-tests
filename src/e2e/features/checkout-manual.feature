@manual @checkout
Feature: Checkout - manual checks
  Checks that are run by hand and are not part of the automated suite.
  Automated features live in src/e2e/automatedFeatures and are tagged @run.

  @TC-3901
  Scenario: Order confirmation page looks correct on a mobile screen
    Given the user has completed an order on a mobile device
    Then the confirmation page layout should look correct
    And the "Back Home" button should be fully visible

  @TC-3902
  Scenario: Product images load correctly on a slow connection
    Given the user opens the product list on a slow connection
    Then every product image should load without broken placeholders
