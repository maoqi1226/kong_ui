import pages from '../../pages/index';
import { faker } from "@faker-js/faker";
import { getSimpleCreateScenarios } from "../../data/serviceCreateDataSimple.js";

describe('L2: Required Fields Check', () => {
  const serviceCreatePage = pages.get("servicecreate");

  beforeEach(() => {
    cy.log("L2用例执行前准备");
    serviceCreatePage.visit()
  });

  afterEach(() => {
    cy.log("L2用例执行后清理");
  });

  it("L2: [Simple Create] Required Fields Check", () => {
    const data = {
      fullUrl: faker.internet.url(),
    };
    serviceCreatePage.switchMode("simple");
    serviceCreatePage.element.serviceCreateSubmitBtn().should("be.disabled");

    serviceCreatePage.element.serviceUrlInput().type(data.fullUrl);
    serviceCreatePage.element
      .serviceCreateSubmitBtn()
      .should("not.be.disabled");
  });

  it("L2: [Manual Create] Required Fields Check", () => {
    const data = {
      protocol: "http",
      host: faker.internet.domainName(),
    };
    serviceCreatePage.switchMode("manual");
    serviceCreatePage.element.serviceCreateSubmitBtn().should("be.disabled");

    serviceCreatePage._fillProtocolFields(data);
    serviceCreatePage.element
      .serviceCreateSubmitBtn()
      .should("not.be.disabled");
  });
});


