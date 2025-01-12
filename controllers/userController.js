const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)

        //creates secret token for existing user
        const token = createToken(user._id)
        res.status(200).json({ user })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
    // res.status(200).json("Success")
}

const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)

        //creates secret token for new user 
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
    // res.status(200).json("Success")
}

//to read all the users from database
// const getUsers = async (req, res) => {
//     const users = await User.find({})

//     res.status(200).json({ users })
// }

module.exports = { loginUser, signupUser }