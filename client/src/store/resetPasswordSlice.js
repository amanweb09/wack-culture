import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    hash: '',
    tel: ''
}

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        setHash: (state, action) => {
            const { hash, tel } = action.payload;

            state.hash = hash;
            state.tel = tel;
        }
    }
})

export const { setHash } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;