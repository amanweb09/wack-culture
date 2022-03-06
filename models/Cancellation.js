const mongoose = require('mongoose');

const cancellationSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        unique: false
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = new mongoose.model('cancellations', cancellationSchema, 'cancellations');