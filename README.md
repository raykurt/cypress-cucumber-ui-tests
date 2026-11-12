# Cypress + Cucumber UI Test Automation

![UI Tests](https://github.com/raykurt/cypress-cucumber-ui-tests/actions/workflows/ui-tests.yml/badge.svg)

End-to-end UI tests for the public [Sauce Demo](https://www.saucedemo.com) shop, written with **Cypress, Cucumber (Gherkin) and TypeScript**.
The project shows how I structure UI automation: business-readable feature files, thin step definitions,
page objects built from reusable components, environment-specific configuration and CI with GitHub Actions.

## Tech stack

| Area | Tools |
|---|---|
| UI testing | Cypress 15 |
| BDD | Cucumber / Gherkin via `@badeball/cypress-cucumber-preprocessor` |
| Bundling | esbuild (`@bahmutov/cypress-esbuild-preprocessor`) |
| Language | TypeScript (type-checked in CI) |
| Design | Page objects + component objects, one element map per page |
| Selectors | `data-test` attributes only |
| CI | GitHub Actions (push, pull request, nightly smoke run, manual run with tags) |

## Project structure

```
src/
├── e2e/
│   ├── automatedFeatures/   → automated scenarios (@run), the only folder Cypress runs
│   ├── features/            → manual scenarios (@manual), kept next to the automated ones for traceability
│   ├── stepDefinitions/     → thin TypeScript steps that call page objects
│   └── pageObjects/
│       ├── BasePage.ts      → abstract base: open, URL checks
│       ├── components/      → reusable parts: header, error message
│       └── pages/           → login, inventory, cart, checkout
├── fixtures/                → test data (users, customer)
├── plugins/                 → Cypress ↔ Cucumber wiring (setupNodeEvents)
└── support/                 → custom commands (cy.login with cy.session), selector helpers
cypress.config.ts            → shared configuration
cypress.ci.config.ts         → CI configuration (retries, memory), extends the shared one
```

## Design decisions

- **Feature → step → page object → Cypress.** Steps stay thin; all element access and actions live in page objects.
- **Component objects.** Repeated UI parts (header, error box) are separate classes. Each exposes its elements in an `e` map, and a page merges them into one map with the spread operator, so steps use `page.e.cartBadge()` without caring which component it belongs to.
- **Stable selectors.** Elements are found only through `data-test` attributes (`byTest()` helper), never by CSS classes or text that change with the design.
- **No fixed waits.** Cypress retries queries and assertions automatically; there is no `cy.wait(<ms>)` in the suite.
- **Fast login.** `cy.login()` uses `cy.session` to log in once per user and restore the session in later scenarios.
- **Manual vs automated.** Manual scenarios are tagged `@manual` and stored in `features/`; automated ones are tagged `@run` and stored in `automatedFeatures/`, which is the only folder in `specPattern`.
- **One config per environment.** `cypress.ci.config.ts` extends the shared config and changes only what differs; a new environment is one new file.

## Running the tests

Requirements: Node.js 20+.

```bash
npm install

# Interactive runner
npm run cy:open

# All automated tests (headless)
npm test

# With the CI configuration (1 retry, memory settings)
npm run test:ci

# By tag
npm run test:smoke
npx cypress run --env tags="@regression and not @negative"
npx cypress run --env tags="@TC-3201"
```

Reports: `reports/cucumber-report.html`; screenshots of failed steps in `reports/screenshots/`.

## Test coverage

| ID | Scenario | Tags |
|---|---|---|
| TC-3001 | Standard user logs in successfully | smoke, regression |
| TC-3002 | Login fails with invalid data (Scenario Outline: locked user, wrong password, empty username) | negative, regression |
| TC-3101 | Products are listed after login | smoke, regression |
| TC-3102 | Sort the product list (Scenario Outline: name and price) | regression |
| TC-3103 | Adding a product updates the cart badge | regression |
| TC-3201 | Complete an order | smoke, regression |
| TC-3202 | Checkout requires a first name | negative, regression |
| TC-3203 | Remove a product from the cart | regression |
| TC-3901–3902 | Manual checks (mobile layout, slow connection) | manual |

> Sauce Demo is a public practice site; the credentials in `src/fixtures/users.json` are the ones it publishes for testing.
