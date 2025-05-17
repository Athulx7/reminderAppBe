const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        // select : false,
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true,
    },
    notificationPreferences: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        mob: { type: Boolean, default: false }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    themePreferences: {
        mode: {
            type: String,
            enum: ['light', 'dark', 'system'],
            default: 'system'
        },
        primaryColor: {
            type: String,
            enum: ['pink', 'emerald', 'orange', 'yellow'],
            default: 'emerald'
        },
    }
})

const users = mongoose.model('users', userSchema)
module.exports = users