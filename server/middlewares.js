checkPassword = (req, res, next) => {
    console.log(req.session)
    if(req.session.isAdmin === true) {
        next()
    } else {
        res.status(401).json('please log in')
    }
}

module.exports = {
    checkPassword
}