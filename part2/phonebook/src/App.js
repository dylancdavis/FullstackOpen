import axios from 'axios'
import { useEffect, useState } from 'react'
import { getAll, create, remove } from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    getAll().then(r => setPersons(r))
  }, [])


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

    let newPerson = { name: newName, number: newNumber}

    create(newPerson).then(p => setPersons(persons.concat(p)))

    // axios
    //   .post('http://localhost:3001/persons', newPerson)
    //   .then(r => setPersons(persons.concat(r.data)))
    setNewName('')
    setNewNumber('')
  }

  const handleRemove = (id,name) => {
    return () => {
      if (window.confirm(`Delete ${name} from phonebook?`)) {
        remove(id)
        setPersons(persons.filter(p => p.id !== id))
      }
    }
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
      <Numbers filteredNames={getFilteredNames()} handleRemove={handleRemove} />

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

const Numbers = ({filteredNames, handleRemove}) =>  (
  <>
    <h2>Numbers</h2>
    {filteredNames.map(p => (
    <div key={p.id}>
        <span>{p.name} {p.number}</span>
        <button onClick={handleRemove(p.id,p.name)}>x</button>
    </div>))}
  </>
)

const SearchNames = ({searchName, onSearchChange}) => (
  <div>
    Search: <input value={searchName} onChange={onSearchChange} />
  </div>
)

export default App