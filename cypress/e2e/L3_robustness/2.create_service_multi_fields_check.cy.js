import pages from '../../pages/index';
import { getMultiFieldsScenarios } from "../../data/serviceL3Data.js";

describe('L3: Multi Fields Interaction Check', () => {
  const serviceCreatePage = pages.get("servicecreate");
  const testData = getMultiFieldsScenarios();

  beforeEach(() => {
    cy.log("L3用例执行前准备");
    serviceCreatePage.visit();
  });

  afterEach(() => {
    cy.log("L3用例执行后清理");
  });

  it('L3: cancel create service', () => {
    serviceCreatePage.cancelForm();
    cy.location("pathname").should('match', /\/services\/?$/);
  })

  testData.forEach((data) => {
    it(`L3: ${data.description}`, () => {
      serviceCreatePage.fillFormSimple(data.payload)
      cy.contains(data.expectedError).should("be.visible");
    });
  });
});


