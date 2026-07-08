import { test, expect } from '@fixtures/pages.fixture';
import { USERS } from '@data/users';

/**
 * Suite de Login.
 *
 * Etiquetas (@smoke / @regression): permiten filtrar qué correr.
 *   npm run test:smoke      → solo lo crítico y rápido
 *   npm run test:regression → la cobertura completa
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('login exitoso redirige al inventario @smoke @regression', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.login(USERS.standard);

    // Aserción de redirección + de "página cargada" con assertions web-first
    // (esperan/reintentan automáticamente; nada de sleeps).
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.titleLocator()).toHaveText('Products');
  });

  /**
   * DATA-DRIVEN TESTING: un mismo test lógico, muchos sets de datos.
   * Cada caso se genera como un test independiente, así el reporte muestra
   * exactamente cuál falló (no "el test de login" a secas).
   */
  const casosNegativos = [
    {
      caso: 'usuario bloqueado',
      username: USERS.lockedOut.username,
      password: USERS.lockedOut.password,
      errorEsperado: 'Sorry, this user has been locked out.',
    },
    {
      caso: 'password incorrecta',
      username: USERS.standard.username,
      password: 'password_incorrecta',
      errorEsperado: 'Username and password do not match any user in this service',
    },
    {
      caso: 'usuario inexistente',
      username: 'usuario_fantasma',
      password: 'lo_que_sea',
      errorEsperado: 'Username and password do not match any user in this service',
    },
  ];

  for (const tc of casosNegativos) {
    test(`login fallido: ${tc.caso} @regression`, async ({ loginPage }) => {
      await loginPage.loginWith(tc.username, tc.password);
      await expect(loginPage.errorLocator()).toContainText(tc.errorEsperado);
    });
  }

  test('campos vacíos muestran mensaje de validación @regression', async ({ loginPage }) => {
    await loginPage.loginWith('', '');
    await expect(loginPage.errorLocator()).toContainText('Username is required');
  });
});
