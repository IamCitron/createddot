const User = require('../models/userModel')

// login a user
const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}

// signup a user
const signupUser = async (req, res) => {
    const { email, username, password } = req.body

    try {
        const user = await User.signup(email, username, password)

        res.status(200).json({email, user})
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports = { signupUser, loginUser }