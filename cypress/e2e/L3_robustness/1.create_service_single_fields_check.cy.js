import pages from '../../pages/index';
import { getSingleFieldsScenarios } from "../../data/serviceL3Data.js";
import { faker } from "@faker-js/faker";

describe('L3: Single Fields Check', () => {
  const serviceCreatePage = pages.get("servicecreate");
  const testData = getSingleFieldsScenarios();

  beforeEach(() => {
    cy.log("L3 preparing");
    serviceCreatePage.visit();
  });

  afterEach(() => {
    cy.log("L3 cleaning up");
  });

  testData.fullUrl.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Full URL: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.fullUrl.mode);
      cy.typeText(serviceCreatePage.element.serviceUrlInput, data.input);
      cy.contains(testData.fullUrl.expectedError).should("be.visible");
    });
  });

  testData.retries.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Retries: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.retries.mode)._expendAdvancedFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      cy.typeNum(
        serviceCreatePage.element.retriesInput,
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
      cy.typeNum(
        serviceCreatePage.element.connTimeoutInput,
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
      cy.typeNum(
        serviceCreatePage.element.writeTimeoutInput,
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
      cy.typeNum(
        serviceCreatePage.element.readTimeoutInput,
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
      cy.typeText(serviceCreatePage.element.clientCertInput, data.input);
      serviceCreatePage.submitForm();
      cy.contains(testData.clientCert.expectedError).should("be.visible");
    });
  });

  testData.caCert.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Client certificate: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.caCert.mode)._expendAdvancedFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      cy.typeText(
        serviceCreatePage.element.caCertsInput,
        data.input,
      );
      serviceCreatePage.submitForm()
      cy.contains(testData.caCert.expectedError).should("be.visible");
    });
  });

  testData.name.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Name: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.name.mode);
      cy.typeText(
        serviceCreatePage.element.serviceNameInput,
        data.input,
      );
      cy.contains(testData.name.expectedError).should("be.visible");
    });
  });

  testData.tags.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Tags: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.tags.mode)._expandTagFields();
      serviceCreatePage._fillFullUrl(faker.internet.url());
      cy.typeText(
        serviceCreatePage.element.tagsInput,
        data.input,
      );
      serviceCreatePage.submitForm();
      cy.contains(data.expectedError).should("be.visible");
    });
  });

  testData.host.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Host: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.host.mode);
      cy.typeSpecialText(
        serviceCreatePage.element.hostInput,
        data.input,
      );
      cy.contains(data.expectedError).should("be.visible");
    });
  });

  testData.path.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Path: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.path.mode);
      cy.typeText(
        serviceCreatePage.element.hostInput,
        faker.internet.domainName(),
      );
      cy.typeSpecialText(
        serviceCreatePage.element.pathInput,
        data.input,
      );
      cy.contains(data.expectedError).should("be.visible");
    });
  });

  testData.port.scenarios.forEach((data) => {
    it(`L3: Check Wrong Input for Port: ${data.input}`, () => {
      serviceCreatePage.switchMode(testData.port.mode);
      cy.typeText(
        serviceCreatePage.element.portInput,
        data.input,
      );
      cy.contains(testData.port.expectedError).should("be.visible");
    });
  });
});


