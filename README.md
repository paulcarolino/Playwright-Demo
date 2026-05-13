# Sauce Demo - Playwright E-Commerce Test Automation

A comprehensive test automation suite for the [Sauce Demo](https://www.saucedemo.com/) e-commerce application using Playwright and TypeScript. The project implements the Page Object Model (POM) pattern for maintainable and scalable test automation.

## 🎯 Project Overview

This project automates testing of core e-commerce workflows including:

- User authentication and login flows
- Product inventory browsing and filtering
- Shopping cart management
- Checkout process
- Product details and interactions

## 🛠 Tech Stack

- **Playwright** (v1.59.1) - Modern web automation testing framework
- **TypeScript** - Type-safe test development
- **Faker** (v10.4.0) - Realistic test data generation
- **HTML Reports** - Detailed test execution reports

## 📁 Project Structure

```
├── auth/                      # Authentication setup
│   └── auth.setup.ts         # Login session configuration
├── page-objects/             # Page Object Model pattern
│   ├── cartPage.ts           # Shopping cart page
│   ├── checkoutPage.ts       # Checkout flow pages
│   ├── header.ts             # Common header components
│   ├── inventoryPage.ts      # Product inventory page
│   ├── loginPage.ts          # Login page
│   ├── pageManager.ts        # Page object manager
│   └── productPage.ts        # Individual product page
├── tests/                    # Test specifications
│   ├── cart.spec.ts          # Cart functionality tests
│   ├── checkout.spec.ts      # Checkout flow tests
│   ├── inventory.spec.ts     # Inventory & browsing tests
│   ├── login.spec.ts         # Authentication tests
│   └── product.spec.ts       # Product page tests
├── playwright-report/        # HTML test reports
├── test-results/             # Test execution results
├── playwright.config.ts      # Playwright configuration
├── test-options.ts           # Custom test options/fixtures
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repository-url>
   cd "Sauce Demo"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## 📋 Configuration

### Playwright Config (`playwright.config.ts`)

Key configurations:

- **Base URL**: `https://www.saucedemo.com/`
- **Timeout**: 2000ms for assertions
- **Workers**: 3 parallel workers
- **Retries**: 1 retry on failure
- **Reporter**: HTML report generation
- **Trace**: Captured on first retry for debugging

### Test Projects

1. **Setup** - Runs authentication setup (`*.setup.ts`)
2. **E-Commerce** - Main test suite with authenticated sessions
3. **Login** - Login-specific tests

## 🧪 Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test tests/login.spec.ts
```

### Run Tests for a Specific Project

```bash
npx playwright test --project=E-Commerce
npx playwright test --project=login
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests in UI Mode (Interactive)

```bash
npx playwright test --ui
```

### Run Tests with Headed Browser

```bash
npx playwright test --headed
```

## 📊 Test Reports

After test execution, view the HTML report:

```bash
npx playwright show-report
```

The report includes:

- Test results summary
- Individual test details
- Screenshots and traces
- Execution timeline

## 🔐 Authentication

The project uses Playwright's built-in authentication feature:

1. **Setup Phase** (`auth.setup.ts`) - Logs in once and saves session
2. **Authenticated Tests** - Reuse saved authentication state
3. **Session Storage** - Stored in `.auth/user.json` (Git ignored)

This approach significantly speeds up test execution by avoiding repeated login steps.

## 📝 Page Object Model Pattern

All UI interactions are abstracted through page object classes:

```typescript
// Example usage
import { PageManager } from "./page-objects/pageManager";

test("example test", async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.onLoginPage().login("username", "password");
  await pageManager.onInventoryPage().selectProduct("Backpack");
});
```

## 🧩 Test Features

### Test Data Generation

Uses Faker.js for generating realistic test data:

- Random user credentials
- Product information
- Address and payment details

### Cross-browser Testing

Configured for:

- Chrome (default)
- Additional browsers can be added to `playwright.config.ts`

### Parallel Execution

Tests run in parallel (3 workers) for faster execution

## 🐛 Debugging

### View Traces

Traces are automatically captured on first retry and can be viewed:

```bash
npx playwright show-trace trace.zip
```

### Screenshots

Screenshots are captured on test failure in the `test-results/` directory

### Debug Mode

Run tests with interactive debugger:

```bash
npx playwright test --debug
```

## 📦 Dependencies

See `package.json` for complete dependency list. Main packages:

- `@playwright/test` - Test runner and assertions
- `playwright` - Browser automation
- `@faker-js/faker` - Test data generation
- `@types/node` - TypeScript definitions

## 📝 Notes

- Tests are configured to run from the workspace root
- Base URL is set to Sauce Demo application
- Authentication is cached between test runs
- Failed tests automatically retry once
- All test results are stored in `test-results/` directory

## 🤝 Contributing

When adding new tests:

1. Create page objects in `page-objects/` for UI interactions
2. Keep tests in `tests/` directory
3. Follow existing naming conventions
4. Use the PageManager for page navigation
5. Generate test data using Faker when applicable

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Sauce Demo](https://www.saucedemo.com/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

**Last Updated**: May 2026
