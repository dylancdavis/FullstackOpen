const express = require('express')

const app = express()

const persons = [
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
  console.log('request info');
  response.send(`<p>${firstLine}</p><p>${secondLine}</p>`)
})

// GET all persons
app.get('/api/persons', (request, response) => {
  console.log('request for all persons');
  response.json(persons)
})

// GET person by ID
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(`request made for ${id}`);
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))