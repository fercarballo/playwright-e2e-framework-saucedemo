import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object de la página final del checkout (orden confirmada).
 */
export class CheckoutCompletePage extends BasePage {
  protected readonly path = '/checkout-complete.html';

  private readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  /** Locator del mensaje de confirmación ("Thank you for your order!"). */
  confirmationLocator(): Locator {
    return this.completeHeader;
  }
}
