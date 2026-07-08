import { Locator, Page } from '@playwright/test';

/**
 * COMPONENTE reutilizable: el header/barra superior de SauceDemo.
 *
 * ¿Por qué un componente y no meter esto en cada Page Object?
 * El header (ícono del carrito, badge con la cantidad, menú hamburguesa)
 * aparece en TODAS las páginas internas: inventario, carrito, checkout.
 * Si lo modeláramos dentro de cada página, duplicaríamos los mismos
 * localizadores 4 veces. Como componente, se define UNA vez y las páginas
 * lo reutilizan por composición (InventoryPage "tiene un" header).
 */
export class HeaderComponent {
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly burgerButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    // Preferimos atributos data-test: son marcas puestas a propósito para testing,
    // estables ante cambios de estilo o estructura del DOM.
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.burgerButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  /**
   * Devuelve la cantidad de ítems en el carrito.
   * El badge solo existe en el DOM cuando hay al menos 1 producto, así que
   * si no está visible interpretamos 0 (carrito vacío).
   */
  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return Number(text?.trim() ?? '0');
    }
    return 0;
  }

  /** Abre la página del carrito haciendo click en el ícono. */
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  /** Cierra sesión: abre el menú lateral y hace click en Logout. */
  async logout(): Promise<void> {
    await this.burgerButton.click();
    await this.logoutLink.click();
  }
}
