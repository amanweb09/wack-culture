const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: String, required: true, unique: true
    },
    title: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    images: {
        image_primary: {
            type: String, required: true
        },
        image_sec: {
            type: Array
        }
    },
    category: {
        type: String, required: true
    },
    tags: {
        type: Array
    },
    desc: {
        type: String, required: true
    },
    variants: {
        colors: {
            type: Array, required: true
        },
        sizes: {
            type: Array, required: true
        }
    },
    stock: {
        inStock: {
            type: Boolean, default: true
        },
        units: {
            type: Number,
            default: 1
        },
        sku: {
            type: String, default: 'none'
        }
    },
    season: {
        type: String, required: true
    },
    onSale: {
        type: Boolean, default: false
    },
    slashedPrice: {
        type: Number
    },
    collection_name: {
        type: String, required: true,
    },
    sub_collection: {
        type: String
    }
})

const Product = new mongoose.model('products', productSchema, 'products');

module.exports = Product;