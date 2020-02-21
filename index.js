const express = require('express')
require('express-group-routes')

const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

const port = 5000

app.use(cors())
app.use(bodyParser.json())

const AuthController = require('./controllers/authController')
const RegisterController = require('./controllers/registerController')
const SpeciesController = require('./controllers/speciesController')

app.group('/api/v1', (router) => {
    //auth router login
    router.post('/auth/login', AuthController.login)
    //router register
    router.post('/register', RegisterController.insert)
    //router spesies
    router.post('/create/species', SpeciesController.insert)
    router.get('/show/species', SpeciesController.show)
})

app.listen(port, () => {
    console.log(`listen on port ${port} !!!`)
})