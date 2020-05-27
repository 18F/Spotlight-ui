import './commands';
import '@testing-library/cypress/add-commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // FIXME: There's an uncaught exception from USWDS when the mobile nav is opened. That's not a cypress problem, but this is here because of that since it makes the test fail
  return false;
});
