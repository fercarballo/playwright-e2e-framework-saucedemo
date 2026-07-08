import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '@components/HeaderComponent';

/** Opciones de ordenamiento del dropdown de SauceDemo (sus valores reales). */
export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

/**
 * Page Object del listado de productos (inventario).
 *
 * Nota de composición: expone `header` (el HeaderComponent). Así, desde el test,
 * hacés `inventoryPage.header.getCartCount()` reutilizando el componente sin duplicar código.
 */
export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';

  readonly header: HeaderComponent;

  private readonly title: Locator;
  private readonly sortDropdown: Locator;
  private readonly items: Locator;
  private readonly itemNames: Locator;
  private readonly itemPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.title = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    // Contenedor de cada producto. Usamos la clase porque vamos a componer
    // sobre él con .filter({ hasText }) para localizar por nombre de producto.
    this.items = page.locator('.inventory_item');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  /** Locator del título "Products" — para aserciones web-first de "página cargada". */
  titleLocator(): Locator {
    return this.title;
  }

  /**
   * Agrega un producto al carrito por su nombre visible.
   * Filtramos el contenedor del producto por su texto y clickeamos SU botón
   * "Add to cart". Localizar por rol + nombre es robusto y accesible.
   */
  async addProductToCart(productName: string): Promise<void> {
    const item = this.items.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  /** Quita un producto del carrito desde el inventario. */
  async removeProductFromCart(productName: string): Promise<void> {
    const item = this.items.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  /** Selecciona una opción de ordenamiento por su value real del <select>. */
  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /** Devuelve los nombres de los productos en el orden en que se muestran. */
  async getProductNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  /**
   * Devuelve los precios como números (sin el símbolo '$'), en orden de aparición.
   * Convertir a número nos deja comparar orden y hacer aritmética en las aserciones.
   */
  async getProductPrices(): Promise<number[]> {
    const raw = await this.itemPrices.allTextContents();
    return raw.map((price) => Number(price.replace('$', '').trim()));
  }
}
