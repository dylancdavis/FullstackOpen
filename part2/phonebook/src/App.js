import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = e => {
    setSearchName(e.target.value)
  }

  const getFilteredNames = () => {
    if (searchName === '') return persons
    return (persons.filter(p => (p.name.toLowerCase().includes(searchName.toLowerCase()))))
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!newName) return;

    let names = persons.map(p => p.name)
    if (names.includes(newName)) {
      alert(`${newName} is already in the phonebook.`)
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>Search by Name</p>
      <input value={searchName} onChange={handleSearchChange} />
      {getFilteredNames().map(p => <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App