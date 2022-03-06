const Birthday = require('../../mail/birthday')
const userService = require("../../services/user-service")
const birthdayTemplate = require("../../mail/templates/birthday-template");
const BirthdayAddress = require('../../models/BirthdayAddress');

module.exports = function birthdayController() {
    return {
        async detectBirthday(req, res) {

            const { name, birthday } = await userService.findUser({ _id: req._id });
            const [date, month, year] = birthday.split('-');

            const todaysDate = new Date().getDate()
            const thisMonth = new Date().getMonth() + 1;

            if (parseInt(date) === todaysDate && parseInt(month) === thisMonth) {
                //send birthday email
                await Birthday.sendEmail({
                    email: process.env.NODE_ENV === 'production' ? req.email : 'amankhanna224466@gmail.com',
                    html: birthdayTemplate({
                        name
                    })
                })

                return res
                    .status(200)
                    .json({ message: 'Birthday mail sent!' })
            }

            return res
                .status(400)
                .json({ err: 'not your birthday!' })
        },
        async checkBirthdayValidity(req, res) {
            const { birthday } = await userService.findUser({ accessToken: req.cookies.accessToken })

            const [date, month] = birthday.split('-');

            const todaysDate = new Date().getDate()
            const thisMonth = new Date().getMonth() + 1;

            if (parseInt(date) === todaysDate && parseInt(month) === thisMonth) {
                return res
                    .status(200)
                    .json({ message: 'grant access' })
            }

            return res
                .status(401)
                .json({ message: "it's not your birthday" })
        },
        async saveDeliveryAddress(req, res) {
            const { address } = req.body;

            if (!address) {
                return res
                    .status(422)
                    .json({ err: 'Please fill in a valid address!' })
            }

            const deliveryAddress =
                new BirthdayAddress({
                    address, userId: req._id, isDelivered: false
                })

            try {
                await deliveryAddress.save()
                return res
                    .status(201)
                    .json({ message: "Woohooo... Address Saved!" })
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: "Something went wrong!" })
            }
        }
    }
}