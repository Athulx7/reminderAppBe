const express = require('express')

const reminderRouter = new express.Router()

const addReminder = require('../Controllers/reminder/addReminder')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const { getingReminderHome } = require('../Controllers/reminder/getReminder')
const gettingReminderHistory = require('../Controllers/reminder/gettingHistoryReminders')
const { getSpeceficDateReminder } = require('../Controllers/reminder/getReminderWithSpeceficDate')

reminderRouter.post('/user/addReminder',jwtMiddleware,addReminder.postReminder)
reminderRouter.get('/user/getHomeReminder',jwtMiddleware,getingReminderHome)
reminderRouter.get('/user/gethistoryReminder',jwtMiddleware,gettingReminderHistory.gettingReminderHistory)
reminderRouter.get('/user/getSpeficDateReminder',jwtMiddleware,getSpeceficDateReminder)

module.exports = reminderRouter