
# Kong Gateway Manager UI Automation
This project implements an automated UI testing framework for the Kong Gateway Manager using Cypress and JavaScript.
The goal of this exercise is not only to automate a specific workflow, but also to demonstrate how a UI automation framework can be designed to be **scalable, maintainable, and reusable** when applied to larger systems.
The test suite validates the workflow of **Creating Services** through the Kong Manager UI.

# Test Strategy
The project follows a **layered testing strategy** to support different testing scopes.
```
L1 – Smoke Tests
L2 – Functional Tests
L3 – Extended / Scenario Tests
```

Execution model:

| Test Layer       | Purpose                              |
| ---------------- | ------------------------------------ |
| **L1 (Smoke)**   | Validate critical functionality      |
| **L1 + L2**      | Functional regression testing        |
| **L1 + L2 + L3** | Extended scenario or deeper coverage |


# Framework Architecture
The framework uses several design patterns commonly applied in automation frameworks.

## Page Object Model
UI interactions are encapsulated using the **Page Object Model (POM)**.
```
cypress/pages
```
Example page objects:

```
ServiceListPage
ServiceCreatePage
ServiceDetailPage
```
Benefits:
* separates test logic from UI selectors
* improves readability
* reduces maintenance cost when UI changes

## Page Factory
Page instances are managed through a centralized factory:

```
pages.get("servicecreate")
```
Benefits:
* Centralized instantiation: reduces duplicated imports across test files.
* Test isolation: returns fresh instances to prevent state leakage between tests.
* Easier maintenance: simplifies updates if a page's constructor changes.

## Test Data Strategy
Dynamic test data is generated using **faker** to avoid collisions between test runs.
This ensures:
* tests remain independent
* repeated executions do not conflict with previous runs
* potential support for parallel execution

# Project Structure
```
kong-ui-automation/
│
├── cypress/                     # Main Cypress directory
│   │
│   ├── e2e/                     # Test cases
│   │   ├── L1_smoke/
│   │   ├── L2_functional/
│   │   └── L3_extended/
│   ├── pages/                   # Page Object Model
│   ├── support/                 # Global hooks (grep, mocks, events)
│   └── data/                    # Dynamic data generation
│
├── scripts/                     # Utility scripts (environment setup / teardown)
├── results/                     # Test artifacts
│   ├── screenshots/
│   ├── videos/
│   ├── reports/
│   └── html-report/
│
├── cypress.config.js            # Cypress configuration
├── package.json                 # npm scripts (execution entry points)
└── .env                         # Environment variables (KONG_URL, etc.)
```

# Environment Setup
Start Kong using the provided Docker configuration.
```bash
npm run env:up
```
After startup, verify Kong Manager is accessible: <http://localhost:8002>

# Teardown
Stop the Docker environment after testing:
```bash
npm run env:down
```

# Install Dependencies
```bash
npm install
```

# Running Tests
The project provides simple commands to run test suites in different mode.

### Run Full Test Suite in Headless Mode
```bash
npm run test:all
```

### Run Full Test Suite in headed Mode
```bash
npm run test:ui
```

### Run Full Test Suite in Headless Mode and Generate Report
```bash
npm run test:report
```

### For CI/CD Pipeline: Set up environment, run full test suite in headless mode and generate report
```bash
npm run env:test:report
```

# Trade-offs
Due to time constraints, the implementation focuses on:

* demonstrating **framework architecture**
* covering **representative test workflows**

Rather than implementing all test scenarios.
However, the framework structure allows new tests to be added easily without changing existing test logic.

# Possible Future Improvements
Potential future enhancements include:
* additional negative test cases
* parallel test execution
* execution of different test scopes




