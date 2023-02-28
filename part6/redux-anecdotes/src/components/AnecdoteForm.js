const AnecdoteForm = ({onSubmit}) => {
	return (
	<>
		<h2>create new</h2>
		<form onSubmit={onSubmit}>
			<div><input name='anecdoteText' /></div>
			<button type='submit'>create</button>
		</form>
	</>)
}

export default AnecdoteForm