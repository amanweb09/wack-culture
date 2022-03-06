const Joi = require('joi')
const createContactConfig = require('../../mail/marketing_smtp')

module.exports = function emailController() {
    return {
        createContact(req, res) {
            const { email } = req.body;

            if (!email) {
                return res
                    .status(422)
                    .json({ err: "Email is required!" })
            }

            const emailSchema = Joi
                .string()
                .min(2)
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ['com', 'net', 'in']
                    }
                }).
                required()

            const validateEmail = emailSchema.validate(email);
            if (validateEmail.error) {
                return res
                    .status(422)
                    .json({ err: "Please fill in a valid email!" })
            }

            createContactConfig(email);

            return res
                .status(201)
                .json({ message: "Email added to the mailing list!" })
        }
    }
}