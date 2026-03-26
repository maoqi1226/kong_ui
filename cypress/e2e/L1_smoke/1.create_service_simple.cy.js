import pages from '../../pages/index';
import { getSimpleCreateScenarios } from "../../data/serviceCreateDataSimple.js";

describe("L1: Simple Create Service", () => {
  const serviceListPage = pages.get("servicelist");
  const serviceCreatePage = pages.get("servicecreate");
  const serviceDetailPage = pages.get("servicedetail");

  const testScenarios = getSimpleCreateScenarios();
  testScenarios.forEach((scenario) => {
    it(`${scenario.description}`, {tags: ["@smoke"]}, () => {
      serviceListPage.visit().clickCreateServiceBtn();
      serviceCreatePage.fillFormSimple(scenario.payload);

      cy.url().should("include", "/default/services/");
      serviceDetailPage.verifyFullUrl(scenario.payload.fullUrl);
      if (scenario.payload.advancedFields) {
        serviceDetailPage.verifyAdvanceFields(scenario.payload.advancedFields);
      }
      if (scenario.payload.generalFields) {
        serviceDetailPage.verifyGeneralFields(scenario.payload.generalFields);
      }
    });
  });
});


