const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content 
        p1={part1.name}
        e1 = {part1.exercises}
        p2={part2.name}
        e2 = {part2.exercises}
        p3={part3.name}
        e3 = {part3.exercises}
      />
      <Total 
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
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