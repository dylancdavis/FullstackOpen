const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const baseUser = {
    username: "johnsmith",
    name: "John Smith",
    password: "hunter2"
}

describe ('POST to /api/login', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await api.post('/api/users').send(baseUser)
    })

    test('Succeeds with correct username and password', async () => {
        const response = await api.post('/api/login').send({username: baseUser.username, password: baseUser.password})
        expect(response.status).toBe(200)
    })

    test('Returns a token when correct', async () => {
        const response = await api.post('/api/login').send({username: baseUser.username, password: baseUser.password})
        expect(response.body.token).toBeDefined()
    })

    test('Fails with existing username but incorrect password', async () => {
        const response = await api.post('/api/login').send({username: 'johnsmith', password: 'hunter3'})
        expect(response.status).toBe(401)
        expect(response.body.token).toBeUndefined()
    })

    test('Fails with nonexistent username but an existing password', async () => {
        const response = await api.post('/api/login').send({username: 'janedoe', password: 'hunter2'})
        expect(response.status).toBe(401)
        expect(response.body.token).toBeUndefined()
    })
}) 