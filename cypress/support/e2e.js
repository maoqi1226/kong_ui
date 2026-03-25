require("@cypress/grep")();

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

beforeEach(() => {
  cy.intercept("GET", "https://api.github.com/repos/kong/kong", {
    statusCode: 200,
    body: {},
  }).as("globalMockGithub");
});

afterEach(function () {
  if (this.currentTest.state === "failed") {
    cy.screenshot();
  }
});