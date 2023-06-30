require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization') //retrieves the value of the 'Authorization' header from the incoming HTTP request and assigns it to the headerToken variable

        if(!headerToken) { //user isn't authenticated and send a 401 unauthorized response
            console.log('ERROR IN auth middleware') 
            res.sendStatus(401)
        }

        let token

        try{
            token = jwt.verify(headerToken, SECRET) //if the headerToken exists, this line attempts to verify the token
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if(!token) { //indicates that the token is invalid or expired
            const error = new Error('Not authenticated')
            error.statusCode = 401
            throw error
        }
        next() //token is verified and valid, then passes control to the next middleware function
    }
}