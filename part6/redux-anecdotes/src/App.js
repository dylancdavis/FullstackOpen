import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote, initializeAnecdotes, createAnecdote } from './reducers/anecdoteReducer'
import { setSearch } from './reducers/searchReducer'
import { clearNotification, doNotification, setNotification } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'

const App = () => {

  const anecdotes = useSelector(state => {
    if (!state.search) return state.anecdotes
    return state.anecdotes.filter(a => a.content.includes(state.search))
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const onVote = id => {
    dispatch(voteOnAnecdote(id))
    const text = anecdotes.find(a=> a.id === id).content
    dispatch(doNotification(`You voted for '${text}'`, 2))
    console.log('vote', id)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const text = e.target.anecdoteText.value
    e.target.anecdoteText.value = ''
    dispatch(createAnecdote(text))
    dispatch(doNotification(`Created note '${text}'`))
  }

  const onSearch = e => {
    e.preventDefault()
    const text = e.target.value
    dispatch(setSearch(text))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter onSearch={onSearch} />
      <AnecdoteList anecdotes={anecdotes} onVote={onVote} />
      <AnecdoteForm onSubmit={handleSubmit} />
    </div>
  )
}

export default App