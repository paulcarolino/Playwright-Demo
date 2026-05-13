import { expect, Page, Locator } from "playwright/test";

export class HeaderBar {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  goToCart() {
    return this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
