export function reducer(state, action) {
    if (action.type === 'setReason') {
        state = {
            ...state,
            reason: action.payload.reason
        }
        return state;
    }
    else if (action.type === 'setMessage') {
        const { mType, mData } = action.payload;
        state = {
            ...state,
            message: {
                flash: true,
                type: mType,
                message: mData
            }
        }
        return state;
    }
}