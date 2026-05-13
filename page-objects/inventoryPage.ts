import { expect, Page, Locator } from "playwright/test";
type SortingOption =
  | "Name (A to Z)"
  | "Name (Z to A)"
  | "Price (low to high)"
  | "Price (high to low)";

export class inventoryPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getItem(itemName: string): Locator {
    return this.page.locator(".inventory_item").filter({
      hasText: itemName,
    });
  }

  async getProductNames() {
    return await this.page.locator(".inventory_item_name").allTextContents();
  }

  async getPriceText() {
    return await this.page.locator(".inventory-item-price").allTextContents();
  }

  getItemTitle(itemName: string) {
    return this.page.getByText(itemName);
  }

  getRemoveToCartButton(itemName: string) {
    return this.getItem(itemName).getByRole("button", { name: "Remove" });
  }

  getAddToCartButton(itemName: string) {
    return this.getItem(itemName).getByRole("button", { name: "Add to cart" });
  }

  async addToCartItem(itemName: string) {
    await this.getAddToCartButton(itemName).click();
  }

  async removeItemToCart(itemName: string) {
    await this.getRemoveToCartButton(itemName).click();
  }

  async selectSorting(sorting: SortingOption) {
    await this.page
      .locator('[data-test="product-sort-container"]')
      .selectOption(sorting);
  }

  async expectCartCount(expected: number) {
    const badge = this.page.locator("[data-test='shopping-cart-badge']");

    if (expected === 0) {
      await expect(badge).toHaveCount(0);
    } else {
      await expect(badge).toHaveText(String(expected));
    }
  }
}
