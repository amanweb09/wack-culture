const Razorpay = require('razorpay')


module.exports = async function initPayment(amount, orderId) {
    const instance = new Razorpay({
        key_id: process.env.NODE_ENV === 'production' ? process.env.RAZORPAY_KEY_ID_PROD: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.NODE_ENV === 'production' ? process.env.RAZORPAY_KEY_SECRET_PROD : process.env.RAZORPAY_KEY_SECRET 
    });

    const options = {
        amount, 
        currency: "INR",
        receipt: orderId
    }

    return await instance.orders.create(options)
}
