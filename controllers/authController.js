const jwt = require('jsonwebtoken')
const models = require('../models')

const User = models.users

exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ where: { email, password } }).then(user => {
        if (user) {
            const tokenKey = jwt.sign({ userId: user.id }, 'my-token-key')
            res.send({
                email: user.email,
                token: tokenKey
            })
        } else {
            res.send({
                error: true,
                messaga: "wrong email and password"
            })
        }
    })
}   