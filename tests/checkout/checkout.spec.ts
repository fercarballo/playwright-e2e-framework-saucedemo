import { test, expect } from '@fixtures/pages.fixture';
import { CheckoutInfoBuilder } from '@data/checkout.data';

/**
 * Suite de Checkout: el flujo end-to-end estrella del proyecto.
 *
 * El caso principal atraviesa TODO el flujo de compra y, además de confirmar la
 * orden, hace una verificación de NEGOCIO: que los totales cuadren
 * (Total = Item total + Tax). Eso demuestra que no solo "clickeamos botones"
 * sino que validamos la lógica que le importa al usuario y al negocio.
 */
test.describe('Checkout end-to-end', () => {
  const PRODUCTOS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  test('compra completa: los totales cuadran y la orden se confirma @smoke @regression', async ({
    loggedInInventory,
    cartPage,
    checkoutStepOne,
    checkoutStepTwo,
    checkoutComplete,
  }) => {
    // 1. Agregar productos
    for (const producto of PRODUCTOS) {
      await loggedInInventory.addProductToCart(producto);
    }

    // 2. Ir al carrito y comenzar el checkout
    await loggedInInventory.header.openCart();
    await cartPage.checkout();

    // 3. Completar los datos personales (con nuestro builder de datos)
    await checkoutStepOne.fillInformation(new CheckoutInfoBuilder().build());
    await checkoutStepOne.continue();

    // 4. Verificación de negocio: el total debe ser item total + impuesto
    const itemTotal = await checkoutStepTwo.getItemTotal();
    const tax = await checkoutStepTwo.getTax();
    const total = await checkoutStepTwo.getTotal();

    expect(itemTotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThan(0);
    // toFixed(2) evita errores de coma flotante (0.1 + 0.2 !== 0.3 en JS).
    expect(Number((itemTotal + tax).toFixed(2))).toBe(total);

    // 5. Confirmar y validar el mensaje de éxito
    await checkoutStepTwo.finish();
    await expect(checkoutComplete.confirmationLocator()).toHaveText('Thank you for your order!');
  });

  test('checkout sin código postal muestra error de validación @regression', async ({
    loggedInInventory,
    cartPage,
    checkoutStepOne,
  }) => {
    await loggedInInventory.addProductToCart('Sauce Labs Backpack');
    await loggedInInventory.header.openCart();
    await cartPage.checkout();

    // El builder nos deja pedir "datos válidos PERO con el postal vacío" en una línea.
    await checkoutStepOne.fillInformation(new CheckoutInfoBuilder().withPostalCode('').build());
    await checkoutStepOne.continue();

    await expect(checkoutStepOne.errorLocator()).toContainText('Postal Code is required');
  });
});
