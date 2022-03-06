import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getPaymentDetails } from '../http';
import { useDispatch } from 'react-redux';
import { initializeCart } from '../store/orderSlice';

const PaymentSuccess = () => {

    const { paymentId } = useParams()
    const [details, setDetails] = useState({})

    useEffect(() => {
        async function showPayment() {
            try {
                const { data } = await getPaymentDetails({ paymentId });
                setDetails(data)

            } catch (error) {
                console.log(error);
            }
        }
        showPayment()
    }, [paymentId])

    const dispatch = useDispatch();

    function clearCart() {
        const cart = window.localStorage.getItem('cart');

        window.localStorage.setItem('cart', 'null')

        const canApply = window.localStorage.getItem('canApply');

        if (canApply) {
            window.localStorage.removeItem('canApply')
        }

        dispatch(initializeCart(JSON.parse(cart)))
        document.location.replace('/user/orders')

    }

    return (

        <div
            style={{ background: 'rgb(0,0,0,0.75)', zIndex: '99' }}
            className='w-screen flex-center h-screen fixed inset-0'>

            <div className='w-5/12 bg-white flex-center flex-col px-8 relative rounded-md'>
                <div className='flex-center flex-col p-4'>
                    <img
                        className='w-10 mb-2'
                        src="/images/success.png"
                        alt="success" />
                    <span className='text-3xl font-semibold text-green-500'>Payment Successful</span>
                </div>

                <div className='w-11/12 my-8'>
                    <div className='flex my-2 items-center justify-between'>
                        <span>Payment type</span>
                        <span className="font-semibold">{details.method ? details.method : 'N/A'}</span>
                    </div>
                    <div className='flex my-2 items-center justify-between'>
                        <span>Bank/Wallet/VPA</span>
                        <span className="font-semibold">
                            {details.bank ? details.bank
                                : details.wallet ? details.wallet
                                    : details.vpa ? details.vpa
                                        : 'N/A'}
                        </span>
                    </div>
                    <div className='flex my-2 items-center justify-between'>
                        <span>Amount Paid</span>
                        <span className="font-semibold">{details.amount ? details.amount / 100 : 'N/A'}</span>
                    </div>
                    <div className='flex my-2 items-center justify-between'>
                        <span>Tax</span>
                        <span className="font-semibold">{details.tax ? details.tax / 100 : 'N/A'}</span>
                    </div>
                    <div className='flex my-2 items-center justify-between'>
                        <span>Transaction ID</span>
                        <span className="font-semibold">{details.id ? details.id : 'N/A'}</span>
                    </div>
                   
                </div>

                <button
                    onClick={clearCart}
                    className='bg-blue-500 w-44 h-10 mt-4 mb-8 font-bold text-white'>
                    Close
                </button>
            </div>
        </div>

    );
};

export default PaymentSuccess;
