
class ServiceListPage {
  get element() {
    return {
      title: () => cy.get(".title"),
      emptyState: () => cy.get("[data-testid='table-empty-state']"),
      newServiceEmptyBtn: () => "[data-testid='empty-state-action']",
      newServiceBtn: () => "[data-testid='toolbar-add-gateway-service']",
      serviceList: () => cy.get(".kong-ui-entities-gateway-services-list"),
    };
  }

  visit() {
    cy.intercept("GET", "**/default/services*").as("serviceListPage");
    cy.visit("/services");
    this.element.title().should("be.visible");
    cy.wait("@serviceListPage").its("response.statusCode").should("eq", 200);
    // this.element.serviceList().should("be.visible");
    return this;
  }

  clickCreateServiceBtn() {
    cy.intercept({ method: "GET", url: "**/default/services?*" }).as("getServices");
    cy.reload();
    cy.wait('@getServices').then((interception) => {
      const dataLength = interception.response.body.data.length;
      if (dataLength > 0) {
        cy.get(this.element.newServiceBtn()).click();
      } else {
        cy.get(this.element.newServiceEmptyBtn()).click(); // 无service时点击创建
      }
    });
    return this;
  }
}
export default ServiceListPage;