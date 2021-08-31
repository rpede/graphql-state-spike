describe('Navigation Menu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Clicking on "Posts"', () => {
    it('should navigate to /posts', () => {
      cy.get('a[mat-list-item]:contains("Posts")').click();
      cy.location('pathname').should('equal', '/posts');
    });
  });

  describe('Clicking on "My Profile"', () => {
    it('should navigate to /my-profile', () => {
      cy.get('a[mat-list-item]:contains("My Profile")').click();
      cy.location('pathname').should('equal', '/my-profile');
    });
  });
});
