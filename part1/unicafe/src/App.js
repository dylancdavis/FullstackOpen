import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <Feedback 
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>)
}

const Feedback = ({handleGood, handleNeutral, handleBad}) => (
  <>
    <h1>give feedback</h1>
    <Button text="good" onClick={handleGood} />
    <Button text="neutral" onClick={handleNeutral} />
    <Button text="bad" onClick={handleBad} />
  </>
)

const Button = ({text, onClick}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = ({good, neutral, bad}) => {
  if (good || neutral || bad) {
    return (<>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good+neutral+bad} />
      <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)} />
      <StatisticLine text="positive" value={(good/(good+neutral+bad))+'%'} />
  </>)
  } else {
    return (<>
      <h1>statistics</h1>
      <p>No feedback given</p>
  </>)
  }
}

const StatisticLine = ({text, value}) => (
  <p>{text} {value}</p>
)

export default App