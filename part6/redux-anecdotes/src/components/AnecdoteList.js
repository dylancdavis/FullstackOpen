const AnecdoteList = ({anecdotes, onVote}) => {

	return [...anecdotes].sort((a1, a2) => a1.votes < a2.votes).map(anecdote =>
		{return (<div key={anecdote.id}>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => onVote(anecdote.id)}>vote</button>
			</div>
		</div>)})
}

export default AnecdoteList