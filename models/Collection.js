const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            unique: false
        }
    ]
})

module.exports = new mongoose.model('collections', collectionSchema, 'collections');