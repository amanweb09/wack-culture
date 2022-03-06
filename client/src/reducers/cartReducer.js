export const cartReducer = (state, action) => {
    if(action.type === 'setSuccess') {
        return state = {
            flash: true,
            flashType: 'success',
            message: action.payload.message
        }
    }
    else if(action.type === 'setError') {
        return state = {
            flash: true,
            flashType: 'error',
            message: action.payload.message
        }
    } 
}