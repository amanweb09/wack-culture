
export function reducer(state, action) {
    if (action.type === 'changeOrderStatus') {
        state = {
            ...state,
            status: action.payload.status
        }
        return state     
    }

    else if(action.type === 'setOrders') {
        state = {
            ...state,
            completedOrders: action.payload.completedOrders,
            activeOrders: action.payload.orders
        }

        return state
    }
}