import { test, expect } from '@fixtures/pages.fixture';

/**
 * Suite de ordenamiento del inventario.
 *
 * En lugar de hardcodear el orden esperado (frágil si cambia el catálogo),
 * verificamos una PROPIEDAD: la lista que devuelve la app debe ser igual a la
 * misma lista ordenada por nosotros. Es una aserción robusta y auto-documentada.
 */
test.describe('Ordenamiento de productos', () => {
  test('ordena por nombre A → Z @regression', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('az');
    const names = await loggedInInventory.getProductNames();
    const esperado = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(esperado);
  });

  test('ordena por nombre Z → A @regression', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('za');
    const names = await loggedInInventory.getProductNames();
    const esperado = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(esperado);
  });

  test('ordena por precio menor → mayor @regression', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('lohi');
    const prices = await loggedInInventory.getProductPrices();
    const esperado = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(esperado);
  });

  test('ordena por precio mayor → menor @regression', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('hilo');
    const prices = await loggedInInventory.getProductPrices();
    const esperado = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(esperado);
  });
});
