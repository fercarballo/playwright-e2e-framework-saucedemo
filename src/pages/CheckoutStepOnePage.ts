import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutInfo } from '@data/checkout.data';

/**
 * Page Object del paso 1 del checkout: formulario de datos personales.
 */
export class CheckoutStepOnePage extends BasePage {
  protected readonly path = '/checkout-step-one.html';

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /** Completa el formulario a partir de un objeto CheckoutInfo. */
  async fillInformation(info: CheckoutInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  /** Avanza al resumen de la orden (paso 2). */
  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  /** Locator del error, para aserciones web-first de validación. */
  errorLocator(): Locator {
    return this.errorMessage;
  }
}
