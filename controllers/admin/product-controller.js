const { cloudinary } = require('../../config/cloudinary');
const productService = require('../../services/product-service');
const productValidator = require('../../validators/product-validator')

module.exports = function productController() {
    return {
        async saveImage(req, res) {
            const { image } = req.body;

            try {
                const { public_id } = await cloudinary
                    .uploader
                    .upload(image, {
                        upload_preset: `product_${type}`,
                        folder: 'products',
                        public_id: `${id}/${type}`
                    })
                return res
                    .status(201)
                    .json({ public_id })
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: 'Cloud error...' })
            }
        },
        async create(req, res) {
            const { id, title, price,
                image_primary, image_sec,
                category, tags,
                desc,
                colors,
                sizes,
                sku,
                season,
                collection_name, sub_collection
            } = req.body;
            console.log(req.body);

            try {

                if (!id || !title || !price || !image_primary || !category || !desc || !colors || !sizes || !season || !collection_name) {
                    return res
                        .status(422)
                        .json({ err: 'Please fill all the fields!' })
                }

                //find if a product already exists with this id
                const existingProduct = await productService.findProductsByFilter({ id })

                if (existingProduct && existingProduct.length) {
                    return res
                        .status(422)
                        .json({ err: 'Product already exists with this id!' })
                }


                //validate product
                const { errorType, status, message } = productValidator(req.body);

                if (errorType) {
                    return res
                        .status(status)
                        .json({ err: message })
                }

                const productObj = {
                    id, title, price, desc,
                    images: {
                        image_primary, image_sec
                    },
                    category,
                    tags: tags ? tags : [],
                    variants: {
                        colors, sizes
                    },
                    stock: {
                        sku: sku ? sku : 'none'
                    },
                    season,
                    collection_name, sub_collection
                }

                await productService.create(productObj);
                return res
                    .status(201)
                    .json({ message: 'Product created successfully!' })

            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: "Something went wrong!" })
            }
        }
    }
}