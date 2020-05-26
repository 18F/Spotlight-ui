describe('Navigation', () => {
  it('should load the homepage', () => {
    cy.visit('http://localhost:8000/');
    cy.findByTestId('site-title');
  });
});
