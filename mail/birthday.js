const smtpConfig = require('./smtp');

class handleBirthdays {
    async sendEmail({ email, html }) {
        try {
            await smtpConfig({
                from: 'admin@lazyturtle.com',
                to: email,
                subject: "Test email",
                html
            })
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new handleBirthdays();