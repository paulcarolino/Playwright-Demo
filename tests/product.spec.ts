import { test } from "../test-options";
import { expect } from "@playwright/test";

test.beforeEach(async ({ page, pageManager }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  const productNames: string[] = await pageManager
    .onInventoryPage()
    .getProductNames();
  const itemName: string =
    productNames[Math.floor(Math.random() * productNames.length)];
  await pageManager.onInventoryPage().getItemTitle(itemName).click();
});

test("Add to Cart Item", async ({ pageManager }) => {
  await pageManager.onProductPage().addToCartItem();
  await pageManager.onProductPage().expectCartCount(1);
  await expect(
    pageManager.onProductPage().getRemoveToCartButton(),
  ).toBeVisible();
});

test("Remove to Cart Item", async ({ pageManager }) => {
  await pageManager.onProductPage().addToCartItem();
  await pageManager.onProductPage().removeItemToCart();
  await pageManager.onProductPage().expectCartCount(0);
  await expect(pageManager.onProductPage().getAddToCartButton()).toBeVisible();
});
