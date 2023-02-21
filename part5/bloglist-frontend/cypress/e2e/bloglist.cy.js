describe('Blog list app', function() {
	it('can visit front page', function() {
		cy.visit('http://localhost:3000')
	})
})

describe('Blog list app', function() {
	beforeEach( function() {
		cy.request('POST', '/testing/reset')
		cy.visit('http://localhostL:3000')
	})

	it('shows the login form', function() {
		cy.contains('login')
	})
})