# Sauce Demo - Playwright Tests

Test automation suite for [Sauce Demo](https://www.saucedemo.com/) using Playwright and TypeScript.

## Setup

Install dependencies:

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/login.spec.ts

# Debug mode
npx playwright test --debug

# Interactive UI mode
npx playwright test --ui

# View results
npx playwright show-report
```

## Project Structure

- **tests/** - Test files
- **page-objects/** - Page objects for reusable UI interactions
- **auth/** - Login setup (runs once, sessions are cached)
- **playwright.config.ts** - Test configuration

## Key Details

The test suite runs 3 workers in parallel with a 1-retry policy. Login sessions are cached in `.auth/user.json` to speed up test runs. Test projects include setup, e-commerce tests, and login-only tests.

Uses TypeScript, Faker for test data, and generates HTML reports after each run.
