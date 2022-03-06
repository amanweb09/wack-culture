import React, { useReducer, useState } from 'react';
import Active from '../components/orders/Active';
import Completed from '../components/orders/Completed';
import { useFetchOrders } from '../hooks/useFetchOrders';
import { reducer } from '../reducers/orderReducer';
import LoadingCard from '../components/shared/LoadingCard'
import { useEffect } from 'react';
import initSocket from '../web_socket/config'
import { useSelector } from 'react-redux';



const Orderstatus = {
    1: Active,
    2: Completed
}

const Orders = () => {
    const orderStates = {
        activeOrders: '',
        completedOrders: '',
        status: 1
    }

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        let socket = initSocket();

        socket.on('connect', () => {
            socket.emit('payment_element_mounted', user._id)

            socket.on('user_order_placed', () => {
                console.log('user order placed')
                window.localStorage.clear()
            })
        })
    })

    const [state, dispatch] = useReducer(reducer, orderStates);
    const [loading, setLoading] = useState(true)

    const OrdersToShow = Orderstatus[state.status]
    useFetchOrders(dispatch, setLoading)

    return (
        <>
            {
                loading ? <LoadingCard text="Till we're loading your orders!" /> :
                    <div className='container mx-auto'>

                        <div className="flex-center mx-auto my-6">
                            <span
                                onClick={() => { dispatch({ type: 'changeOrderStatus', payload: { status: 1 } }) }}
                                style={state.status === 1 ? { color: 'rgb(250, 204, 21)' } : {}}
                                className='font-semibold cursor-pointer hover:text-yellow-400 mr-16'>Orders Active</span>
                            <span
                                onClick={() => { dispatch({ type: 'changeOrderStatus', payload: { status: 2 } }) }}
                                style={state.status === 2 ? { color: 'rgb(250, 204, 21)' } : {}}
                                className='font-semibold cursor-pointer hover:text-yellow-400 '>Orders Completed</span>
                        </div>

                        <OrdersToShow activeOrders={state.activeOrders} completedOrders={state.completedOrders} />
                    </div>
            }
        </>
    );
};

export default Orders;
