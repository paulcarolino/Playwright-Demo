import { expect, Page } from "playwright/test";

export class loginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.goto("/");
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async checkErrorLoginMessageString(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: " + message,
    );
  }
}
