import { test, expect } from '@fixtures/pages.fixture';

/**
 * Suite del carrito de compras.
 */
test.describe('Carrito de compras', () => {
  const PRODUCTOS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  test('agregar productos actualiza el badge y el contenido del carrito @smoke @regression', async ({
    loggedInInventory,
    cartPage,
  }) => {
    for (const producto of PRODUCTOS) {
      await loggedInInventory.addProductToCart(producto);
    }

    // El badge del header refleja la cantidad agregada.
    expect(await loggedInInventory.header.getCartCount()).toBe(PRODUCTOS.length);

    // Y dentro del carrito están exactamente esos productos.
    await loggedInInventory.header.openCart();
    expect(await cartPage.getItemCount()).toBe(PRODUCTOS.length);

    const enCarrito = await cartPage.getItemNames();
    // Comparamos como conjuntos (orden-independiente) para no atarnos al orden de renderizado.
    expect(enCarrito.sort()).toEqual([...PRODUCTOS].sort());
  });

  test('remover un producto lo saca del carrito @regression', async ({
    loggedInInventory,
    cartPage,
  }) => {
    for (const producto of PRODUCTOS) {
      await loggedInInventory.addProductToCart(producto);
    }
    await loggedInInventory.header.openCart();

    await cartPage.removeItem('Sauce Labs Backpack');

    expect(await cartPage.getItemCount()).toBe(1);
    expect(await cartPage.getItemNames()).toEqual(['Sauce Labs Bike Light']);
  });
});
