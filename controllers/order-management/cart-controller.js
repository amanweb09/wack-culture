const Order = require("../../models/Order");
const User = require("../../models/User");
const orderService = require("../../services/order-service");
const userService = require("../../services/user-service");
const productService = require("../../services/product-service");
const orderValidator = require("../../validators/order-validator");
const cartProductsDto = require('../../dtos/cart-products-dto')

const cartController = () => {
    return {
        async productsInTheCart(req, res) {
            const { ids } = req.body;

            const products = await productService.findProductsByIds(ids)

            if (products) {
                let productsInCart = [];

                products.forEach((product) => {
                    const cartDto = new cartProductsDto(product);
                    productsInCart.push(cartDto)
                })

                return res
                    .status(200)
                    .json({ products: productsInCart })
            }
            return res
                .status(500)
                .json({ err: 'Something went wrong!' })
        },
        async processCart(req, res) {
            //CART STRUCTURE
            // cart: {
            // items: {
            //     'PRODUCT1_ID': '{PRODUCT1_QTY, COLOR, SIZE}',
            //     'PRODUCT2_ID': '{PRODUCT1_QTY, COLOR, SIZE}',
            //     'PRODUCT3_ID': '{PRODUCT1_QTY, COLOR, SIZE}'
            // },
            // totalItems: 5,
            // totalPrice: 1200
            // }

            const { cart, address, isPaid, promoApplied, paymentType } = req.body;

            const products = Object.keys(cart.items)
            const productsInCart = await productService
                .findProductsByIds(products);

            let orderedProducts = [];
            productsInCart
                .forEach((product) => {
                    product = {
                        ...product,
                        qty: cart.items[product._id].qty,
                        color: cart.items[product._id].color,
                        size: cart.items[product._id].size
                    }

                    orderedProducts.push(product)
                })
            let sortedOrders = []
            orderedProducts
                .forEach((product) => {
                    sortedOrders.push({
                        product: product._doc,
                        qty: product.qty,
                        color: product.color,
                        size: product.size
                    })
                })

            const orderObj = {
                customerId: req._id,
                products: sortedOrders,
                totalPrice: cart.totalPrice,
                address, isPaid, promoApplied, paymentType
            }

            const { errorType, status, message } = orderValidator.validateOrder(orderObj)

            if (errorType) {
                return res
                    .status(status)
                    .json({ err: message })
            }


            const order = new Order(orderObj)
            const user = await userService.findUser({ _id: req._id })
            user.promoApplied = false;

            try {
                await order.save();
                await user.save();

                return res
                    .status(201)
                    .json({ message: 'Order Placed Successfully!' })

            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: 'Something went wrong!' })
            }
        },
        async applyPromo(req, res) {
            const { code, cartAmount } = req.body;

            if (!code || !cartAmount) {
                return res
                    .status(422)
                    .json({ err: "All fields are required!" })
            }

            const user = await userService.findUser({ _id: req._id });

            if (!user) {
                return res
                    .status(404)
                    .json({ err: 'no user found with this token!' })
            }
            //find code in db

            if (!user.promoApplied) {
                const promo = await orderService.findPromoCode(code);

                //calculate discount and send to the client
                if (promo) {

                    if (promo.discountPer && !promo.discountAmt) {
                        const newAmt = Math.round(cartAmount - cartAmount * promo.discountPer / 100);
                        user.promoApplied = true;

                        try {
                            await User.save();
                            return res
                                .status(200)
                                .json({
                                    newAmt,
                                    discountType: "per",
                                    isApplied: true,
                                    canApply: false,
                                    discount: Math.round(cartAmount * promo.discountPer / 100)
                                })
                        } catch (error) {
                            console.log(error);
                            return res
                                .status(500)
                                .json({ err: 'Something went wrong!' })
                        }
                    }
                    else if (promo.discountAmt && !promo.discountPer) {
                        const newAmt = Math
                            .round(cartAmount - promo.discountAmt);

                        user.promoApplied = true;

                        try {
                            await user.save();
                            return res
                                .status(200)
                                .json({
                                    newAmt,
                                    discountType: "amt",
                                    isApplied: true,
                                    canApply: false,
                                    discount: promo.discountAmt
                                })
                        } catch (error) {
                            console.log(error);
                            return res
                                .status(500)
                                .json({ err: 'Something went wrong!' })
                        }
                    }
                }

                return res.status(404).json({ err: 'Promocode not found!' })
            }
            return res
                .status(400)
                .json({ err: 'Promo code already applied!' })

        },
        async removePromo(req, res) {
            const { cartAmount, isApplied, codeApplied, discountType } = req.body;

            if (!cartAmount || !isApplied || !codeApplied || !discountType) {
                return res
                    .status(422)
                    .json({ err: "All fields are required!" })
            }


            const user = await userService.findUser({ _id: req._id });

            if (!user) {
                return res
                    .status(404)
                    .json({ err: 'no user found with this token!' })
            }

            if (user.promoApplied) {
                const promo = await orderService.findPromoCode(codeApplied);

                if (promo && discountType === 'per') {
                    const discount = promo.discountPer / 100;
                    const den = 1 - discount

                    const newAmt = Math
                        .round(cartAmount / den)

                    user.promoApplied = false;
                    try {
                        await user.save();
                        return res
                            .status(200)
                            .json({
                                newAmt,
                                canApply: true
                            })
                    } catch (error) {
                        console.log(error);
                        return res
                            .status(500)
                            .json({ err: 'Something went wrong!' })
                    }
                }
                else if (promo && discountType === 'amt') {
                    const newAmt = Math.round(cartAmount + promo.discountAmt);

                    user.promoApplied = false;
                    try {
                        await user.save();
                        return res
                            .status(200)
                            .json({
                                newAmt,
                                canApply: true
                            })
                    } catch (error) {
                        console.log(error);
                        return res
                            .status(500)
                            .json({ err: 'Something went wrong!' })
                    }
                }

                return res
                    .status(404)
                    .json({ err: 'Promocode not found!' })
            }

            return res
                .status(400)
                .json({ err: 'No promo code is applied!' })
        },
        async removePromoOnCartClear(req, res) {
            try {
                const user = await userService.findUser({ _id: req._id })
                user.promoApplied = false;
                await user.save()
                res
                    .status(200)
                    .json({ message: 'promo code removed' })

            } catch (error) {
                res
                    .status(500)
                    .json({ err: 'Database unavailable...' })
            }

        }
    }
}

module.exports = cartController