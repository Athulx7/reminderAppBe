const express = require('express')
const passwordRouter = new express.Router()

const jwtMiddleware = require('../Middleware/jwtMiddleware')

const veryfingThePassword = require('../Controllers/passwordChanging/verifyingPassword')
const { resettingPassword } = require('../Controllers/passwordChanging/resetPassword')
const { changeNotificationPreference } = require('../Controllers/changeNotificationPrefe/chanegNofificationPefe')

passwordRouter.post('/user/verifyPassword',jwtMiddleware,veryfingThePassword.veryfingThePassword)
passwordRouter.post('/user/resetPassword',jwtMiddleware,resettingPassword)

// changeNotification 

passwordRouter.post('/user/notificationPreference',jwtMiddleware,changeNotificationPreference)
module.exports = passwordRouter
