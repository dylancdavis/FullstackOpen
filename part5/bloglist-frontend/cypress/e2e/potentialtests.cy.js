describe('Blog list app', function() {
	beforeEach( function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, { name: 'John Smith', username : 'johnsmith', password: 'hunter2' })
		cy.visit('http://localhost:3000')
		cy.request('POST', `${Cypress.env('BACKEND')}/login`,
			{ name: 'John Smith', username : 'johnsmith', password: 'hunter2' })
			.then(r => {
				localStorage.setItem('loggedInUser', JSON.stringify(r.body))
			})
		cy.reload()
		cy.get('.show-button').click()
		cy.get('.title-input').type('My Blog Title')
		cy.get('.author-input').type('Author Name')
		cy.get('.url-input').type('www.url.com')
		cy.get('.submit-button').click()
	})

	it('shows user name', function() {
		cy.visit('http://localhost:3000')
		cy.contains('John Smith')
	})

	it('does not show the hidden list', function() {
		cy.visit('http://localhost:3000')
		cy.get('.hidden-list').should('not.exist')
	})

	// it('shows user name', function() {
	// 	cy.visit('http://localhost:3000')
	// 	cy.contains('John Smith')
	// })
})