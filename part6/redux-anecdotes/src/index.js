import React from 'react'
import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { anecdoteReducer, searchReducer } from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  search: searchReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)