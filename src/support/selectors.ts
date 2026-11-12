/**
 * The demo app marks its elements with data-test attributes.
 * Test-only attributes do not change when the design or CSS changes,
 * so every page and component finds elements through this helper.
 */
export const byTest = (id: string) => cy.get(`[data-test="${id}"]`);

/** "Sauce Labs Backpack" -> "sauce-labs-backpack" (used in the app's button ids) */
export const toSlug = (productName: string) => productName.trim().toLowerCase().replace(/\s+/g, '-');
