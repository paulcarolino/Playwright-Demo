import { PageManager } from "../page-objects/pagemanager";
import { test } from "../test-options";
import { expect } from "@playwright/test";

test.beforeEach(async ({ page, pageManager }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await pageManager.onInventoryPage().addToCartItem("Sauce Labs Backpack");
  await pageManager.onInventoryPage().addToCartItem("Sauce Labs Bike Light");
  await pageManager.inHeader().goToCart();
  await pageManager.onCartPage().getItemTitle("Checkout").click();
});

test("Cancel Checkout", async ({ pageManager }) => {
  await pageManager.onCheckOutPage().getItemTitle("Cancel").click();
  await pageManager.onCartPage().getItemTitle("Sauce Labs Backpack").isVisible();
  await pageManager.onCartPage().getItemTitle("Sauce Labs Bike Light").isVisible();
});

test("Submit without any fields", async ({ pageManager }) => {
  await pageManager.onCheckOutPage().getItemTitle("Continue").click();
  await pageManager.onCheckOutPage().checkErrorLoginMessageString("Error: First Name is required");
});

test("Submit with missing field of First Name", async ({ page, pageManager }) => {
  const { faker } = await import("@faker-js/faker");
  await page.getByPlaceholder("Last Name").fill(faker.person.lastName());
  await page.getByPlaceholder("Zip/Postal Code").fill(faker.location.zipCode());
  await pageManager.onCheckOutPage().getItemTitle("Continue").click();
  await pageManager.onCheckOutPage().checkErrorLoginMessageString("Error: First Name is required");
});

test("Submit with missing field of Last Name", async ({ page, pageManager }) => {
  const { faker } = await import("@faker-js/faker");
  await page.getByPlaceholder("First Name").fill(faker.person.firstName());
  await page.getByPlaceholder("Zip/Postal Code").fill(faker.location.zipCode());
  await pageManager.onCheckOutPage().getItemTitle("Continue").click();
  await pageManager.onCheckOutPage().checkErrorLoginMessageString("Error: Last Name is required");
});

test("Submit with missing field of Zip/Postal Code", async ({ page, pageManager }) => {
  const { faker } = await import("@faker-js/faker");
  await page.getByPlaceholder("First Name").fill(faker.person.firstName());
  await page.getByPlaceholder("Last Name").fill(faker.person.lastName());
  await pageManager.onCheckOutPage().getItemTitle("Continue").click();
  await pageManager.onCheckOutPage().checkErrorLoginMessageString("Error: Postal Code is required");
});

test("Submit with all fields", async ({ page, pageManager }) => {
  const { faker } = await import("@faker-js/faker");
  await page.getByPlaceholder("First Name").fill(faker.person.firstName());
  await page.getByPlaceholder("Last Name").fill(faker.person.lastName());
  await page.getByPlaceholder("Zip/Postal Code").fill(faker.location.zipCode());
  await pageManager.onCheckOutPage().getItemTitle("Continue").click();
  await expect(page).toHaveURL(/checkout-step-two/);
  await pageManager.onCheckOutPage().getItem("Sauce Labs Backpack").isVisible();
  await pageManager.onCheckOutPage().getItem("Sauce Labs Bike Light").isVisible();
  const priceText = await pageManager.onCheckOutPage().getPriceText();
  const price = priceText.map((price) => Number(price.replace("$", ""))).reduce((sum, price) => sum + price, 0);
  const subtotalText = await page.locator('[data-test="subtotal-label"]').textContent();
  const subtotal = await Number(subtotalText?.replace("Item total: $", "").trim());
  await expect(subtotal).toBe(price);
});

test("Cancel Order", async ({ page, pageManager }) => {
  const { faker } = await import("@faker-js/faker");
  await page.getByPlaceholder("First Name").fill(faker.person.firstName());
  await page.getByPlaceholder("Last Name").fill(faker.person.lastName());
  await page.getByPlaceholder("Zip/Postal Code").fill(faker.location.zipCode());
  await pageManager.onCheckOutPage().getItemTitle("Continue").click();
  await pageManager.onCheckOutPage().getItemTitle("Cancel").click();
  await expect(page).toHaveURL(/inventory/);
  await expect((await pageManager.onInventoryPage().getProductNames()).length).toBeGreaterThan(0);
});

test("Confirmation Order", async ({ page, pageManager }) => {
  const { faker } = await import("@faker-js/faker");
  await page.getByPlaceholder("First Name").fill(faker.person.firstName());
  await page.getByPlaceholder("Last Name").fill(faker.person.lastName());
  await page.getByPlaceholder("Zip/Postal Code").fill(faker.location.zipCode());
  await pageManager.onCheckOutPage().getItemTitle("Continue").click();
  await pageManager.onCheckOutPage().getItemTitle("Finish").click();
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
});

test("Back to Home", async ({ page, pageManager }) => {
  const { faker } = await import("@faker-js/faker");
  await page.getByPlaceholder("First Name").fill(faker.person.firstName());
  await page.getByPlaceholder("Last Name").fill(faker.person.lastName());
  await page.getByPlaceholder("Zip/Postal Code").fill(faker.location.zipCode());
  await pageManager.onCheckOutPage().getItemTitle("Continue").click();
  await pageManager.onCheckOutPage().getItemTitle("Finish").click();
  await pageManager.onCheckOutPage().getItemTitle("Back Home").click();
  await expect(page).toHaveURL(/inventory/);
});
