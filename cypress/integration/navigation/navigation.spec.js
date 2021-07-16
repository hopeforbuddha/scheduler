describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("Should have Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");  })
});