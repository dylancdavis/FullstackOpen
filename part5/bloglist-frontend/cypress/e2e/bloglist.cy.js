describe('Blog list app', () => {
	it('can visit front page', () => {
		cy.visit('https://localhost:3000')
		cy.contains('blogs')
	})
})