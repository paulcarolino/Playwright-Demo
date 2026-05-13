import { expect, Page, Locator } from "playwright/test";

export class checkoutPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkErrorLoginMessageString(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(message);
  }

  getItemTitle(itemName: string) {
    return this.page.getByText(itemName);
  }

  getItem(itemName: string): Locator {
    return this.page.locator(".cart_item").filter({
      hasText: itemName,
    });
  }

  async getPriceText() {
    return await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
  }
}
