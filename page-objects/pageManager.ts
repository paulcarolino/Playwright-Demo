import { Page, expect } from "@playwright/test";
import { loginPage } from "./loginPage";
import { inventoryPage } from "./inventoryPage";
import { productPage } from "./productPage";
import { HeaderBar } from "./header";
import { cartPage } from "./cartPage";
import { checkoutPage } from "./checkoutPage";

export class PageManager {
  constructor(private page: Page) {}

  onLoginPage() {
    return new loginPage(this.page);
  }

  onInventoryPage() {
    return new inventoryPage(this.page);
  }

  onProductPage() {
    return new productPage(this.page);
  }

  onCartPage() {
    return new cartPage(this.page);
  }

  inHeader() {
    return new HeaderBar(this.page);
  }

  onCheckOutPage() {
    return new checkoutPage(this.page);
  }
}
