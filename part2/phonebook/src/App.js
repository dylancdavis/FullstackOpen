import { useEffect, useState } from 'react'
import { getAll, create, update, remove } from './services/people'
import './app.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

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

    let newPerson = { name: newName, number: newNumber }
    let names = persons.map(p => p.name)

    // Case: person already exists (same name)
    if (names.includes(newName)) {

      let id = (persons.filter(p => p.name === newName)[0].id)
      if (window.confirm(`${newName} is already in the phonebook. Replace number?`)) {
        update(id,newPerson).then(() => {
          setAlertMessage({
            text: `${newName} updated.`,
            type: 'info'
          })
          setPersons(persons.map(p => p.id === id ? {...newPerson, id: id} : p))
        }).catch(e => {
          console.log(e.response.status);
          if (e.response.status === 400) {
            // Due to bad request
            setAlertMessage({
              text: `Error: ${e.response.data.error}`,
              type: 'fail'
            })
          } else if (e.response.status === 404) {
            console.log(e.response.data.error);
            setAlertMessage({
              text: `Error: ${newName} does not exist on server, deleting.`,
              type: 'fail'
            })
            setPersons(persons.filter(p => p.id !== id))
          }
        })
        setTimeout(() => setAlertMessage(null), 2000)

      }
      return
    }

    create(newPerson).then(p => {
      console.log('adding', p);
      setPersons(persons.concat(p))
      setAlertMessage({
        text: `${p.name} added to phonebook.`,
        type: 'success'
      })
      
      setTimeout(() => setAlertMessage(null), 2000)
    }).catch(error => {

      setAlertMessage({
        text: `Error: ${error.response.data.error}`,
        type: 'fail'
      })
      
      setTimeout(() => setAlertMessage(null), 2000)
    })
    setNewName('')
    setNewNumber('')
  }

  const handleRemove = (id,name) => {
    return () => {
      if (window.confirm(`Delete ${name} from phonebook?`)) {
        remove(id)
        setPersons(persons.filter(p => p.id !== id))
        setAlertMessage({
          text: `${name} removed from phonebook.`,
          type: 'info'
        })
        setTimeout(() => setAlertMessage(null), 2000)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AlertMessage {...alertMessage} />
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

const AlertMessage = ({text, type}) => {
  if (text) return <p className={`message ${type}`}>{text}</p>
  return null
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
    <h2>Numbers v1</h2>
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