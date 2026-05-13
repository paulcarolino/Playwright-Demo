import { test } from "../test-options";
import { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
});

test("Add to Cart Item", async ({ pageManager }) => {
  const itemName = "Sauce Labs Backpack";
  await pageManager.onInventoryPage().addToCartItem(itemName);
  await pageManager.onInventoryPage().expectCartCount(1);

  await expect(
    pageManager.onInventoryPage().getRemoveToCartButton(itemName),
  ).toBeVisible();
});

test("Remove to Cart Item", async ({ pageManager }) => {
  const itemName = "Sauce Labs Bike Light";
  await pageManager.onInventoryPage().addToCartItem(itemName);
  await pageManager.onInventoryPage().removeItemToCart(itemName);
  await pageManager.onInventoryPage().expectCartCount(0);
  await expect(
    pageManager.onInventoryPage().getAddToCartButton(itemName),
  ).toBeVisible();
});

test("Item preview", async ({ page, pageManager }) => {
  const itemName = "Sauce Labs Bike Light";
  await pageManager.onInventoryPage().getItemTitle(itemName).click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
    itemName,
  );
});

test("Product Listing: Name (A to Z)", async ({ pageManager }) => {
  await pageManager.onInventoryPage().selectSorting("Name (A to Z)");
  const productNames = await pageManager.onInventoryPage().getProductNames();
  const sortedNames = [...productNames].sort();
  expect(productNames).toEqual(sortedNames);
});

test("Product Listing: Name (Z to A)", async ({ pageManager }) => {
  await pageManager.onInventoryPage().selectSorting("Name (Z to A)");
  const productNames = await pageManager.onInventoryPage().getProductNames();
  const sortedNames = [...productNames].sort().reverse();
  expect(productNames).toEqual(sortedNames);
});

test("Product Listing: Price (high to low)", async ({ pageManager }) => {
  await pageManager.onInventoryPage().selectSorting("Price (high to low)");
  const productPriceText = await pageManager.onInventoryPage().getPriceText();
  const prices = productPriceText.map((price) =>
    Number(price.replace("$", "")),
  );
  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedPrices);
});

test("Product Listing: Price (low to high)", async ({ pageManager }) => {
  await pageManager.onInventoryPage().selectSorting("Price (low to high)");
  const productPriceText = await pageManager.onInventoryPage().getPriceText();
  const prices = productPriceText.map((price) =>
    Number(price.replace("$", "")),
  );
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});
