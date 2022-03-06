import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { showPaymentForm } from '../../utils/showPaymentForm';
import { placeOrder } from '../../utils/placeOrder';

const PaymentsModal = ({ address, onClose, setLoading, setLoadingText, setOrderSuccess, setShowPaymentsModal, promoApplied }) => {
    const { user } = useSelector((state) => state.auth)
    const stringedAddress = `${address.address_line_1}, ${address.address_line_2}, ${address.landmark},${address.city}, ${address.state}-${address.pincode}, ${address.country}`

    const cart = window.localStorage.getItem('cart');

    useEffect(() => {
        cart && cart !== 'null' && showPaymentForm(JSON.parse(cart).totalPrice, user.name, user.email, stringedAddress, promoApplied, user._id)
    }, [cart && cart !== 'null' && JSON.parse(cart).totalPrice])

    return (
        <div
            style={{ top: 0, left: 0, bottom: 0, right: 0, background: 'rgb(0,0,0,0.75)', zIndex: '99' }}
            className='w-screen flex-center h-screen fixed'>
            <div
                className='bg-white flex-center flex-col relative'
                style={{ width: '25rem', height: '25rem', borderRadius: 20 }}>

                <span
                    onClick={() => { onClose(false) }}
                    style={{ top: 10, right: 10 }}
                    className='absolute text-4xl cursor-pointer font-bold hover:text-red-500'>
                    &times;
                </span>

                <h1 className='font-bold'>
                    Select a Mode of Payment
                </h1>


                <div className='flex-center mt-8'>
                    <div>
                        <div className='rp_payment_form_container my-4 w-max'>
                        </div>

                        <button
                            onClick={() => { placeOrder(address, setLoading, setLoadingText, setOrderSuccess, setShowPaymentsModal) }}
                            className='bg-black text-white font-bold w-48 h-12 mt-8'>
                            Pay on Delivery
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PaymentsModal;
