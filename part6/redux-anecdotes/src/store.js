import anecdoteReducer from './reducers/anecdoteReducer'
import searchReducer from './reducers/searchReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		search: searchReducer,
		notification: notificationReducer
	}
})

export default store