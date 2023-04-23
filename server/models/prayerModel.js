const mongoose = require('mongoose')

const Schema = mongoose.Schema

const prayerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    prayer_count: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        default: 'in_progress'
    }
}, { timestamps: true })


module.exports = mongoose.model('Prayer', prayerSchema)