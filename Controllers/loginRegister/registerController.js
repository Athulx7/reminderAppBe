const bcrypt = require('bcrypt');
const users = require("../../Models/userSchema");

exports.register = async (req, res) => {
  const { fullname, phnno, email, password, confrimPass } = req.body;
  try {
    const existingUseremail = await users.findOne({ email: email });
    const existingUserMobile = await users.findOne({ phoneNo: phnno });

    if (existingUseremail && existingUserMobile) {
      return res.status(400).json({ error: 'Both email and mobile number are already registered' });
    } else if (existingUseremail) {
      return res.status(400).json({ error: 'This email is already registered' });
    } else if (existingUserMobile) {
      return res.status(400).json({ error: 'This mobile number is already registered' });
    } else {

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new users({
        username: fullname,
        email: email,
        password: hashedPassword,  
        phoneNo: phnno,
      });

      await newUser.save();
      return res.status(201).json({ message: 'User registration successful', user: newUser });
    }
  } catch (err) {
    return res.status(401).json({
      error: 'User registration failed',
      details: err.message
    });
  }
};
