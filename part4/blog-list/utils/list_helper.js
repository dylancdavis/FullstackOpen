const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((total,current) => total + current.likes, 0)

const favoriteBlog = blogs => blogs.reduce((favorite,current) => {
    return favorite.likes > current.likes 
        ? favorite
        : current
}, blogs.length ? blogs[0] : undefined)

const mostBlogs = blogs => {

    if (blogs.length === 0) return undefined
    const authors = blogs.map(b => b.author)

    let authorBlogNums = []

    for (let i=0; i<authors.length; i++) {
        if (authorBlogNums.map(a => a.author).includes(authors[i])) {
            // Author already in list
            authorBlogNums = authorBlogNums.map(a => a.author === authors[i] ? { ...a, blogs: a.blogs+1 } : a)
        } else {
            // Author not in list
            authorBlogNums.push({ author: authors[i], blogs: 1})
        }
    }

    return authorBlogNums.reduce((most, current) => most.blogs > current.blogs ? most : current, {blogs: 0})
}

const mostLikes = blogs => {

    if (blogs.length === 0) return undefined

    let authorLikeNums = []

    for (let i=0; i<blogs.length; i++) {
        const currentAuthor = blogs[i].author
        const currentLikes = blogs[i].likes

        if (authorLikeNums.map(a => a.author).includes(currentAuthor)) {
            // Author already in list
            authorLikeNums = authorLikeNums.map(a => a.author === currentAuthor ? { ...a, likes: a.likes+currentLikes } : a)
        } else {
            // Author not in list
            authorLikeNums.push({ author: currentAuthor, likes: currentLikes})
        }
    }

    return authorLikeNums.reduce((most, current) => most.likes > current.likes ? most : current, {likes: 0})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}