import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  expect: {
    timeout: 2000,
  },
  fullyParallel: true,
  retries: 1,
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "https://www.saucedemo.com/",

    trace: "on-first-retry",
  },

  projects: [
    { name: "setup", testMatch: "**/*.setup.ts" },
    {
      name: "E-Commerce",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      testIgnore: "login.spec.ts",
      dependencies: ["setup"],
    },
    {
      name: "login",
      testMatch: "login.spec.ts",
    },
  ],
});
