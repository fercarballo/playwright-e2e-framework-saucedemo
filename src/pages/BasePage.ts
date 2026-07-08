import { Page } from '@playwright/test';

/**
 * Clase base de todos los Page Objects.
 *
 * Encapsula lo común a todas las páginas: la referencia a `page` y la
 * navegación por una ruta relativa a la baseURL definida en playwright.config.ts.
 *
 * Es `abstract` porque no representa ninguna página concreta: existe solo para
 * ser heredada. Cada página hija define su propio `path`.
 */
export abstract class BasePage {
  /** Ruta relativa a la baseURL (ej: '/inventory.html'). La define cada hija. */
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  /** Navega a la página usando su ruta relativa. */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  /** URL actual del navegador. Útil para aserciones de redirección. */
  url(): string {
    return this.page.url();
  }
}
