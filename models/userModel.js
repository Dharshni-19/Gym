const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//login static function
userSchema.statics.login = async function (email, password) {
    //validates input fields
    if (!email || !password) {
        throw Error('Input fields cannot be empty')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Invalid email ID')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Password mismatch')
    }
    return user
}

//signup static function
userSchema.statics.signup = async function (email, password) {
    //validates input fields
    if (!email || !password) {
        throw Error('Input fields cannot be empty')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please enter valid email ID')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Please enter a strong password')
    }

    //checks if user has an account already
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('User already exists')
    }

    //password = headers + payload + encrypted data
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    
    return user
}

module.exports = mongoose.model('User', userSchema)