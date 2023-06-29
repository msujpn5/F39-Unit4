const { JsonWebTokenError } = require('jsonwebtoken')

require('dotenv').config()
const {SECRET} = process.env

module.exports = {
    register: async (req, res) => {
        try {
            const {username, password} = req.body 
            let foundUser = await User.findOne({where: {username: username}})
            if (foundUser) {
                res.status(400).send('cannot create user')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({username, hashedPass: hash})
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token,
                    exp
                })
            }
        } catch (error) {
            console.log('ERROR IN register')
            console.log(error)
            res.sendStatus(400)
        }
    },

    login: (req, res) => {
        console.log('login')
    }
}

function createToken (username, id) {
    return jwt.sign(
        {
            username,
            id
        },
        SECRET,
        {
            expiresIn: '2 days'
        }
    )
}