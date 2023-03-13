import anecdoteReducer from './reducers/anecdoteReducer'
import searchReducer from './reducers/searchReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		search: searchReducer
	}
})

export default store