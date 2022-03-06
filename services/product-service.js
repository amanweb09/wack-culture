const Products = require('../models/Product');

class ProductService {
    async findProductsByFilter(filter) {
        try {
            return await Products
                .find(filter)
                .sort({ createdAt: '-1' })
                .exec()
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async findProduct(_id) {
        try {
            return await Products
                .findById(_id)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async findProductsByIds(ids) {
        try {
            return await Products
                .find({ _id: { $in: ids } })
                .sort({ createdAt: '-1' })
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async create(product) {
        try {
            return await Products.create(product);
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

module.exports = new ProductService()