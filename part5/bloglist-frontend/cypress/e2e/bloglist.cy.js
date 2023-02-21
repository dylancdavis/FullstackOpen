describe('Blog list app', function() {
	it('can visit front page', function() {
		cy.visit('http://localhost:3000')
	})
})

describe('Blog list app', function() {
	beforeEach( function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, { name: 'John Smith', username : 'johnsmith', password: 'hunter2' })
		cy.visit('http://localhost:3000')
	})

	it('shows the login form', function() {
		cy.contains('login')
	})

	it('allows logging in with correct credentials', function() {

		cy.get('.input-username').type('johnsmith')
		cy.get('.input-password').type('hunter2')
		cy.get('.submit-button').click()
		cy.contains('BLOGS')
	})

	it('fails login with incorrect credentials', function() {
		cy.get('.input-username').type('johnsmith')
		cy.get('.input-password').type('wrongpassword')
		cy.get('.submit-button').click()
		cy.contains('Incorrect username or password')
	})

	describe('when logged in', function() {
		beforeEach( function() {
			cy.request('POST', `${Cypress.env('BACKEND')}/login`,
				{ name: 'John Smith', username : 'johnsmith', password: 'hunter2' })
				.then(r => {
					localStorage.setItem('loggedInUser', JSON.stringify(r.body))
				})
			cy.reload()
		})

		it('BLOGS header is visible', function() {
			cy.contains('BLOGS')
		})

		it ('correct name for user is displayed', function() {
			cy.contains('John Smith')
		})

		it ('user can logout', function () {
			cy.get('.logout-button').click()
			cy.contains('login')
		})

		it('user can create new blogs', function() {
			cy.get('.show-button').click()
			cy.get('.title-input').type('My Blog Title')
			cy.get('.author-input').type('Author Name')
			cy.get('.url-input').type('www.url.com')
			cy.get('.submit-button').click()
			cy.contains('My Blog Title')
			cy.contains('Author Name')
		})

		describe('and user creates blog', function () {
			beforeEach( function() {
				cy.get('.show-button').click()
				cy.get('.title-input').type('My Blog Title')
				cy.get('.author-input').type('Author Name')
				cy.get('.url-input').type('www.url.com')
				cy.get('.submit-button').click()
			})

			it('show button exists', function () {
				cy.contains('show')
			})

			it('extra information is initially hidden', function () {
				cy.get('.hidden-list').should('not.exist')
				cy.wait(1000)
			})

			it('extra information is shown after click', function () {
				cy.get('.blog > .show-button').click()
				cy.get('.hidden-list')
			})

			describe('and that blog has details shown', function () {
				beforeEach( function () {
					cy.get('.blog > .show-button').click()
				})

				it('shows the hidden list', function () {
					cy.get('.hidden-list')
				})

				it('likes are visible with correct amount', function () {
					cy.get('.hidden-list').contains('Likes: 0')
				})

				it('user can add a like', function () {
					cy.get('.like-button').click()
					cy.get('.hidden-list').contains('Likes: 1')
				})

				it('that blog can be deleted', function() {
					cy.get('.delete-button').click()
					cy.get('.blog').should('not.exist')
				})
			})

			describe('and a different user logs in', function () {
				beforeEach( function() {
					cy.request('POST', `${Cypress.env('BACKEND')}/users`, { name: 'Jane Doe', username : 'janedoe', password: 'hunter2' })
					cy.get('.logout-button').click()
					cy.get('.input-username').type('janedoe')
					cy.get('.input-password').type('hunter2')
					cy.get('.submit-button').click()
				})

				it('this user cannot delete it', function () {
					cy.get('.blog > .show-button').click()
					cy.get('.delete-button').should('not.exist')
					cy.wait(1000)
				})
			})
		})
	})
})