const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    address: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', unique: false },
    isDelivered: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = new mongoose.model('birthdayAddress', addressSchema, 'birthdayAddress')