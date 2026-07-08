/**
 * Datos de prueba para el checkout, usando el patrón BUILDER.
 *
 * ¿Por qué un Builder y no un objeto plano?
 * Cuando un test necesita "los datos válidos pero con el código postal vacío",
 * con un builder lo expresás de forma legible y sin repetir el objeto entero:
 *
 *     new CheckoutInfoBuilder().withPostalCode('').build()
 *
 * Todo lo que no especificás toma un valor por defecto válido. Así cada test
 * declara SOLO la variación que le importa, y se lee como una frase.
 */

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutInfoBuilder {
  private info: CheckoutInfo = {
    firstName: 'Fernando',
    lastName: 'Carballo',
    postalCode: 'C1000',
  };

  withFirstName(value: string): this {
    this.info.firstName = value;
    return this;
  }

  withLastName(value: string): this {
    this.info.lastName = value;
    return this;
  }

  withPostalCode(value: string): this {
    this.info.postalCode = value;
    return this;
  }

  /** Devuelve una copia inmutable, para que dos tests no compartan el mismo objeto. */
  build(): CheckoutInfo {
    return { ...this.info };
  }
}
