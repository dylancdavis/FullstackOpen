export default function Course({course}) {
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