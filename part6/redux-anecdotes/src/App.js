import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote, addAnecdote, setAnecdotes } from './reducers/anecdoteReducer'
import { setSearch } from './reducers/searchReducer'
import { clearNotification, setNotification } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import noteService from './services/anecdoteService'

const App = () => {

  const anecdotes = useSelector(state => {
    if (!state.search) return state.anecdotes
    return state.anecdotes.filter(a => a.content.includes(state.search))
  })

  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll().then(a => dispatch(setAnecdotes(a)) )
  }, [dispatch])

  const onVote = id => {
    dispatch(voteOnAnecdote(id))
    const text = anecdotes.find(a=> a.id === id).content
    dispatch(setNotification(`You voted for '${text}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
    console.log('vote', id)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const text = e.target.anecdoteText.value
    e.target.anecdoteText.value = ''
    noteService.create(text).then(a => {
      dispatch(addAnecdote(a))
      dispatch(setNotification(`Created note '${a.content}'`))
      setTimeout(() => dispatch(clearNotification()), 5000)
    })
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