const users = require("../../Models/userSchema");

exports.changeNotificationPreference = async (req, res) => {
  try {
    const userId = req.payload;
    const { email, mob } = req.body;

    if (typeof email !== 'boolean' || typeof mob !== 'boolean') {
      return res.status(400).json({ message: 'Invalid notification values. Must be boolean.' });
    }

    const updatedUser = await users.findByIdAndUpdate(
      userId,
      {
        $set: {
          'notificationPreferences.email': email,
          'notificationPreferences.mob': mob
        }
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(201).json({ message: 'Notification preferences updated successfully',preferences: updatedUser.notificationPreferences});
  } catch (err) {
    console.error('Error updating notification preferences:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
