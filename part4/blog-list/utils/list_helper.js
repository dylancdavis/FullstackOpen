const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((total,current) => total + current.likes, 0)

const favoriteBlog = blogs => blogs.reduce((favorite,current) => {
    return favorite.likes > current.likes 
        ? favorite
        : current
}, blogs.length ? blogs[0] : undefined)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}