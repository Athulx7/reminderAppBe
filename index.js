const express = require('express')
require('dotenv').config()
const cors = require('cors')
const loginRouter = require('./Router/loginRouter')
require('./DB/dbConection')

const reminderServer = express()
reminderServer.use(cors())
reminderServer.use(express.json())

reminderServer.use(loginRouter)

const PORT = 3000

reminderServer.listen(PORT,()=>{
    console.log(`Reminder server Running in PORT ${PORT}`)
})


reminderServer.get('/',(req,res)=>{
    res.send('the reminder is running susccessfullly')
})