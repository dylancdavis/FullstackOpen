const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const baseUser = {
    "username": "johnsmith",
    "name": "John Smith",
    "password": "hunter2"
}

const newUser = {
    "username": "janedoe",
    "name": "Jane Doe",
    "password": "123456"
}

const noUsername = {
    "name": "Jane Doe",
    "password": "123456"
}

const noPassword = {
    "username": "janedoe",
    "name": "Jane Doe",
}

const shortUsername = {
    "username": "jo",
    "name": "John Smith",
    "password": "hunter2"
}

const shortPassword = {
    "username": "johnsmith",
    "name": "John Smith",
    "password": "hj"
}

describe('POST request to /api/users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('returns 201 with valid user', async () => {
        const res = await api.post('/api/users').send(baseUser)
        expect(res.status).toBe(201)
    })

    test('fails when missing username', async () => {
        const res = await api.post('/api/users').send(noUsername)
        expect(res.status).toBe(400)
    })

    test('fails when missing password', async () => {
        const res = await api.post('/api/users').send(noPassword)
        expect(res.status).toBe(400)
    })

    test('fails when adding duplicate username', async () => {
        await api.post('/api/users').send(baseUser)
        const res = await api.post('/api/users').send(baseUser)
        expect(res.status).toBe(400)
    })

    test('succeeds when adding different username', async () => {
        await api.post('/api/users').send(baseUser)
        const res = await api.post('/api/users').send(newUser)
        expect(res.status).toBe(201)
    })

    test('returns 400 if username is too short', async () => {
        const response = await api.post('/api/users').send(shortUsername)
        expect(response.status).toBe(400)
      })
    
    test('returns 400 if password is too short', async () => {
    const response = await api.post('/api/users').send(shortPassword)
    expect(response.status).toBe(400)
    })

})