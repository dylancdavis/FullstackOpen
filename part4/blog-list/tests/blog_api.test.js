const mongoose = require('mongoose')
const supertest = require('supertest')
const { post } = require('../app')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjs = testBlogs.map(b => new Blog(b))
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
            console.log(blogArr[i]);
            expect(blogArr[i].id).toBeDefined()
        }
    })

})


describe('POST request to /api/blogs', () => {
    test('returns 201 created', async () => {
        const response = await api.post('/api/blogs').send(blogToPost)
        expect(response.status).toBe(201)
    })

    test('increases total number by one', async () => {
        await api.post('/api/blogs').send(blogToPost)
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(testBlogs.length+1)
    })

    test('is returned in a subsequent fetch', async () => {
        await api.post('/api/blogs').send(blogToPost)
        const response = await api.get('/api/blogs')
        expect (response.body.some(b => {
            if (blogToPost.author === b.author) {
                console.log(b);
                return true
            } else {
                return false;
            }
        })).toBe(true)
    })

    test('with no likes property has likes added with value zero', async () => {
        const response = await api.post('/api/blogs').send(blogNoLikes)
        expect(response.body.likes).toBe(0)
    })

    test('returns 400 bad request when missing title', async () => {
        const response = await api.post('/api/blogs').send(blogNoTitle)
        expect (response.status).toBe(400)
    })

    test('returns 400 bad request when missing URL', async () => {
        const response = await api.post('/api/blogs').send(blogNoURL)
        expect (response.status).toBe(400)
    })
    
})

describe ('DELETE request to /api/blogs' , () => {
    test('succeeds with valid ID', async () => {
        // Get ID of first object in database
        const getResponse = await api.get('/api/blogs')
        const idToUse = getResponse.body[0].id

        // Delete it
        const deleteResponse = await api.delete(`/api/blogs/${idToUse}`)
        expect(deleteResponse.status).toBe(204)

        // TODO: Make sure ID is not in the database after
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

        console.log();

        // TODO: Make sure object is correct
    })
})

