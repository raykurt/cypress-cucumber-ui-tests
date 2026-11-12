/**
 * Shared base for all pages: every page knows its own path,
 * can open itself and can verify that the browser is on it.
 */
export abstract class BasePage {
  protected abstract readonly path: string;

  open(): void {
   cy.visit(this.path, { failOnStatusCode: false });
  }

  isCurrentUrlIncludes(urlPart: string): void {
    cy.url().should('include', urlPart);
  }

  shouldBeOpen(): void {
    this.isCurrentUrlIncludes(this.path);
  }
}
