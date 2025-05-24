const reminders = require("../../Models/reminderSchema")

exports.gettingReminderHistory = async(req,res) => {
    try{
        const userId = req.payload
        if(!userId){
            return res.status(404).json({message : 'unauthorised access'})
        }
        const getHistoryReminder = await reminders.find(userId).sort({date : -1})
        if(getHistoryReminder.length === 0){
            res.status(400).json({message : 'no reminders found'})
        }
        else{
            res.status(201).json(getHistoryReminder)
        }
    }
    catch (err) {
        res.status(401).json({ message: "Failed to get reminder", error: err.message })
    }
}