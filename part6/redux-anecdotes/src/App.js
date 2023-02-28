import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteOnAnecdote(id))
    console.log('vote', id)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const text = e.target.anecdoteText.value
    dispatch(addAnecdote(text))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm onSubmit={handleSubmit} />
    </div>
  )
}

export default App