const reminders = require("../../Models/reminderSchema");

exports.getingReminderHome = async(req, res) => {
    try {
        const userId = req.payload
        if(!userId){
            return res.status(404).json({message : 'unauthorised access'})
        }
        const getReminde = await reminders.find({userId}).sort({date : -1})
        if(getReminde.length === 0){
            res.status(400).json({message : 'no reminders found'})
        }
        else{
            res.status(201).json(getReminde)
        }
    }
    catch (err) {
        res.status(401).json({ message: "Failed to add reminder", error: err.message });
    }
}