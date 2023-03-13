import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map(a => {
        return a.id === action.payload.id
          ? action.payload
          : a
      })
    },
    addAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const { updateAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch, getState) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = text => {
  return async (dispatch, getState) => {
    const response = await anecdoteService.create(text)
    dispatch(addAnecdote(response))
    
  }
}

export const voteOnAnecdote = id => {
  return async (dispatch, getState) => {
    const response = await anecdoteService.vote(id)
    dispatch(updateAnecdote(response))
  }
}