const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema({

    reminderType: {
        type: String,
        enum: ['birthday', 'loan', 'custom'],
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    date: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
    },
    notifyByEmail: {
        type: Boolean,
        default: true,
    },
    notifyBySMS: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },


})

const reminders = mongoose.model('reminders',reminderSchema)
module.exports = reminders