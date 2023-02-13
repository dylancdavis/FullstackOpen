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
    "title": "Drink More Water",
    "author": "Hydro Man",
    "url": "water.com"
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
        const response = await api.post('/api/blogs',blogToPost)
        expect(response.status).toBe(201)
    })

    test('increases total number by one', async () => {
        await api.post('/api/blogs', blogToPost)
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
    
})


