const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: false
    },
    products: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    promoApplied: {
        type: String
    },
    status: {
        type: String,
        default: 'placed'
    },
    paymentType: {
        type: String,
        default: 'COD'
    },
    paymentCreds: {
        razorpay_payment_id: {
            type: String,
            default: ''
        },
        razorpay_order_id: {
            type: String,
            default: ''
        },
        razorpay_signature: {
            type: String,
            default: ''
        }
    }
}, { timestamps: true })

module.exports = new mongoose.model('orders', orderSchema, 'orders');