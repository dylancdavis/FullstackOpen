import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import { setSearch } from './reducers/searchReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {

  const anecdotes = useSelector(state => {
    if (!state.search) return state.anecdotes
    return state.anecdotes.filter(a => a.content.includes(state.search))
  })
  const dispatch = useDispatch()

  const onVote = id => {
    dispatch(voteOnAnecdote(id))
    console.log('vote', id)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const text = e.target.anecdoteText.value
    dispatch(addAnecdote(text))
  }

  const onSearch = e => {
    e.preventDefault()
    const text = e.target.value
    dispatch(setSearch(text))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter onSearch={onSearch} />
      <AnecdoteList anecdotes={anecdotes} onVote={onVote} />
      <AnecdoteForm onSubmit={handleSubmit} />
    </div>
  )
}

export default App