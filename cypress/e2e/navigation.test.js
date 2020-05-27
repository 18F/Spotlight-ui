/* eslint-plugin-disable jest */
describe('Navigation', () => {
  it('should load the homepage', () => {
    cy.visit('http://localhost:8000/');
    cy.findByTestId('site-title');
  });

  it('should load each report from the navigation', () => {
    const reports = [
      { text: 'Design', path: 'design' },
      { text: 'Security', path: 'security' },
      { text: 'Accessibility', path: 'accessibility' },
      { text: 'Performance', path: 'performance' },
      { text: 'Third-Party Links', path: 'critical-components' },
    ];

    reports.map(r => {
      cy.visit('http://localhost:8000/');
      cy.get('.usa-menu-btn').click();
      cy.get('.usa-accordion__button.usa-nav__link').click();
      cy.get('.usa-nav__submenu').contains(r.text).click();
      cy.url().should('include', r.path);
    });
  });
});
