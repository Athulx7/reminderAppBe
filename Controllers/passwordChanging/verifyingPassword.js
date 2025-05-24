const bcrypt = require('bcrypt');
const users = require('../../Models/userSchema');

exports.veryfingThePassword = async (req, res) => {
  try {
    const userId = req.payload;
    const { pass } = req.body;

    if (!userId || !pass) {
      return res.status(400).json({ message: 'User ID or password missing' })
    }

    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      return res.status(201).json({ message: 'Password verified successfully' })
    } else {
      return res.status(401).json({ message: 'Incorrect password' })
    }
  } catch (err) {
    console.error('Error verifying password:', err);
    return res.status(500).json({ message: 'Server error' })
  }
};
