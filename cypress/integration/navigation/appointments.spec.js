// booking
// Visits the root of our web server
// Clicks on the "Add" button in the second appointment
// Enters their name
// Chooses an interviewer
// Clicks the save button
// Sees the booked appointment

const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

// Editing
// Visits the root of our web server
// Clicks the edit button for the existing appointment
// Changes the name and interviewer
// Clicks the save button
// Sees the edit to the appointment

//Canceling
// Visits the root of our web server
// Clicks the delete button for the existing appointment
// Clicks the confirm button
// Sees that the appointment slot is empty

    beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
    });

describe("Appointments", () => {

  it("should book an interview", () => {
  cy.get("[alt=Add]")
   .first()
   .click();

  cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
  cy.get('[alt="Sylvia Palmer"]').click();

  cy.contains("Save").click();

  cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("Should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

  cy.get("[data-testid=student-name-input]").clear().type("Jacob FitzGerald");
  cy.get("[alt='Tori Malcolm']").click();

  cy.contains("Save").click();

  cy.contains(".appointment__card--show", "Jacob FitzGerald");
  cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("Should cancel and appointment", () => {
    cy.get("[alt=Delete]")
    .first()
    .click({ force: true });

    cy.contains("Confirm").click()

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })
});
