const express = require('express')

const app = express()

app.use(express.json())

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
  console.log(`GET ${id}`);
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
  console.log(`DELETE ${id}`);
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter(p => p.id !== id)
    console.log(`ID ${id} deleted.`,persons);
    response.status(204).end()
  } else {
    console.log(`ID ${id} not found`);
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const newID = Math.floor(Math.random() * 1000)
  const newObj = {id: newID, ...request.body}
  console.log('Post request with headers:', request.headers);
  console.log('Adding:',newObj);
  persons.push(newObj)
  console.log(persons);
  response.json(newObj)

})


const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))