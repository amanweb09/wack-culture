import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    image_primary: '',
    image_sec: [],
    colors: [],
    sizes: [],
    tags: []
}

const adminProductSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setPrimary: (state, action) => {
            state.image_primary = action.payload.image_primary
        },
        setSec: (state, action) => {
            state.image_sec.push(action.payload.image_sec)
        },
        setColor: (state, action) => {
            state.colors.push(action.payload.color)
        },
        setSize: (state, action) => {
            state.sizes.push(action.payload.size)
        },
        setTags: (state, action) => {
            state.tags.push(action.payload.tag)
        }
    }
})

export const { setPrimary, setSec, setColor, setSize, setTags } = adminProductSlice.actions;
export default adminProductSlice.reducer;