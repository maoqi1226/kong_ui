class OverallPage{
  get element(){
    return {
      title: () => cy.get(".title"),
      overviewCard: () => cy.get("[data-testid='overview-card']"),
      createServiceBtn: () => cy.contains("button", "Add a Gateway Service"),
    };
  }
  visit() {
    cy.visit('/default/overview');
    this.element.title().should('be.visible');
    this.element.overviewCard().should("be.visible");
    return this;
  }
  clickCreateServiceBtn() {
    this.element.createServiceBtn().click();
  }
}

export default OverallPage;