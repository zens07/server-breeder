const express = require('express')
require('express-group-routes')

const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

const port = 5000

app.use(cors())
app.use(bodyParser.json())

const AuthController = require('./controllers/authController')

app.group('/api/v1', (router) => {
    //auth router login
    router.post('/auth/login', AuthController.login)
    //router register
    //router 
})

app.listen(port, () => {
    console.log(`listen on port ${port} !!!`)
})