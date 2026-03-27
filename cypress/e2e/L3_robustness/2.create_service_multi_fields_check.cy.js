import pages from '../../pages/index';
import { getMultiFieldsScenarios } from "../../data/serviceL3Data.js";

describe('L3: Multi Fields Interaction Check', () => {
  const serviceCreatePage = pages.get("servicecreate");
  const testData = getMultiFieldsScenarios();

  beforeEach(() => {
    cy.log("L3 preparing");
    serviceCreatePage.visit();
  });

  afterEach(() => {
    cy.log("L3 cleaning up");
  });

  testData.forEach((data) => {
    it(`L3: ${data.description}`, () => {
      serviceCreatePage.fillFormSimple(data.payload)
      cy.contains(data.expectedError).should("be.visible");
    });
  });
});


