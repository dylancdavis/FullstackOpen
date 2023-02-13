const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('GET request to /api/blogs', () => {
    test('returns 200 OK', async () => {
        const response = await api.get('/api/blogs')
        expect(response.status).toBe(200)
    })

    test('returns eight items', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(8)
    })
})

// test('POST request is successful', async () => {
//     const postObj = {
//         "title": "My Day",
//         "author": "John Smith",
//         "url": "google.com",
//         "likes": 3
//     }
//     const response = await api.post('/api/blogs',postObj)
//     expect(response.status).toBe(201)
// })

