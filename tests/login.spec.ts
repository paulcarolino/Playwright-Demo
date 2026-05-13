import { expect } from "@playwright/test";
import { test } from "../test-options";

test("Login with Right Credentials", async ({ page, pageManager }) => {
  await pageManager.onLoginPage().login("standard_user", "secret_sauce");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator(".inventory_container")).toBeVisible();
});

test("Login No Username", async ({ pageManager }) => {
  await pageManager.onLoginPage().login("", "secret_sauce");
  await pageManager
    .onLoginPage()
    .checkErrorLoginMessageString("Username is required");
});

test("Login No Password}", async ({ pageManager }) => {
  await pageManager.onLoginPage().login("standard_user", "");
  await pageManager
    .onLoginPage()
    .checkErrorLoginMessageString("Password is required");
});

test("Login with Wrong Username", async ({ pageManager }) => {
  await pageManager.onLoginPage().login("test", "secret_sauce");
  await pageManager
    .onLoginPage()
    .checkErrorLoginMessageString(
      "Username and password do not match any user in this service",
    );
});

test("Login with Wrong Password", async ({ pageManager }) => {
  await pageManager.onLoginPage().login("standard_user", "test");
  await pageManager
    .onLoginPage()
    .checkErrorLoginMessageString(
      "Username and password do not match any user in this service",
    );
});

test("Login with Locked Out User", async ({ pageManager }) => {
  await pageManager.onLoginPage().login("locked_out_user", "secret_sauce");
  await pageManager
    .onLoginPage()
    .checkErrorLoginMessageString("Sorry, this user has been locked out.");
});

test("Check for the Error Button", async ({ page, pageManager }) => {
  await pageManager.onLoginPage().login("standard_user", "test");
  await page.locator('[data-test="error-button"]').click();
  await expect(page.locator('[data-test="error"]')).not.toBeVisible();
});
