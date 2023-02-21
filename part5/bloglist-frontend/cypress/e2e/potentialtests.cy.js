describe('Blog list app', function() {
	it('can visit front page', function() {
		cy.visit('http://localhost:3000')
	})

	it('shows the login form', function() {
		cy.visit('http://localhost:3000')
		cy.contains('login')
	})

	it('does not show the hidden list', function() {
		cy.visit('http://localhost:3000')
		cy.get('.hidden-list').should('not.exist')
	})

	it('shows the login form', function() {
		cy.visit('http://localhost:3000')
		cy.contains('login')
	})
})