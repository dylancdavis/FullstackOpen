import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import searchReducer from './reducers/searchReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		search: searchReducer
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)