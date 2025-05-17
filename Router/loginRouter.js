const express = require('express')

const loginRouter = new express.Router()
const loginController = require('../Controllers/loginRegister/loginController')
const registerController = require('../Controllers/loginRegister/registerController')

loginRouter.post('/user/login',loginController.login)
loginRouter.post('/user/register',registerController.register)

module.exports = loginRouter