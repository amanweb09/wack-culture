const Joi = require('joi');

module.exports = function productValidator(doc) {
    const joiSchema = Joi.object({
        id: Joi
            .string()
            .min(2)
            .required(),
        title: Joi
            .string()
            .min(2)
            .required(),
        price: Joi
            .number()
            .min(2)
            .required(),
        image_primary: Joi
            .string()
            .min(2)
            .required(),
        image_sec: Joi
            .array()
            .min(0),
        category: Joi
            .string()
            .min(2)
            .required(),
        tags: Joi
            .array(),
        desc: Joi
            .string()
            .min(10)
            .required(),
        colors: Joi
            .array()
            .min(1)
            .required(),
        sizes: Joi
            .array()
            .min(1)
            .required(),
        sku: Joi
            .string()
            .min(0),
        season: Joi
            .string()
            .required(),
        collection_name: Joi
            .string()
            .required(),
        sub_collection: Joi
            .string()
            .min(0)
    })

    const validateRequest = joiSchema.validate(doc)

    if (validateRequest.error) {
        const errorType = validateRequest.error.name;
        const errorMessage = validateRequest.error.message;

        return {
            errorType,
            status: 422,
            message: errorMessage
        }
    }

    return {
        errorType: null,
        status: 200,
        message: 'success'
    }
}
