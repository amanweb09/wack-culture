const orderService = require("../../services/order-service");
const orderValidator = require("../../validators/order-validator");
const initPayment = require('../../config/payments');
const hashingService = require("../../services/hashing-service");
const productService = require('../../services/product-service');
const userService = require('../../services/user-service');
const Order = require("../../models/Order");
const Razorpay = require('razorpay')

const orderController = () => {
    return {
        async fetchOrders(req, res) {
            try {
                const orders = await orderService.fetchOrder(
                    {
                        customerId: req._id,
                        status: { $ne: 'completed' }
                    })

                const completedOrders = await orderService.fetchOrder(
                    {
                        customerId: req._id,
                        status: 'completed'
                    })

                return res
                    .status(200)
                    .json({ orders, completedOrders })
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: 'Something went wrong!' })
            }
        },
        async cancelOrder(req, res) {
            const { orderId, reason } = req.body;

            if (!orderId || !reason) {
                return res
                    .status(422)
                    .json({ err: 'Please fill all the fields!' })
            }

            const orderById = await orderService.fetchOrderById(orderId)

            if (!orderById) {
                return res
                    .status(404)
                    .json({ err: 'No order found with this ID!' })
            }

            const cancellationObj = {
                orderId,
                email: req.email,
                tel: req.tel,
                reason
            }

            const { errorType, status, message } = orderValidator.validateCancellation(cancellationObj)

            if (errorType) {
                return res
                    .status(status)
                    .json({ err: message })
            }

            const response = await orderService.saveCancellationRequest(cancellationObj);

            if (response) {
                return res
                    .status(201)
                    .json({ message: 'Your Cancellation Request is Registered! Our Executive will contact you once the request is validated.' })
            }

            return res
                .status(500)
                .json({ err: 'Something went wrong!' })
        },
        async initializePayment(req, res) {
            const { amount } = req.body;
            try {
                const order = await initPayment(amount);

                return res
                    .status(200)
                    .json({ orderId: order.id, keyId: process.env.NODE_ENV === 'production' ? process.env.RAZORPAY_KEY_ID_PROD : process.env.RAZORPAY_KEY_ID })

                //show the pay button on the client

            } catch (error) {
                console.log(error);
                throw error;
            }

        },
        async capturePayment(req, res) {

            const { razorpay_payment_id, razorpay_order_id, razorpay_signature, address, orderId, cart: _cart, promoApplied, customerId } = req.body;

            //verify signature

            const signatureToBeHashed = `${orderId}|${razorpay_payment_id}`
            const hashedSignature = hashingService.hashSignature(signatureToBeHashed);

            if (hashedSignature == razorpay_signature) {
                //payment is successful

                const cart = JSON.parse(_cart)
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

                let promoValue;
                promoApplied === '' ? promoValue = 'not applied' : promoValue = promoApplied;

                const orderObj = {
                    customerId,
                    products: sortedOrders,
                    totalPrice: cart.totalPrice,
                    address,
                    isPaid: true,
                    promoApplied: promoValue,
                    paymentType: 'razorpay',
                    paymentCreds: {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature
                    }
                }

                const { errorType, status, message } = orderValidator.validateOrder(orderObj)

                if (errorType) {
                    return res
                        .status(status)
                        .json({ err: message })
                }


                const order = new Order(orderObj)
                const user = await userService.findUser({ _id: customerId })
                user.promoApplied = false;

                try {
                    await order.save();
                    await user.save();

                    const eventEmitter = req.app.get('eventEmitter');

                    res.redirect(`http://localhost:3000/order/payment/status/${razorpay_payment_id}`)
                    return eventEmitter.emit('order_placed', customerId);

                } catch (error) {
                    console.log(error);
                    return res
                        .status(500)
                        .json({ err: 'Something went wrong!' })
                }

            }

            else {
                //payment link is tampered
                return res
                    .status(400)
                    .json({ err: 'Order ID mismatched..Payment Link has expired!' })
            }

        },
        async fetchPayment(req, res) {
            const { paymentId } = req.params;
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            });

            try {
                const paymentDetails = await instance.payments.fetch(paymentId)
                const { id, amount, method, email, contact, bank, wallet, vpa, tax, created_at } = paymentDetails
                return res
                    .status(200)
                    .json({ id, amount, method, email, contact, bank, wallet, vpa, tax, created_at })

            } catch (error) {
                return res
                    .status(500)
                    .json({ err: 'Payment server unavailable!' })
            }
        }
    }
}

module.exports = orderController;