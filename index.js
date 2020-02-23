const express = require('express')
require('express-group-routes')

const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

const port = 5000

app.use(cors())
app.use(bodyParser.json())

const authController = require('./controllers/authController')
const registerController = require('./controllers/registerController')
const speciesController = require('./controllers/speciesController')
const petController = require('./controllers/petController')
const userController = require('./controllers/userController')
const { authenticated } = require('./middleware')

app.group('/api/v1', (router) => {
    //auth router login
    router.post('/auth/login', authController.login)
    //router register
    router.post('/register', registerController.insert)
    //router spesies
    router.get('/index/species', authenticated, speciesController.index)
    router.post('/create/species', authenticated, speciesController.insert)
    //router pets
    router.get('/index/pet', authenticated, petController.index)
    router.get('/show/pet/:id', authenticated, petController.show)
    router.post('/create/pet', authenticated, petController.insert)
    router.patch('/edit/pet/:id', authenticated, petController.edit)
    router.delete('/delete/pet/:id', authenticated, petController.deleted)
    //router user
    router.get('/show/user/:userId', authenticated, userController.show)
    router.patch('/edit/user/:userId', authenticated, userController.update)
    router.delete('/delete/user/:userId', authenticated, userController.deleted)
})

app.listen(port, () => {
    console.log(`listen on port ${port} !!!`)
})