const router = require('express').Router();

const statusController = require('../controllers/admin/status-controller');
const loginController = require('../controllers/auth/login-controller');
const signupController = require('../controllers/auth/signup-controller');
const cartController = require('../controllers/order-management/cart-controller');
const orderController = require('../controllers/order-management/order-controller');
const collectionController = require('../controllers/product-managemnt/collection-controller');
const productController = require('../controllers/product-managemnt/products-controller');
const reviewsController = require('../controllers/product-managemnt/reviews-controller');
const blogController = require('../controllers/user-control/blog-controller');
const contactController = require('../controllers/user-control/contact-controller');
const passwordController = require('../controllers/auth/passwordController');
const userController = require('../controllers/user-control/user-controller');

const authenticate = require('../middleware/authenticate');

router.post('/api/signup', signupController().createUser)
router.post('/api/login', loginController().loginUser);
router.get('/api/refresh', loginController().renewAccessToken);
router.get('/api/logout', authenticate, loginController().logout);
router.post('/api/reset-password', passwordController().reset);
router.post('/api/validate-reset-token', passwordController().validateToken);


router.post('/api/send-otp', passwordController().send);
router.post('/api/verify-otp', passwordController().verify);

router.get('/api/products', productController().productList);
router.post('/api/cart-products', cartController().productsInTheCart);
router.get('/api/product/fetch-query-product', collectionController().fetchProductWithQuery);
router.get('/api/product/:_id', productController().viewProduct);
router.get('/api/collections/:collection/:sub_collection', collectionController().getProductsInCollection);

router.post('/api/post-review/:pid', authenticate, reviewsController().post);

router.post('/api/checkout', authenticate, cartController().processCart);
router.get('/api/order/get-status/:_id', authenticate, statusController().fetchStatus);
router.post('/api/cancel-order', authenticate, orderController().cancelOrder);

router.post('/api/checkout/payment', orderController().initializePayment);
router.post('/api/checkout/capture-payment', orderController().capturePayment);
router.post('/api/checkout/payment/fetch-order/:paymentId', orderController().fetchPayment);

router.post('/api/apply-promo', authenticate, cartController().applyPromo);
router.post('/api/remove-promo', authenticate, cartController().removePromo);
router.get('/api/remove-promo-on-cart-clear', authenticate, cartController().removePromoOnCartClear);

router.get('/api/profile', authenticate, userController().viewProfile);
router.post('/api/orders', authenticate, orderController().fetchOrders);
router.post('/api/contact', authenticate, contactController().contact);

router.get('/api/view-blogs', blogController().showAllBlogs);
router.get('/api/view-blogs/:slug', blogController().showBlog);


module.exports = router;