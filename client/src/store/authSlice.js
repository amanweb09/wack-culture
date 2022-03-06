import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            const { user, isAuth } = action.payload;

            state.user = user;
            state.isAuth = isAuth;
        }
    }
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer