import { PageManager } from "../page-objects/pagemanager";
import { test } from "../test-options";
import { expect } from "@playwright/test";

const itemName = "Sauce Labs Backpack";

test.beforeEach(async ({ page, pageManager }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await pageManager.onInventoryPage().addToCartItem(itemName);
  await pageManager.inHeader().goToCart();
});

test("Add to Cart Item", async ({ pageManager }) => {
  await expect(pageManager.onCartPage().getItemTitle(itemName)).toHaveCount(1);
  await expect(pageManager.onCartPage().getItemQuantity(itemName)).toHaveText(
    "1",
  );
});

test("Add multiple Item", async ({ page, pageManager }) => {
  await pageManager.onCartPage().getItemTitle("Continue Shopping").click();
  const productNames = await pageManager.onInventoryPage().getProductNames();
  await pageManager.onInventoryPage().addToCartItem(productNames[1]);
  await pageManager.onInventoryPage().addToCartItem(productNames[2]);
  await pageManager.inHeader().goToCart();
  await expect(pageManager.onCartPage().getItem(productNames[1])).toHaveCount(
    1,
  );
  await expect(pageManager.onCartPage().getItem(productNames[2])).toHaveCount(
    1,
  );
});

test("Go to Item Preview", async ({ pageManager }) => {
  await pageManager.onCartPage().getItemTitle(itemName).click();
  await expect(
    pageManager.onProductPage().getItemTitle(itemName),
  ).toBeVisible();
  await expect(
    pageManager.onProductPage().getRemoveToCartButton(),
  ).toBeVisible();
});

test("Remove Item from Cart", async ({ pageManager }) => {
  await pageManager.onCartPage().getRemoveToCartButton(itemName).click();
  await expect(pageManager.onProductPage().getItemTitle(itemName)).toHaveCount(
    0,
  );
});

test("Continue Shopping", async ({ page, pageManager }) => {
  await pageManager.onCartPage().getItemTitle("Continue Shopping").click();
  const productNames = await pageManager.onInventoryPage().getProductNames();
  await expect(page).toHaveURL(/inventory/);
  await expect(productNames.length).toBeGreaterThan(0);
});
