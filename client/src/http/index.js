import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

export const getProducts = async () => { return await instance.get('/api/products') }
export const getProductById = async (_id) => { return await instance.get(`/api/product/${_id}`) }
export const getProductsInCollection = async (collection, sub_collection) => { return await instance.get(`/api/collections/${collection}/${sub_collection}`) }
export const getProductsByQuery = async ({ qa, searchIna }) => { return await instance.get(`/api/product/fetch-query-product?qa=${qa}&searchIna=${searchIna}`) }

export const signupUser = async (data) => { return await instance.post('/api/signup', data) }
export const loginUser = async (data) => { return await instance.post('/api/login', data) }
export const logout = async () => { return await instance.get('/api/logout') }
export const getProfile = async () => { return await instance.get('/api/profile') }

export const detectBirthday = async () => { return await instance.post('/api/detect-birthday') }
export const birthdayIsTokenValid = async () => { return await instance.get('/api/birthday/isTokenValid') }
export const saveGiftDeliveryAddress = async (data) => { return await instance.post('/api/birthday/save-address', data) }

export const createEmailContact = async (data) => { return await instance.post('/api/marketing/create-contact', data) }

export const sendOtp = async (data) => { return await instance.post('/api/send-otp', data) }
export const verifyOtp = async (data) => { return await instance.post('/api/verify-otp', data) }
export const resetPassword = async (data) => { return await instance.post('/api/reset-password', data) }
export const validatePasswordToken = async (data) => { return await instance.post('/api/validate-reset-token', data) }

export const fetchProductsInCart = async (data) => { return await instance.post('/api/cart-products', data) }
export const applyPromoCode = async (data) => { return await instance.post('/api/apply-promo', data) }
export const removePromoCode = async (data) => { return await instance.post('/api/remove-promo', data) }
export const removePromoCodeOnCartClear = async () => { return await instance.get('/api/remove-promo-on-cart-clear') }

export const checkout = async (data) => { return await instance.post('/api/checkout', data) }
export const fetchStatus = async (_id) => { return await instance.get(`/api/order/get-status/${_id}`) }
export const fetchOrders = async () => { return await instance.post('/api/orders') }
export const cancelOrder = async (data) => { return await instance.post('/api/cancel-order', data) }

export const initPayment = async (data) => { return await instance.post('/api/checkout/payment', data) }
export const getPaymentDetails = async (data) => { return await instance.post(`/api/checkout/payment/fetch-order/${data.paymentId}`, data) };

export const contact = async (data) => { return await instance.post('/api/contact', data) }

export const admin__orders = async () => { return await instance.get('/api/admin/orders') }
export const admin__change__status = async (data) => { return await instance.post('/api/admin/orders/change-status', data) }
export const admin__uploadImage = async (data) => { return await instance.post('/api/admin/save-image', data) }
export const admin__createProduct = async (data) => { return await instance.post('/api/admin/create-product', data) }

instance
    .interceptors
    .response
    .use((config) => {
        return config;      //if request is successful
    },
        async (err) => {          //if request in unsuccessful
            const originalRequestDetails = err.config;

            if (err.response.status === 401 && err.response.data.expErr && originalRequestDetails && !originalRequestDetails.hasBeenRetried) {
                originalRequestDetails.hasBeenRetried = true;

                try {
                    await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/refresh`, {
                        withCredentials: true
                    })

                    return instance.request(originalRequestDetails)

                } catch (error) {
                    console.log(error.message);
                }
            }

            throw err;
        })


export default instance;