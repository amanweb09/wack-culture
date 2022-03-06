function resetReducer(state, action) {
    switch (action.type) {
        case 'setTel':
            state = {
                ...state,
                tel: action.payload.tel
            }
            break;

        default:
            break;
    }
}

export default resetReducer