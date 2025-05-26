describe('Demoblaze E2E Flow: Add Items from All Categories and Purchase', () => {

  // Global exception handler to prevent test from failing on uncaught exceptions
  Cypress.on('uncaught:exception', () => false);

  it('logs in, adds products from all categories, and completes purchase', () => {
    // Visit homepage
    cy.visit('/');

    // Click login
    cy.get('#login2').click();
    cy.wait(500); // Ensure modal opens

    // Enter credentials from Cypress env
    cy.get('#loginusername').type(Cypress.env('uname'));
    cy.get('#loginpassword').type(Cypress.env('pword'));
    cy.get('button').contains('Log in').click();

    // Wait for login to complete
    cy.get('#logout2', { timeout: 10000 }).should('be.visible');

    // === Step 1: Add a phone ===
    cy.contains('Phones').click();
    cy.contains('Samsung galaxy s6').click();
    cy.contains('Add to cart').click();
    cy.on('window:alert', (str) => {
      expect(str).to.include('Product added');
    });
    cy.get('.navbar-brand').click(); // Back to home

    // === Step 2: Add a laptop ===
    cy.contains('Laptops').click();
    cy.contains('Sony vaio i5').click();
    cy.contains('Add to cart').click();
    cy.on('window:alert', (str) => {
      expect(str).to.include('Product added');
    });
    cy.get('.navbar-brand').click(); // Back to home

    // === Step 3: Add a monitor ===
    cy.contains('Monitors').click();
    cy.contains('Apple monitor 24').click();
    cy.contains('Add to cart').click();
    cy.on('window:alert', (str) => {
      expect(str).to.include('Product added');
    });

    // === Step 4: Go to cart ===
    cy.get('#cartur').click();

    // === Step 5: Place order ===
    cy.contains('Place Order').click();

    // === Step 6: Fill purchase form ===
    cy.get('#name').type(Cypress.env('cust_name'));
    cy.get('#country').type(Cypress.env('cust_country'));
    cy.get('#city').type(Cypress.env('cust_city'));
    cy.get('#card').type(Cypress.env('cust_card'));
    cy.get('#month').type(Cypress.env('cust_month'));
    cy.get('#year').type(Cypress.env('cust_year'));

    // === Step 7: Complete purchase ===
    cy.contains('Purchase').click();

    // === Step 8: Verify confirmation ===
    cy.get('.sweet-alert h2').should('contain.text', 'Thank you for your purchase!');
    cy.contains('OK').click();
  });
});