# Playwright Automation Project Skill

**Created with**: Claude Haiku 4.5

## Overview
This skill provides domain-specific knowledge for the Playwright Automation Project. Use this skill when working with test automation, test case creation, debugging tests, and project configuration.

## When to Use This Skill
- Creating or modifying test cases in the `tests/` directory
- Configuring Playwright settings in `playwright.config.js`
- Running tests and analyzing test reports
- Implementing page object models or test utilities
- Debugging flaky tests or failures
- Setting up new test scenarios using Playwright APIs

## When NOT to Use This Skill
- General Node.js development questions unrelated to testing
- JavaScript fundamentals not specific to Playwright
- Project setup from scratch (use project-setup-info-local skill)
- IDE configuration or VS Code settings

## Project Structure

```
PlaywrightAutomationProject/
├── package.json                 # Project dependencies (Playwright 1.60.0)
├── playwright.config.js         # Playwright configuration
├── tests/                       # Test files directory
│   ├── task.spec.js            # Main test file
│   └── UiBasics.spec.js        # Additional test file
├── playwright-report/           # Generated HTML test reports
├── test-results/               # Test execution results
└── SKILL.md                    # This file
```

## Key Configuration Details

**Playwright Version**: 1.60.0

**Browser**: Chrome (Chromium)
- **Headless Mode**: Off (visible browser window)
- **Test Timeout**: 30 seconds
- **Expect Timeout**: 5 seconds

**Reporter**: HTML (generates reports in `playwright-report/`)

## Common Test Patterns

### Basic Test Structure
```javascript
const { test, expect } = require('@playwright/test');

test("test description", async ({ page }) => {
    // Test implementation
});
```

### Common Locator Methods
- `page.locator("#id")` - Select by ID
- `page.locator(".class")` - Select by class
- `page.goto(url)` - Navigate to URL
- `page.waitForLoadState("networkidle")` - Wait for network
- `locator.fill(text)` - Fill text input
- `locator.click()` - Click element
- `locator.textContent()` - Get text
- `locator.count()` - Count elements

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/task.spec.js

# Run with UI mode
npx playwright test --ui

# Generate HTML report
npx playwright test
# Report opens in: playwright-report/index.html
```

## Best Practices for This Project

1. **Page Navigation**: Always wait for network idle after navigation
   ```javascript
   await page.goto(url);
   await page.waitForLoadState("networkidle");
   ```

2. **Assertions**: Use expect() for verifications
   ```javascript
   await expect(locator).toBeVisible();
   await expect(locator).toHaveText("expected");
   ```

3. **Data Management**: Extract selectors as constants for reusability
   ```javascript
   const PRODUCT_NAME = "ZARA COAT 3";
   const userEmailInput = "#userEmail";
   ```

4. **Element Iteration**: Use nth() for accessing elements in loops
   ```javascript
   const items = page.locator(".card-body");
   for (let i = 0; i < await items.count(); i++) {
       const text = await items.nth(i).locator("b").textContent();
   }
   ```

5. **Credentials**: For real projects, use environment variables instead of hardcoding

## Debugging

- Check `test-results/` folder for failure details
- View HTML report: `playwright-report/index.html`
- Use `page.screenshot()` to capture state
- Use `console.log()` for debugging output
