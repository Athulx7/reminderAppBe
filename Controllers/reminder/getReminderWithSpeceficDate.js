const reminders = require("../../Models/reminderSchema");

exports.getSpeceficDateReminder = async (req, res) => {
    // console.log('inside specific date gettiogn')
    try {
        const userId = req.payload
        const today = new Date().toISOString().split('T')[0];
        const getReminder = await reminders.find({ userId: userId, date: today })
        if (getReminder.length === 0) {
            res.status(400).json({ message: 'no reminders found' })

        }
        else {
            res.status(201).json(getReminder)
        }

    }
    catch (err) {
        res.status(401).json({ message: "Failed to add reminder", error: err.message })
    }
}