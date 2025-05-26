const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    supportFile: 'cypress/support/e2e.js'
  },
  env: {
    uname: 'testautomation@robot-mail.com',
    pword: 'TestAutomation',

    // Customer details for purchase
    cust_name: 'Test User',
    cust_country: 'Testland',
    cust_city: 'Test City',
    cust_card: '1234567812345678',
    cust_month: '12',
    cust_year: '2025',
  }
})