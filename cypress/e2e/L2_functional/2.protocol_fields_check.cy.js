import pages from '../../pages/index';
import { faker } from "@faker-js/faker";
import { getManualFieldsScenarios } from "../../data/serviceL2Data.js";


describe('L2: Required Fields Check', () => {
  const serviceCreatePage = pages.get("servicecreate");

  beforeEach(() => {
    cy.log("L2用例执行前准备");
    serviceCreatePage.visit().switchMode("manual");
    serviceCreatePage._expendAdvancedFields();
  });

  afterEach(() => {
    cy.log("L2用例执行后清理");
  });

  const testScenarios = getManualFieldsScenarios();
  testScenarios.forEach((scenario) => {
    it(`L2: ${scenario.description}`, () => {
      serviceCreatePage.switchProtocol(scenario.payload.protocol);
      serviceCreatePage.verifyDynamicFields(scenario.payload.expect);
    });
  });
});


