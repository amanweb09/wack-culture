const crypto = require('crypto')

class HashingService {
    hashPassword(password) {
       return crypto
            .createHash('sha256', process.env.HASH_SECRET)
            .update(password)
            .digest('hex')
    }
    hashSignature(signature) {
       return crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(signature)
            .digest('hex')
    }
    hashOTP(otp) {
       return crypto
            .createHmac('sha256', process.env.OTP_HASH)
            .update(otp)
            .digest('hex')
    }
}

module.exports = new HashingService()