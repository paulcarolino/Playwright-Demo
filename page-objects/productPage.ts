import { expect, Page, Locator } from "playwright/test";

export class productPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectCartCount(expected: number) {
    const badge = this.page.locator("[data-test='shopping-cart-badge']");

    if (expected === 0) {
      await expect(badge).toHaveCount(0);
    } else {
      await expect(badge).toHaveText(String(expected));
    }
  }

  getItemTitle(itemName: string) {
    return this.page.getByText(itemName);
  }

  getRemoveToCartButton() {
    return this.page.getByRole("button", { name: "Remove" });
  }

  getAddToCartButton() {
    return this.page.getByRole("button", { name: "Add to cart" });
  }

  async addToCartItem() {
    await this.getAddToCartButton().click();
  }

  async removeItemToCart() {
    await this.getRemoveToCartButton().click();
  }
}
