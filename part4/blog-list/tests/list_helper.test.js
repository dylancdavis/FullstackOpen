const { dummy, totalLikes } = require('../utils/list_helper')

// const dummy = list_helper.dummy
// const totalLikes = list_helper

test('dummy should be 1', () => {
    expect(dummy([])).toBe(1)
})

test('Empty list has no likes', () => {
    expect(totalLikes([])).toBe(0)
})

test('One blog list has that blogs number of likes', () => {
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