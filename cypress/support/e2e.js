import "cypress-mochawesome-reporter/register";
import "./commands";

require("@cypress/grep")();
require("cypress-terminal-report/src/installLogsCollector")();

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("cross origin script")) {
    return false;
  }
  return true;
});


// before(() => {
// });

//
// after(function () {
//
// });

// beforeEach(() => {
//
// });

// afterEach(() => {
//
// })