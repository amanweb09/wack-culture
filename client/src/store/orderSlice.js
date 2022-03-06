import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: null,
    address: '',
    isPaid: '',
    promoApplied: '',
    paymentType: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

        addToCart: (state, action) => {

            let _cart = window.localStorage.getItem('cart');
            state.cart = JSON.parse(_cart)

            if (!state.cart) {
                state.cart = {
                    items: {
                        [action.payload._id]: { qty: 1, size: action.payload.size, color: action.payload.color }
                    },
                    totalItems: 1,
                    totalPrice: action.payload.price
                }
            }

            else {
                if (state.cart.items) {
                    if (!state.cart.items[action.payload._id]) {
                        state.cart.items = {
                            ...state.cart.items,
                            [action.payload._id]: { qty: 1, size: action.payload.size, color: action.payload.color }
                        }

                        state.cart.totalPrice += action.payload.price
                        state.cart.totalItems += 1
                    }

                    else {
                        state.cart.items[action.payload._id].qty += 1
                        state.cart.totalPrice += action.payload.price;
                        state.cart.totalItems += 1;
                    }
                }
                else {
                    state.cart.items = {}

                    if (!state.cart.items[action.payload._id]) {
                        state.cart.items = {
                            ...state.cart.items,
                            [action.payload._id]: { qty: 1, size: action.payload.color, color: action.payload.color }
                        }

                        state.cart.totalPrice += action.payload.price
                        state.cart.totalItems += 1
                    }

                    else {
                        state.cart.items[action.payload._id].qty += 1
                        state.cart.totalPrice += action.payload.price;
                        state.cart.totalItems += 1;
                    }
                }

            }

            window.localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        initializeCart: (state, action) => {
            const { cart } = action.payload;
            state.cart = cart
        }
    }

})

export const { addToCart, initializeCart } = orderSlice.actions

export default orderSlice.reducer