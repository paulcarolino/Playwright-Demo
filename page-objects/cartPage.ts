import { expect, Page, Locator } from "playwright/test";

export class cartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getItemTitle(itemName: string) {
    return this.page.getByText(itemName);
  }

  getRemoveToCartButton(itemName: string) {
    return this.getItem(itemName).getByRole("button", { name: "Remove" });
  }

  getItem(itemName: string): Locator {
    return this.page.locator(".cart_item").filter({
      hasText: itemName,
    });
  }

  getItemQuantity(itemName: string) {
    return this.getItem(itemName).locator('[data-test="item-quantity"]');
  }
}
