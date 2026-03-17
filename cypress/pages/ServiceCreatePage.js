import BasePage from "./BasePage";

class ServiceCreatePage extends BasePage {
  get element() {
    return {
      fullUrlRadio: () => cy.get('[data-testid="gateway-service-url-radio"]'),
      protocolRadio: () =>
        cy.get('[data-testid="gateway-service-protocol-radio"]'),
      // 1. Full url flow
      serviceUrlInput: () =>
        cy.get('[data-testid="gateway-service-url-input"]'),

      viewAdvancedFieldsTrigger: () =>
        cy.get(
          '[data-testid="collapse-trigger-label"]:contains("View advanced fields")',
        ),
      retriesInput: () =>
        cy.get('[data-testid="gateway-service-retries-input"]'),
      connTimeoutInput: () =>
        cy.get('[data-testid="gateway-service-connTimeout-input"]'),
      writeTimeoutInput: () =>
        cy.get('[data-testid="gateway-service-writeTimeout-input"]'),
      readTimeoutInput: () =>
        cy.get('[data-testid="gateway-service-readTimeout-input"]'),
      clientCertInput: () =>
        cy.get('[data-testid="gateway-service-clientCert-input"]'),
      caCertsInput: () =>
        cy.get('[data-testid="gateway-service-ca-certs-input"]'),
      // TSL verify
      tlsVerifyCheckbox: () =>
        cy.get('[data-testid="gateway-service-tls-verify-checkbox"]'),
      tlsVerifyTrueOption: () =>
        cy.get('[data-testid="gateway-service-tls-verify-true-option"]'),
      tlsVerifyFalseOption: () =>
        cy.get('[data-testid="gateway-service-tls-verify-false-option"]'),
      // General information
      serviceNameInput: () =>
        cy.get('[data-testid="gateway-service-name-input"]'),
      addTagsTrigger: () =>
        cy.get('[data-testid="collapse-trigger-label"]:contains("Add tags")'),
      tagsInput: () => cy.get('[data-testid="gateway-service-tags-input"]'),
      serviceCreateSubmitBtn: () =>
        cy.get('[data-testid="service-create-form-submit"]'),
      serviceCreateCancelBtn: () =>
        cy.get('[data-testid="service-create-form-cancel"]'),

      // 2. Protocol flow
      protocolSelect: () =>
        cy.get('[data-testid="gateway-service-protocol-select"]'),
      protocolOptionTemplate: () => '[data-testid="select-item-{Protocol}"]',
      hostInput: () => cy.get('[data-testid="gateway-service-host-input"]'),
      pathInput: () => cy.get('[data-testid="gateway-service-path-input"]'),
      portInput: () => cy.get('[data-testid="gateway-service-port-input"]'),
    };
  }

  visit() {
    cy.visit("/services/create");
    this.element.serviceCreateSubmitBtn().should("be.visible");
    return this;
  }

  switchMode(mode) {
    if (mode === "manual") {
      this.element.protocolRadio().click();
    } else if (mode === "simple") {
      this.element.fullUrlRadio().click();
    }
    return this;
  }

  _fillAdvancedFields(advancedFields) {
    const DATA_ELEMENT_MAPPING = {
      retries: this.element.retriesInput,
      connTimeout: this.element.connTimeoutInput,
      writeTimeout: this.element.writeTimeoutInput,
      readTimeout: this.element.readTimeoutInput,
      clientCert: this.element.clientCertInput,
      caCert: this.element.caCertsInput,
    };
    for (const [key, value] of Object.entries(advancedFields)) {
      if (key === "tlsVerify") {
        this.element.tlsVerifyCheckbox().click();
        value
          ? this.element.tlsVerifyTrueOption().click()
          : this.element.tlsVerifyFalseOption().click();
      } else if (DATA_ELEMENT_MAPPING[key]) {
        this.typeNum(DATA_ELEMENT_MAPPING[key](), value);
      } else {
        cy.log(`Warning: Unrecognized advanced field key: ${key}`);
      }
    }
  }

  _fillgeneralFieldsFields(generalFields) {
    if (generalFields.name) {
      this.typeText(this.element.serviceNameInput(), generalFields.name);
    }
    if (generalFields.tags) {
      this.element.addTagsTrigger().click();
      this.typeText(this.element.tagsInput(), generalFields.tags);
    }
  }

  _fillFullUrl(text){
    this.typeText(this.element.serviceUrlInput(), text);
  }

  fillFormSimple(data) {
    this.switchMode("simple");
    this._fillFullUrl(data.fullUrl)
    // this.typeText(this.element.serviceUrlInput(), data.fullUrl);
    if (data.advancedFields) {
      this.element.viewAdvancedFieldsTrigger().click();
      this._fillAdvancedFields(data.advancedFields);
    }
    if (data.generalFields) {
      this._fillgeneralFieldsFields(data.generalFields);
    }
    this.element.serviceCreateSubmitBtn().click();
  }

  _fillProtocolFields(protocolFields) {
    // select protocol
    if (protocolFields.protocol && protocolFields.protocol !== "http") {
      this.element.protocolSelect().click();
      cy.get(
        this.element
          .protocolOptionTemplate()
          .replace("\{Protocol\}", protocolFields.protocol),
      ).click();
    }
    // fill host, path, port
    this.typeText(this.element.hostInput(), protocolFields.host);

    if (protocolFields.path) {
      this.typeText(this.element.pathInput(), protocolFields.path);
    }
    if (protocolFields.port) {
      this.typeNum(this.element.portInput(), protocolFields.port);
    }
  }
  _expendAdvancedFields() {
    this.element.viewAdvancedFieldsTrigger().click();
  }
  _expandTagFields() {
    this.element.addTagsTrigger().click();
  }
  switchProtocol(protocol) {
    this.element.protocolSelect().click();
    cy.get(
      this.element
        .protocolOptionTemplate()
        .replace("\{Protocol\}", protocol),
    ).click();
    return this;
  }

  submitForm() {
    this.element.serviceCreateSubmitBtn().scrollIntoView().not("disabled").click();
  }
  cancelForm() {
    this.element.serviceCreateCancelBtn().not("disabled").click();
  }

  fillFormManual(data, save = true) {
    this.switchMode("manual");
    if (data.protocolFields) {
      this._fillProtocolFields(data.protocolFields);
    }
    if (data.advancedFields) {
      this.element.viewAdvancedFieldsTrigger().click();
      this._fillAdvancedFields(data.advancedFields);
    }
    if (data.generalFields) {
      this.element.addTagsTrigger().click();
      this._fillgeneralFieldsFields(data.generalFields);
    }
    save ? this.submitForm() : null;
  }

  verifyDynamicFields(data) {
    data.path
      ? this.element.pathInput().should("be.visible")
      : this.element.pathInput().should("not.exist");
    data.clientCert
      ? this.element.clientCertInput().should("be.visible")
      : this.element.clientCertInput().should("not.exist");
    data.caCert
      ? this.element.caCertsInput().should("be.visible")
      : this.element.caCertsInput().should("not.exist");
    data.tlsVerify
      ? this.element.tlsVerifyCheckbox().should("be.visible")
      : this.element.tlsVerifyCheckbox().should("not.exist");
  }
}



export default ServiceCreatePage;