const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const jwtMiddleware = (req, res, next) => {
    // console.log('inside jwt middleware')
    const token = req.headers['authorization'].split(' ')[1]

    // console.log(token)
    try {
        const jwtResponce = jwt.verify(token, JWT_SECRET)
        // console.log('jwt responce',jwtResponce)
        req.payload = jwtResponce.userid
        next()

    }
    catch (err) {
        res.status(401).json("authorization faid ", err)
    }
}

module.exports = jwtMiddleware