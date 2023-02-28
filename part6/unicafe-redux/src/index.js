import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'

const counterStore = createStore(counterReducer)

const App = () => {
	
	const onGood = () => {
		counterStore.dispatch({ type: 'GOOD'})
	}
	
	const onOk = () => {
		counterStore.dispatch({ type: 'OK'})
	}
	
	const onBad = () => {
		counterStore.dispatch({ type: 'BAD'})
	}
	
	const onReset = () => {
		counterStore.dispatch({type: 'ZERO'})
	}
	
	const counter = counterStore.getState();
	const good = counter.good
	const ok = counter.ok
	const bad = counter.bad
	
	return (
		<div>
			<div>
				<button onClick={onGood}>Good</button>
				<button onClick={onOk}>Okay</button>
				<button onClick={onBad}>Bad</button>
				<button onClick={onReset}>Reset</button>
			</div>
			<div>
				<div>Good: {good}</div>
				<div>Okay: {ok}</div>
				<div>Bad: {bad}</div>
			</div>
		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
counterStore.subscribe(renderApp)