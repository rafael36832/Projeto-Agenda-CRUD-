const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const errorController = require('./src/controllers/errorController')
const loginController = require('./src/controllers/loginController')
const contactController = require('./src/controllers/contactController')
const {loginRequired} = require('./src/middleware/middleware')
const {specificContactUser} = require('./src/middleware/middleware')

route.use(express.urlencoded({extended: true}))  

// Home's routes
route.get('/', homeController.index)

// Error's routes
route.get('/404', errorController.error404)
route.get('/403', errorController.error403)

// login's routes
route.get('/login/index', loginController.index)
route.get('/login/useTerms', loginController.useTerms)
route.get('/login/logout', loginController.logout)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)

// contact's routes
route.get('/contact/index', loginRequired, contactController.index)
route.post('/contact/register', loginRequired, contactController.register)
route.get('/contact/index/:id', loginRequired, contactController.edit)
route.post('/contact/update/:id', loginRequired, contactController.update)
route.get('/contact/delete/:id', loginRequired, contactController.delete)

// overwrite module.exports with route
module.exports = route