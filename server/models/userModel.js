const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, username, password) {
    const email_exists = await this.findOne({ email })
    const username_exists = await this.findOne({ username })


    if (email_exists) {
        throw Error('Email already exists')
    }
    if (username_exists) {
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash })

    return user    
}

module.exports = mongoose.model('User', userSchema)