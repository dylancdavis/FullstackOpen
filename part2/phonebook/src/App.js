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
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit}
      />
      <SearchNames searchName={searchName} onSearchChange={handleSearchChange} />
      <Numbers filteredNames={getFilteredNames()} />

    </div>
  )
}

const PersonForm = ({newName, newNumber, onNameChange, onNumberChange, onSubmit}) => (
  <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">Add Person</button>
        </div>
      </form>
)

const Numbers = ({filteredNames}) =>  (
  <>
    <h2>Numbers</h2>
    <p>Search by Name</p>
    {filteredNames.map(p => <p key={p.name}>{p.name} {p.number}</p>)}
  </>
)

const SearchNames = ({searchName, onSearchChange}) => (
  <div>
    Search: <input value={searchName} onChange={onSearchChange} />
  </div>
)

export default App