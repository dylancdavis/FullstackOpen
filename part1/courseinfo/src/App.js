const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        p1={part1}
        e1 = {exercises1}
        p2={part2}
        e2 = {exercises2}
        p3={part3}
        e3 = {exercises3}
      />
      <Total 
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />

    </div>
  )
}

const Header = ({course}) => <h1>{course}</h1>

const Content = ({p1, e1, p2, e2, p3, e3}) => (
      <>
        <Part part={p1} exercises={e1} />
        <Part part={p2} exercises={e2} />
        <Part part={p3} exercises={e3} />
      </>
)

const Part = ({part, exercises}) => (
  <p>{part} {exercises}</p>
)

const Total = ({exercises1, exercises2, exercises3}) => <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>

export default App