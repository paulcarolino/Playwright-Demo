import { test as setup } from "../test-options";

const authFile = ".auth/user.json";

setup("authentication", async ({ page, pageManager }) => {
  await pageManager.onLoginPage().login("standard_user", "secret_sauce");
  await page.waitForURL("**/inventory.html");
  await page.context().storageState({ path: authFile });
});
