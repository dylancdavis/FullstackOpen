const tokenFromReqest = (req, res, next) => {
    const auth = req.get('authorization')
    if (auth && auth.startsWith('bearer ')) {req.token = auth.replace('bearer ','')}
    next()
}

module.exports = tokenFromReqest