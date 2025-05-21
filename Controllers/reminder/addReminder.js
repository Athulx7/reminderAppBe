const reminders = require("../../Models/reminderSchema");

exports.postReminder = async (req, res) => {
//   console.log('Inside adding reminder')
//   console.log('User payload:', req.payload)
//   console.log('Request body:', req.body)

  const userId = req.payload
  const { reminderType, title, date, message, notifyByEmail, notifyBySMS } = req.body

  try {
    const existingReminder = await reminders.findOne({
      userId,
      reminderType,
      title,
      date
    });

    if (existingReminder) {
      return res.status(400).json({ message: "Reminder already exists for this date and title." });
    }

    const newReminder = new reminders({
      reminderType,
      title,
      date,
      description: message,
      notifyByEmail,
      notifyBySMS,
      userId
    });

    await newReminder.save();

    res.status(201).json({
      message: "Reminder added successfully",
      reminder: newReminder
    });
  } catch (err) {
    // console.error('Reminder creation error:', err);
    res.status(401).json({ message: "Failed to add reminder", error: err.message });
  }
};
