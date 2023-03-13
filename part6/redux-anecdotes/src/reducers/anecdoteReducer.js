const anecdotesText = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const toAnecdoteObj = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesText.map(toAnecdoteObj)

export const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(a => {
        return a.id === action.payload.id
          ? {...a, votes: a.votes+1}
          : a
      })
    case 'ADD_ANECDOTE':
      return state.concat(action.payload)
    default:
      return state
  }
}

export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload
    default:
      return state
  }
}

export const voteOnAnecdote = id => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const addAnecdote = text => {
  return {
    type: 'ADD_ANECDOTE',
    payload: toAnecdoteObj(text)
  }
}

export const setSearch = text => {
  return {
    type: 'SET_SEARCH',
    payload: text
  }
}