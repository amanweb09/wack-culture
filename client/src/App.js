import React, { useEffect, useState } from 'react'
import './build.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/shared/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useSelector, useDispatch } from 'react-redux'
import { initializeCart } from './store/orderSlice'
import { setIsAuth } from './store/authSlice'
import { getProfile } from './http'
// import Profile from './pages/Profile'
import Cart from './pages/Cart'
import ProductPage from './pages/ProductPage'
import CollectionProducts from './pages/Collection_products'
// import Orders from './pages/Orders'
// import Cancellation from './pages/Cancellation'
// import Contact from './pages/Contact'
import LoadingCard from './components/shared/LoadingCard'
// import OrderStatus from './pages/OrderStatus'
// import AdminOrders from './pages/admin_pages/AdminOrders'
// import Error404 from './pages/404'
// import PaymentSuccess from './pages/PaymentSuccess'
// import CreateProduct from './pages/admin_pages/CreateProduct'
// import ForgotPassword from './pages/ForgotPassword'
// import ResetPassword from './pages/ResetPassword'
// import BirthdayAddress from './pages/BirthdayAddress'
// import Wishlist from './pages/Wishlist'
import NewArrivals from './pages/NewArrivals'
import QueryProducts from './pages/QueryProducts'
// import About from './pages/About'
import Loadable from 'react-loadable'

const Cancellation = Loadable({
    loader: () => import('./pages/Cancellation'),
    loading: () => <LoadingCard />
})

const Orders = Loadable({
    loader: () => import('./pages/Orders'),
    loading: () => <LoadingCard />
})

const Contact = Loadable({
    loader: () => import('./pages/Contact'),
    loading: () => <LoadingCard />
})

const Profile = Loadable({
    loader: () => import('./pages/Profile'),
    loading: () => <LoadingCard />
})

const OrderStatus = Loadable({
    loader: () => import('./pages/OrderStatus'),
    loading: () => <LoadingCard />
})

const AdminOrders = Loadable({
    loader: () => import('./pages/admin_pages/AdminOrders'),
    loading: () => <LoadingCard />
})
const Error404 = Loadable({
    loader: () => import('./pages/404'),
    loading: () => <LoadingCard />
})
const PaymentSuccess = Loadable({
    loader: () => import('./pages/PaymentSuccess'),
    loading: () => <LoadingCard />
})
const CreateProduct = Loadable({
    loader: () => import('./pages/admin_pages/CreateProduct'),
    loading: () => <LoadingCard />
})
const ForgotPassword = Loadable({
    loader: () => import('./pages/ForgotPassword'),
    loading: () => <LoadingCard />
})
const ResetPassword = Loadable({
    loader: () => import('./pages/ResetPassword'),
    loading: () => <LoadingCard />
})
const BirthdayAddress = Loadable({
    loader: () => import('./pages/BirthdayAddress'),
    loading: () => <LoadingCard />
})
const Wishlist = Loadable({
    loader: () => import('./pages/Wishlist'),
    loading: () => <LoadingCard />
})


const App = () => {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const cart = window.localStorage.getItem('cart');

    useEffect(() => {
        function initCart() {
            if (cart) {
                dispatch(initializeCart({ cart: JSON.parse(cart) }))
            }
        }
        async function requestProfile() {
            try {
                const { data } = await getProfile()
                dispatch(setIsAuth({ user: data.user, isAuth: true }))
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        function initializeTheme() {
            const theme = window.localStorage.getItem('theme');

            if (theme === 'light' || !theme /* && window.matchMedia('(prefers-color-scheme: light)').matches */) {
                return;
            }
            else {
                document.documentElement.classList.add('dark')
                return;
            }
        }
        requestProfile()
        initCart()
        initializeTheme()
    }, [])

    return loading ? <LoadingCard /> : (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                {/* <Route path='/about' element={<About />} /> */}
                <Route path='/login' element={<Login />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/profile' element={
                    <AuthRoute>
                        <Profile />
                    </AuthRoute>
                } />
                <Route path='/cart' element={<Cart />} />
                <Route path='/new-arrivals' element={<NewArrivals />} />
                <Route exact path='/product/:_id' element={<ProductPage />} />
                <Route exact path='/collection' element={<QueryProducts />} />
                <Route exact path='/collections/:collection/:sub_collection' element={<CollectionProducts />} />
                <Route exact path='/user/orders' element={
                    <AuthRoute>
                        <Orders />
                    </AuthRoute>
                } />
                <Route exact path='/order/cancellation/:_id' element={
                    <AuthRoute>
                        <Cancellation />
                    </AuthRoute>
                } />
                <Route path='/contact' element={
                    <AuthRoute>
                        <Contact />
                    </AuthRoute>
                } />
                <Route exact path='/customer/status/:_id' element={
                    <AuthRoute>
                        <OrderStatus />
                    </AuthRoute>
                } />
                <Route exact path='/order/payment/status/:paymentId' element={
                    <AuthRoute>
                        <PaymentSuccess />
                    </AuthRoute>
                } />
                <Route exact path='/user/birthday-specials/address' element={
                    <AuthRoute>
                        <BirthdayAddress />
                    </AuthRoute>
                } />
                <Route exact path='/admin/orders' element={
                    <AdminRoute>
                        <AdminOrders />
                    </AdminRoute>
                } />
                <Route exact path='/admin/create-product' element={
                    <AdminRoute>
                        <CreateProduct />
                    </AdminRoute>
                } />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />


                <Route path='*' element={<Error404 />} />
            </Routes>
        </Router>
    )
}

const AuthRoute = ({ children }) => {
    const { isAuth } = useSelector((state) => state.auth)
    const location = useLocation()

    if (isAuth === true) {
        return children
    }
    else {
        return <Navigate to='/login' state={{ from: location }} />
    }
}

const AdminRoute = ({ children }) => {
    const { isAuth, user } = useSelector((state) => state.auth)

    if (isAuth === true && user.role === 'admin') {
        return children
    }
    else {
        return <Error404 />
    }
}

export default App
