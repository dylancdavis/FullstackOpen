import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!newName) return;

    let names = persons.map(p => p.name)
    if (names.includes(newName)) {
      alert(`${newName} is already in the phonebook.`)
      return
    }

    setPersons(persons.concat({ name: newName}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <p key={p.name}>{p.name}</p>)}
    </div>
  )
}

export default App