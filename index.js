const express = require('express')
require('dotenv').config()
const cors = require('cors')
const loginRouter = require('./Router/loginRouter')
const reminderRouter = require('./Router/reminderRourter')
const passwordRouter = require('./Router/passwordRouter')
require('./DB/dbConection')
require('./Controllers/ReminderSheduler/reminderEmailSheduler')
require('./Controllers/ReminderSheduler/reminderTeligramScheduler')
require('./Controllers/ReminderSheduler/TeligramBot')
const reminderServer = express()
reminderServer.use(cors())
reminderServer.use(express.json())

reminderServer.use(loginRouter)
reminderServer.use(reminderRouter)
reminderServer.use(passwordRouter)

const PORT = 3000

reminderServer.listen(PORT,()=>{
    console.log(`Reminder server Running in PORT ${PORT}`)
})


reminderServer.get('/',(req,res)=>{
    res.send('the reminder is running susccessfullly')
})