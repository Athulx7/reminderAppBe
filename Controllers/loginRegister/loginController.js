const bcrypt = require('bcrypt');
const users = require("../../Models/userSchema");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await users.findOne({ email: email })
    if (!existingUser) {
      return res.status(400).json('User Not Found: Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json('User Not Found: Invalid email or password');
    }

    const token = jwt.sign({ userid: existingUser._id }, JWT_SECRET);
    const { password: _, ...withoutPassword } = existingUser.toObject();

    return res.status(201).json({ data: withoutPassword, token: token });
  } catch (err) {
    return res.status(401).json('login faild due to', err);
  }
};
