import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '@components/HeaderComponent';

/**
 * Page Object del carrito de compras.
 */
export class CartPage extends BasePage {
  protected readonly path = '/cart.html';

  readonly header: HeaderComponent;

  private readonly cartItems: Locator;
  private readonly itemNames: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /** Cantidad de ítems distintos en el carrito. */
  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /** Nombres de los productos en el carrito. */
  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  /** Avanza al primer paso del checkout. */
  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /** Vuelve al inventario a seguir comprando. */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /** Elimina un producto del carrito por su nombre. */
  async removeItem(productName: string): Promise<void> {
    await this.cartItems
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }
}
