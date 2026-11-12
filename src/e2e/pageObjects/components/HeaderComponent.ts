import { byTest } from '../../../support/selectors';

/** Header shown on every page after login: cart link, cart badge, side menu. */
export class HeaderComponent {
  e = {
    cartLink: () => byTest('shopping-cart-link'),
    cartBadge: () => byTest('shopping-cart-badge'),
    menuButton: () => cy.get('#react-burger-menu-btn'),
    logoutLink: () => byTest('logout-sidebar-link'),
  };

  openCart(): void {
    this.e.cartLink().click();
  }

  cartBadgeShouldShow(count: number): void {
    this.e.cartBadge().should('have.text', String(count));
  }

  cartBadgeShouldNotExist(): void {
    this.e.cartBadge().should('not.exist');
  }

  logout(): void {
    this.e.menuButton().click();
    this.e.logoutLink().click();
  }
}
