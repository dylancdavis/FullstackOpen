import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (<Statistics 
    good={good}
    neutral={neutral}
    bad={bad}
    handleGood={handleGood}
    handleNeutral={handleNeutral}
    handleBad={handleBad}
  />)
}

const Statistics = ({good, neutral, bad, handleGood, handleNeutral, handleBad}) => (
  <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+neutral+bad}</p>
      <p>average {(good-bad)/(good+neutral+bad)}</p>
      <p>positive {(good/(good+neutral+bad))} %</p>
    </div>
)

export default App