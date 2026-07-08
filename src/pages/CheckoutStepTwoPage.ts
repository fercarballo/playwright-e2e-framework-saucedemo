import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object del paso 2 del checkout: resumen de la orden.
 *
 * Esta página muestra los totales ("Item total", "Tax", "Total"). Exponemos
 * métodos que devuelven esos montos como NÚMEROS, para poder hacer una
 * verificación de negocio real en el test: que Total = Item total + Tax.
 * Eso es mucho más valioso que solo comprobar que "el texto aparece".
 */
export class CheckoutStepTwoPage extends BasePage {
  protected readonly path = '/checkout-step-two.html';

  private readonly itemTotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  /** Extrae el monto (ej: 29.99) de un texto tipo "Item total: $29.99". */
  private parseAmount(text: string | null): number {
    const match = text?.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? Number(match[1]) : NaN;
  }

  async getItemTotal(): Promise<number> {
    return this.parseAmount(await this.itemTotalLabel.textContent());
  }

  async getTax(): Promise<number> {
    return this.parseAmount(await this.taxLabel.textContent());
  }

  async getTotal(): Promise<number> {
    return this.parseAmount(await this.totalLabel.textContent());
  }

  /** Confirma la compra. */
  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
