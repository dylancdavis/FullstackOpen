const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')

describe('Dummy function', () => {
    test('should be 1', () => {
        expect(dummy([])).toBe(1)
    })
})

describe('Number of likes in list', () => {
    test('is zero with empty list', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('with one blog is that blogs likes', () => {
        const oneBlogList = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }]
    
        expect(totalLikes(oneBlogList)).toBe(5)
    })

    test('with multiple blogs is their sum of likes', () => {
        const threeBlogList = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 3,
                __v: 0
            },

        ]
    
        expect(totalLikes(threeBlogList)).toBe(15)
    })

})

describe('Favorite blog in list', () => {
    test('is undefined with empty list', () => {
        expect(favoriteBlog([])).toBe(undefined)
    })

    test('with one blog is that blog', () => {
        const oneBlogList = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }]
    
        expect(favoriteBlog(oneBlogList)).toBe(oneBlogList[0])
    })

    test('with multiple blogs is blog with most likes', () => {
        const threeBlogList = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 3,
                __v: 0
            },

        ]
        expect(favoriteBlog(threeBlogList)).toBe(threeBlogList[1])
    })
})
