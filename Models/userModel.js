const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Email is required and should be unique.'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
        },
        userName: {
            type: String,
            required: [true, 'Username is required and should be unique.'],
            unique: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
