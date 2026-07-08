import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { User } from '@data/users';

/**
 * Page Object de la página de Login (la home de SauceDemo).
 *
 * Un Page Object encapsula DOS cosas:
 *   1. Los localizadores de la página (los elementos con los que interactúa).
 *   2. Las acciones de negocio que se pueden hacer en ella (login, leer error).
 *
 * Los tests NO conocen los selectores: solo llaman a métodos como `login(user)`.
 * Si mañana cambia el DOM, se corrige acá y los tests quedan intactos.
 */
export class LoginPage extends BasePage {
  protected readonly path = '/';

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /** Login usando un objeto User de nuestros datos de prueba. */
  async login(user: User): Promise<void> {
    await this.loginWith(user.username, user.password);
  }

  /** Login con credenciales sueltas (útil para casos negativos con datos ad-hoc). */
  async loginWith(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Expone el Locator del error (no el texto) para que el test use
   * aserciones web-first: await expect(loginPage.errorLocator()).toContainText(...).
   * Esto aprovecha el auto-wait de Playwright (reintenta hasta que aparece).
   */
  errorLocator(): Locator {
    return this.errorMessage;
  }
}
