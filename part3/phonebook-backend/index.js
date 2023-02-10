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

const Person = require('./models/person.js')

// GET info
app.get('/info', (request, response) => {
  const firstLine = `Phonebook has info for ${persons.length} people`
  const secondLine = new Date();
  response.send(`<p>${firstLine}</p><p>${secondLine}</p>`)
})

// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(p => response.json(p))
})

// GET person by ID
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(r => {
      if (r) {
        response.json(r)
      } else {
        response.status(404).end()
      }
    })
    .catch(e => next(e))
})

// DELETE person by ID
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(r => response.status(204).end())
    .catch(e => next(e))
})

// POST new person, automatically generated ID
app.post('/api/persons', (request, response, next) => {

  const objName = request.body.name
  const objNumber = request.body.number

  // Check for both properties
  if (!objName) return response.status(400).json({error: 'name property missing'})
  if (!objNumber) return response.status(400).json({error: 'number property missing'})

  const p = new Person ({
    name: request.body.name,
    number: request.body.number
  })

  Person.find({name: objName}).then(r => {
    if (r.length) {
      response.status(400).json({error: `person with ${objName} already exists.`})
    } else {
      p.save()
      .then(resp => {
        console.log(`${p.name} (${p.number}) addded to phonebook`)
        response.status(201).json(p);
     }).catch(e => next(e))
    }
  })



})

app.put('/api/persons/:id', (request, response, next) => {

  const objName = request.body.name
  const objNumber = request.body.number

  // Check for both properties
  if (!objName) return response.status(400).json({error: 'name property missing'})
  if (!objNumber) return response.status(400).json({error: 'number property missing'})

  const p = {
    name: request.body.name,
    number: request.body.number
  }

  Person.findByIdAndUpdate(request.params.id, p, {new: true, runValidators: true})
    .then(updated => {
      if (updated) return response.json(updated)
      return response.status(404).json({error: 'resource to update missing'})
    } )
    .catch(e => next(e))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    response.status(400).json({error: 'malformed id'})
  } else if (error.name === 'ValidationError') {
    response.status(400).json({error: error.message})
  } else {
    response.status(500).end()
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))