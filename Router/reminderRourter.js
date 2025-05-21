const express = require('express')

const reminderRouter = new express.Router()

const addReminder = require('../Controllers/reminder/addReminder')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const { getingReminderHome } = require('../Controllers/reminder/getReminder')

reminderRouter.post('/user/addReminder',jwtMiddleware,addReminder.postReminder)
reminderRouter.get('/user/getHomeReminder',jwtMiddleware,getingReminderHome)

module.exports = reminderRouter