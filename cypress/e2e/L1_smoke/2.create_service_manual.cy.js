import pages from '../../pages/index';
import { getManualCreateScenarios } from "../../data/serviceCreateDataManual.js";

describe('L1: Manual Create Service', () => {
  const serviceListPage = pages.get("servicelist");
  const serviceCreatePage = pages.get("servicecreate");
  const serviceDetailPage = pages.get("servicedetail");

  const testScenarios = getManualCreateScenarios();
  testScenarios.forEach((scenario) => {
    it(`${scenario.description}`, () => {
      console.log(`${scenario.payload}`);
      serviceListPage.visit().clickCreateServiceBtn();
      serviceCreatePage.fillFormManual(scenario.payload);

      cy.url().should("not.include", "create");
      if (scenario.payload.protocolFields) {
        serviceDetailPage.verifyProtocolFields(scenario.payload.protocolFields);
      }
      if (scenario.payload.advancedFields) {
        serviceDetailPage.verifyAdvanceFields(scenario.payload.advancedFields);
      }
      if (scenario.payload.generalFields) {
        serviceDetailPage.verifyAdvanceFields(scenario.payload.generalFields);
      }
    });
  });

});


