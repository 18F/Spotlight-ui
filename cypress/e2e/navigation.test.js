/* eslint-plugin-disable jest */
describe('Spotlight', () => {
  it('loads the homepage', () => {
    cy.visit('http://localhost:8000/');
    cy.findByTestId('site-title');
  });

  describe('loads each report from the navigation', () => {
    const reports = [
      { text: 'Design', path: 'design' },
      { text: 'Security', path: 'security' },
      { text: 'Accessibility', path: 'accessibility' },
      { text: 'Performance', path: 'performance' },
      { text: 'Third-Party Links', path: 'critical-components' },
    ];

    reports.map(r => {
      context(r.text, () => {
        it(`loads successfully`, () => {
          cy.visit('http://localhost:8000/');
          cy.get('.usa-menu-btn').click();
          cy.get('.usa-accordion__button.usa-nav__link').click();
          cy.get('.usa-nav__submenu').contains(r.text).click();
          cy.url().should('include', r.path);
        });

        it('does not have an error alert', () => {
          cy.findByTestId('alert-error').should('not.exist');
        });

        it('filters domains based on user input', () => {
          cy.findByTestId('report-table');
          cy.get('input#domain').type('18f.gsa');
          cy.findByTestId('report-table').find('tr').should('have.length', 1);
        });

        it('shows an informative alert when no results are available', () => {
          cy.get('select#agency').select('Broadcasting Board of Governors');
          cy.findByTestId('alert-info');
        });
      });
    });
  });
});
