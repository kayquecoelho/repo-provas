/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("SignUp test", () => {

  it("should create an account successfully", () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    cy.visit("http://localhost:3000/auth/sign-up");

    cy.get("#email").type(user.email);
    cy.get("#password").type(user.password);
    cy.get("#confirm-password").type(user.password);

    cy.intercept("POST", "http://localhost:4000/auth/sign-up").as("signUp");

    cy.contains("Sign Up").click();

    cy.wait("@signUp")

    cy.url().should("equal", "http://localhost:3000/");
  });
})