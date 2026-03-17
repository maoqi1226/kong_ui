import pages from '../../pages/index';
import { getSingleFieldsScenarios } from "../../data/serviceL3Data.js";
import { faker } from "@faker-js/faker";

describe('L3: Single Fields Check', () => {
  const serviceCreatePage = pages.get("servicecreate");
  const serviceDetailPage = pages.get("servicedetail");
  const testData = getSingleFieldsScenarios();

  beforeEach(() => {
    cy.log("L3用例执行前准备");
    serviceCreatePage.visit();
  });

  afterEach(() => {
    cy.log("L3用例执行后清理");
  });

  it('cancel create service', () => {
    serviceCreatePage.cancelForm();
    cy.location("pathname").should('match', /\/services\/?$/);
  })

  testData.fullUrl.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Full URL: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.fullUrl.mode);
      serviceCreatePage.typeText(
        serviceCreatePage.element.serviceUrlInput(),
        data.input,
      );
      cy.contains(testData.fullUrl.expectedError).should("be.visible");
    });
  });

  testData.retries.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Retries: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.retries.mode)._expendAdvancedFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      serviceCreatePage.typeNum(
        serviceCreatePage.element.retriesInput(),
        data.input,
      );
      serviceCreatePage.submitForm();
      cy.contains(testData.retries.expectedError).should("be.visible");
    });
  });

  testData.connTimeout.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Connection timeout: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.connTimeout.mode)._expendAdvancedFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      serviceCreatePage.typeNum(
        serviceCreatePage.element.connTimeoutInput(),
        data.input,
      );
      serviceCreatePage.submitForm();
      cy.contains(testData.connTimeout.expectedError).should("be.visible");
    });
  });

  testData.writeTimeout.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Write timeout: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.writeTimeout.mode)._expendAdvancedFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      serviceCreatePage.typeNum(
        serviceCreatePage.element.writeTimeoutInput(),
        data.input,
      );
      serviceCreatePage.submitForm();
      cy.contains(testData.writeTimeout.expectedError).should("be.visible");
    });
  });

  testData.readTimeout.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Read timeout: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.readTimeout.mode)._expendAdvancedFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      serviceCreatePage.typeNum(
        serviceCreatePage.element.readTimeoutInput(),
        data.input,
      );
      serviceCreatePage.submitForm();
      cy.contains(testData.readTimeout.expectedError).should("be.visible");
    });
  });

  testData.clientCert.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Client certificate: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.clientCert.mode)._expendAdvancedFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      serviceCreatePage.typeText(
        serviceCreatePage.element.clientCertInput(),
        data.input,
      );
      serviceCreatePage.submitForm();
      cy.contains(testData.clientCert.expectedError).should("be.visible");
    });
  });

  testData.caCert.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Client certificate: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.caCert.mode)._expendAdvancedFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      serviceCreatePage.typeText(
        serviceCreatePage.element.caCertsInput(),
        data.input,
      );
      serviceCreatePage.submitForm()
      cy.contains(testData.caCert.expectedError).should("be.visible");
    });
  });

  testData.name.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Name: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.name.mode);
      serviceCreatePage.typeText(
        serviceCreatePage.element.serviceNameInput(),
        data.input,
      );
      cy.contains(testData.name.expectedError).should("be.visible");
    });
  });

  testData.tags.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Tags: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.tags.mode)._expandTagFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      serviceCreatePage.typeText(
        serviceCreatePage.element.tagsInput(),
        data.input,
      );
      serviceCreatePage.submitForm();
      cy.contains(data.expectedError).should("be.visible");
    });
  });

  testData.host.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Host: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.host.mode);
      serviceCreatePage.typeSpecialText(
        serviceCreatePage.element.hostInput(),
        data.input,
      );
      cy.contains(data.expectedError).should("be.visible");
    });
  });

  testData.path.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Path: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.path.mode);
      serviceCreatePage.typeText(
        serviceCreatePage.element.hostInput(),
        faker.internet.domainName(),
      );
      serviceCreatePage.typeSpecialText(
        serviceCreatePage.element.pathInput(),
        data.input,
      );
      cy.contains(data.expectedError).should("be.visible");
    });
  });

  testData.port.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Port: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.port.mode);
      serviceCreatePage.typeText(
        serviceCreatePage.element.portInput(),
        data.input,
      );
      cy.contains(testData.port.expectedError).should("be.visible");
    });
  });
});


