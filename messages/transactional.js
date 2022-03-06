const axios = require('axios');
const { SMS_API_KEY } = process.env;

async function sendOTP(otp, tel) {
    try {
        const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${SMS_API_KEY}&variables_values=${otp}&route=otp&numbers=${tel}`

        return await axios.default.get(url, {
            headers: {
                "cache-control": "no-cache"
            }
        })

    } catch (error) {
        console.log(error);
        throw error
    }

}

module.exports = sendOTP;
