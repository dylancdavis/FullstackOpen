const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web Development Courses</h1>
      {courses.map(c => <Course key={c.id} course={c} />)}
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>)
}

const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({parts}) => (
      <>
      {
        parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)
      }
      </>
)

const Part = ({name, exercises}) => (
  <p>{name} {exercises}</p>
)

const Total = ({parts}) => <p>Number of exercises {parts.reduce((total,p) => total+p.exercises, 0)}</p>

export default App