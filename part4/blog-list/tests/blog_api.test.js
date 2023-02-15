const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { baseUser, newUser } = require('./testHelper')

const idToUse = async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(newUser)
    const response = await api.post('/api/users').send(baseUser)
    return response.body.id
}

const testBlogs = [
    {
        "title": "My Day",
        "author": "John Smith",
        "url": "google.com",
        "likes": 3
    },
    {
        "title": "Things I Eat",
        "author": "Hannah Yosemite",
        "url": "yahoo.com",
        "likes": 5
    },
    {
        "title": "Car Troubles",
        "author": "Walter Artfield",
        "url": "bing.com",
        "likes": 1
    },
    {
        "title": "The Best Vacation",
        "author": "Guy Manuel",
        "url": "gmail.com",
        "likes": 12
    },
    {
        "title": "Poetry Snippets",
        "author": "Haiku Guy",
        "url": "google.com",
        "likes": 6
    },
]

const blogToPost = {
    "title": "Cool Plants",
    "author": "Mike Greene",
    "url": "outlook.com",
    "likes": 8
}

const blogNoLikes = {
    "title": "Cool Plants",
    "author": "Mike Greene",
    "url": "outlook.com"
}

const blogNoTitle = {
    "author": "Mike Greene",
    "url": "outlook.com",
    "likes": 8
}

const blogNoURL = {
    "title": "Cool Plants",
    "author": "Mike Greene",
    "likes": 8
}

let validId
let authorizedToken
let unauthorizedToken

beforeEach(async () => {
    validId = await idToUse()
    await Blog.deleteMany({})
    const blogAndUsers = testBlogs.map(b => {
        b.user = validId
        return b
    })

    // Assign the authorized token
    let loginResponse = await api.post('/api/login').send({username: baseUser.username, password: baseUser.password})
    authorizedToken = loginResponse.body.token

    // Assign the unauthorized token
    loginResponse = await api.post('/api/login').send({username: newUser.username, password: newUser.password})
    unauthorizedToken = loginResponse.body.token

    const blogObjs = blogAndUsers.map(b => new Blog(b))
    const promises = blogObjs.map(b => b.save())
    await Promise.all(promises)
})

describe('GET request to /api/blogs', () => {
    test('returns 200 OK', async () => {
        const response = await api.get('/api/blogs')
        expect(response.status).toBe(200)
    })

    test('returns correct number of items', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(testBlogs.length)
    })

    test('returns objects with an id property', async () => {
        const response = await api.get('/api/blogs')
        const blogArr = response.body
        for (let i=0; i<blogArr.length; i++) {
            expect(blogArr[i].id).toBeDefined()
        }
    })

})


describe('POST request to /api/blogs', () => {
    test('returns 201 created with valid token', async () => {
        const toSend = {...blogToPost, user: validId}
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .send(toSend)
        expect(response.status).toBe(201)
    })

    test('increases total number by one', async () => {
        const toSend = {...blogToPost, user: validId}
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .send(toSend)
        
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(testBlogs.length+1)
    })

    test('is returned in a subsequent fetch', async () => {
        const toSend = {...blogToPost, user: validId}
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .send(toSend)
        
        const response = await api.get('/api/blogs')
        expect (response.body.some(b => {
            if (blogToPost.author === b.author) {
                return true
            } else {
                return false;
            }
        })).toBe(true)
    })

    test('with no likes property has likes added with value zero', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .send(blogNoLikes)
        expect(response.body.likes).toBe(0)
    })

    test('returns 400 bad request when missing title, with valid token', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .send(blogNoTitle)
        expect (response.status).toBe(400)
    })

    test('returns 400 bad request when missing URL, with valid token', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .send(blogNoURL)
        expect (response.status).toBe(400)
    })

    test('returns 400 with an invalid token', async () => {
        const toSend = {...blogToPost, user: validId}
        const invalidToken = 'an-invalid-token'
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send(toSend)
        expect(response.status).toBe(400)
    })
    
})

describe ('DELETE request to /api/blogs' , () => {
    test('succeeds with valid token', async () => {

        // Get ID of first object in database (owned by baseUser)
        const getResponse = await api.get('/api/blogs')
        const idToUse = getResponse.body[0].id

        // Delete it, sending token in authorization header
        const deleteResponse = await api
            .delete(`/api/blogs/${idToUse}`)
            .set('Authorization', `Bearer ${authorizedToken}`)
        expect(deleteResponse.status).toBe(204)
    })

    test('fails with invalid token', async () => {

        // Get ID of first object in database (owned by baseUser)
        const getResponse = await api.get('/api/blogs')
        const idToUse = getResponse.body[0].id

        // Delete it, sending token in authorization header
        const deleteResponse = await api
            .delete(`/api/blogs/${idToUse}`)
            .set('Authorization', `Bearer ${unauthorizedToken}`)
        expect(deleteResponse.status).toBe(401)
    })

    test('gives bad request when sent with no token', async () => {

        // Get ID of first object in database (owned by baseUser)
        const getResponse = await api.get('/api/blogs')
        const idToUse = getResponse.body[0].id

        // Delete it, sending token in authorization header
        const deleteResponse = await api
            .delete(`/api/blogs/${idToUse}`)
        expect(deleteResponse.status).toBe(400)
    })
})

describe ('PUT request to /api/blogs' , () => {
    test('succeeds with valid ID', async () => {
        // Get ID of first object in database
        const getResponse = await api.get('/api/blogs')
        const idToUse = getResponse.body[0].id

        // Update it with a new object
        const putResponse = await api.put(`/api/blogs/${idToUse}`,blogToPost)
        expect(putResponse.status).toBe(200)
        
        // TODO: Make sure object is correct
    })
})

