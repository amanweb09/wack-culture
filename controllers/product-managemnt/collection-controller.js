const productService = require("../../services/product-service");

const collectionController = () => {
    return {
        async getProductsInCollection(req, res) {
            const { collection, sub_collection } = req.params;

            const products = await productService.findProductsByFilter({
                collection_name: collection,
                sub_collection
            })

            if (products) {
                return res
                    .status(200)
                    .json({ products })
            }

            return res
                .status(200)
                .json({ products: [] })
        },
        async fetchProductWithQuery(req, res) {
            // console.log(req.query)
            try {
                const products = await productService.findProductsByFilter({
                    [req.query.searchIna]: req.query.qa
                })
                return res
                    .status(200)
                    .json({ products })

            } catch (error) {
                
                return res
                    .status(500)
                    .json({ err: "Something went wrong!" })
            }
        }
    }
}

module.exports = collectionController;