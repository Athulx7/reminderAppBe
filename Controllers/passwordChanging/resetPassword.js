const bcrypt = require('bcrypt');
const users = require('../../Models/userSchema');

exports.resettingPassword = async (req, res) => {
  try {
    const userId = req.payload;
    const { pass } = req.body;

    if (!userId || !pass) {
      return res.status(400).json({ message: 'User ID or new password missing' })
    }

    const hashedPassword = await bcrypt.hash(pass, 10)

    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(201).json({ message: 'Password reset successfully' })
  } catch (err) {
    return res.status(500).json({ message: 'Server error' },err)
  }
}
