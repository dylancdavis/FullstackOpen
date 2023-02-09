const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('posted', req => JSON.stringify(req.body))
app.use(morgan('tiny', { skip: req => req.method === 'POST' }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :posted', {
  skip: req => req.method !== 'POST'
}))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// GET info
app.get('/info', (request, response) => {
  const firstLine = `Phonebook has info for ${persons.length} people`
  const secondLine = new Date();
  response.send(`<p>${firstLine}</p><p>${secondLine}</p>`)
})

// GET all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// GET person by ID
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// DELETE person by ID
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

// POST new person, automatically generated ID
app.post('/api/persons', (request, response) => {
  const newID = Math.floor(Math.random() * 1000)
  const newObj = {id: newID, ...request.body}

  // Check for both properties
  if (!newObj.name || !newObj.number) {
    response.status(400).json({error: 'missing object properties'})
    return
  }

  // Check that person does not already exist
  if (persons.map(p => p.name).includes(newObj.name)) {
    response.status(400).json({error: 'person already exists'})
    return
  }

  // Create and push person
  persons.push(newObj)
  response.json(newObj)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))