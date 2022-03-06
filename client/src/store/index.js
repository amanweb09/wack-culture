import { configureStore } from '@reduxjs/toolkit'
import order from './orderSlice'
import auth from './authSlice'
import adminProduct from './adminProductSlice'
import resetPassword from './resetPasswordSlice'

export const Store = configureStore({
    reducer: {
        order,
        auth,
        adminProduct,
        resetPassword
    }
})