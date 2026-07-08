import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutStepOnePage } from '@pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '@pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '@pages/CheckoutCompletePage';
import { USERS } from '@data/users';

/**
 * FIXTURES personalizados de Playwright.
 *
 * ¿Qué problema resuelven?
 * Sin fixtures, cada test tendría que instanciar sus Page Objects a mano:
 *     const loginPage = new LoginPage(page);
 *     const inventoryPage = new InventoryPage(page);
 * repitiendo ese boilerplate en decenas de tests.
 *
 * Con fixtures, extendemos el `test` de Playwright para que INYECTE los Page
 * Objects ya construidos. El test los recibe por desestructuración y va directo
 * a la lógica:
 *     test('...', async ({ loginPage, inventoryPage }) => { ... })
 *
 * Los fixtures son "lazy": Playwright solo construye los que el test realmente
 * pide en su firma. Es el mecanismo idiomático y moderno de Playwright, superior
 * a un beforeEach gigante o a heredar de una clase base de test.
 */

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOne: CheckoutStepOnePage;
  checkoutStepTwo: CheckoutStepTwoPage;
  checkoutComplete: CheckoutCompletePage;
  /**
   * Fixture de conveniencia: entrega el inventario CON el usuario ya logueado.
   * Encapsula el login por UI, así los tests que no prueban el login en sí
   * arrancan directamente desde el estado autenticado.
   */
  loggedInInventory: InventoryPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOne: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwo: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkoutComplete: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  loggedInInventory: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);
    await use(new InventoryPage(page));
  },
});

// Re-exportamos `expect` para que los tests importen todo desde un único lugar:
//     import { test, expect } from '@fixtures/pages.fixture';
export { expect } from '@playwright/test';
