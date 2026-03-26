import { assertElementTextEquals } from "../support/helper.js";

class ServiceDetailPage {
  get element() {
    return {
      title: () => cy.get(".title"),
      endpoint: () => cy.get(".endpoint"),
      serviceName: () => cy.get("[data-testid='name-plain-text']"),
      hostText: () => cy.get("[data-testid='host-plain-text']"),
      portText: () => cy.get("[data-testid='port-plain-text']"),
      protocolText: () => cy.get("[data-testid='protocol-plain-text']"),
      pathText: () => cy.get("[data-testid='path-property-value']"),
      // tags: () => cy.get("[data-testid='path-plain-text']"),
      retriesText: () => cy.get("[data-testid='retries-plain-text']"),
      // 补充缺失的 connTimeout 元素 (请根据实际页面的 data-testid 调整)
      connTimeoutText: () =>
        cy.get("[data-testid='connect_timeout-plain-text']"),
      writeTimeoutText: () =>
        cy.get("[data-testid='write_timeout-plain-text']"),
      readTimeoutText: () => cy.get("[data-testid='read_timeout-plain-text']"),
      clientCertText: () =>
        cy.get("[data-testid='client_certificate-property-value']"),
      caCertText: () => cy.get("[data-testid='ca_certificates-badge-tag-0']"), // todo
      tlsVerifyText: () => cy.get("[data-testid='tls_verify-property-value']"),
      tagsText: () => cy.get("[data-testid='tags-badge-tags']"),
      headerActions: () => cy.get("[data-testid='header-actions']"),
    };
  }
  
  // _haveText(ele, text) {
  //   if (text !== undefined && text !== null) {
  //     ele().should("have.text", String(text));
  //   }
  // }

  // _containsText(ele, text, top_n=5) {
  //   if (text !== undefined && text !== null) {
  //     ele().contains(String(text).slice(0, top_n));
  //   }
  // }

  verifyProtocolFields(data) {
    assertElementTextEquals(this.element.protocolText, data.protocol);
    assertElementTextEquals(this.element.hostText, data.host);
    assertElementTextEquals(this.element.pathText, data.path);
    assertElementTextEquals(this.element.portText, data.port);
  }

  verifyAdvanceFields(data) {
    assertElementTextEquals(this.element.retriesText, data.retries);
    assertElementTextEquals(this.element.connTimeoutText, data.connTimeout);
    assertElementTextEquals(this.element.writeTimeoutText, data.writeTimeout);
    assertElementTextEquals(this.element.readTimeoutText, data.readTimeout);
    assertElementTextEquals(this.element.clientCertText, data.clientCert);
    // this._containsText(this.element.caCertText, data.caCert, 6);
    if (data.caCert){
      const caCertList = data.caCert.split(',').map((item) => item.trim());
      cy.wrap(caCertList).each((item) => {
        cy.contains(item.slice(0, 6)).scrollIntoView().should("be.visible");
      })
    }
    if (data.tlsVerify) {
      const expect_value = data.tlsVerify ? "On" : "Off";
      this.element.tlsVerifyText().should("have.text", expect_value);
    }
  }

  verifyGeneralFields(data) {
    assertElementTextEquals(this.element.serviceName, data.name);
    if (data.tags) {
      const tagList = data.tags.split(",").map((tag) => tag.trim());
      cy.wrap(tagList).each((tag) => {
        this.element.tagsText().contains(tag).should("be.visible");
        // cy.contains(tag).scrollIntoView().should("be.visible");
      });
    }
  }

  verifyFullUrl(fullUrl) {
    this.element.headerActions().should("be.visible");
    if (fullUrl) {
      const clearfullUrl = fullUrl.replace(/\/$/, ""); // 随机生成的url末尾偶尔有/
      const urlRegex = new RegExp(`^${clearfullUrl}:\\d+/?`);
      this.element.endpoint().invoke("text").should("match", urlRegex);
    }
  }
}

export default ServiceDetailPage;
