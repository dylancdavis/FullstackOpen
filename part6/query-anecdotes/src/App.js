import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const baseUrl = 'http://localhost:3001/anecdotes'
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote)
  }

  const { isLoading, error, data } = useQuery('anecdotes',
    () => axios.get(baseUrl).then(res => res.data)
  )
  
  const anecdotes = data

  const dispatch = useNotificationDispatch()
  
  const newAnecdoteMutation = useMutation(
    (newAnecdote) => axios.post(baseUrl, newAnecdote).then(res => res.data),
    { onSuccess: (res) => { 
      dispatch({type: 'SET', payload: `Added note '${res.content}'`})
      setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
      queryClient.invalidateQueries('anecdotes') 
    },
    onError: (err) => {
      dispatch({type: 'SET', payload: `Error: ${err.response.data.error}`})
      setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
    } }
  )

  const voteAnecdoteMutation = useMutation(
    (newAnecdote) => axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote).then(res => res.data),
    { onSuccess: (res) => { 
      console.log('response', res)
      
      dispatch({type: 'SET', payload: `Voted note '${res.content}'`})
      setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
      queryClient.invalidateQueries('anecdotes') 
    } }
  )

  const addAnecdote = content => {
    newAnecdoteMutation.mutate({content, votes: 0 })
  }

  const voteAnecdote = anecdote => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
  }
  
  if (isLoading) return <div>loading...</div>
  if (error) return <div>Anecdote Service Unavailable (Server Error)</div>


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
