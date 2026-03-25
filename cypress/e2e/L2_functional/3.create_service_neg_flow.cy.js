import pages from '../../pages/index';
import { getSwitchModeCreateScenarios} from "../../data/serviceL2Data.js";

describe('L2: Required Fields Check', () => {
  const serviceCreatePage = pages.get("servicecreate");
  const serviceDetailPage = pages.get("servicedetail");

  beforeEach(() => {
    cy.log("L2用例执行前准备");
    serviceCreatePage.visit();
  });

  afterEach(() => {
    cy.log("L2用例执行后清理");
  });

  it("L2: cancel create service", () => {
    serviceCreatePage.cancelForm();
    cy.location("pathname").should("match", /\/services\/?$/);
  });

  const testData = getSwitchModeCreateScenarios();
  testData.forEach((data) => {
    it(
      `L2: Switch Manual to Simple Create & Submit`, () => {
        serviceCreatePage.fillFormManual(data.manual.payload, false);

        serviceCreatePage.fillFormSimple(data.simple.payload);

        cy.url().should("include", "/default/services/");
        serviceDetailPage.verifyFullUrl(data.simple.payload.fullUrl);
        if (data.simple.payload.advancedFields) {
          serviceDetailPage.verifyAdvanceFields(
            data.simple.payload.advancedFields,
          );
        }
        if (data.simple.payload.generalFields) {
          serviceDetailPage.verifyGeneralFields(
            data.simple.payload.generalFields,
          );
        }
      },
    );
  });
});


