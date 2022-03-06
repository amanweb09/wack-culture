import React, { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { removePromoCodeOnCartClear } from '../http'
import { cartReducer } from '../reducers/cartReducer';
import { initializeCart } from '../store/orderSlice'
import { useSelector, useDispatch } from 'react-redux'
import ConfirmationModal from '../components/shared/ConfirmationModal';
import CartItems from '../components/cart/CartItems';
import LoadingBar from 'react-top-loading-bar'
import Address from '../components/cart/Address';
import OrderPlacedModal from '../components/cart/OrderPlacedModal'
import { useApplyPromoCode } from '../hooks/useApplyPromoCode';
import { useRemovePromoCode } from '../hooks/useRemovePromoCode';
import LoginCard from '../components/cart/LoginCard';
import LoadingCard from '../components/shared/LoadingCard'
import './paymentButton.css'
import PaymentsModal from '../components/cart/PaymentsModal';
import { Image } from 'cloudinary-react'

const Cart = () => {
    const navigate = useNavigate();
    const cart = window.localStorage.getItem('cart')
    const { isAuth } = useSelector((state) => state.auth)

    const [progress, setProgress] = useState(100);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [confirmation, setConfirmation] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    const dispatchToStore = useDispatch()

    const [state, dispatch] = useReducer(cartReducer, { flash: false, flashType: '', message: '' })

    const applyPromo = useApplyPromoCode(promoCode, setDiscount, dispatch, setLoading, setLoadingText);
    const removeAppliedPromo = useRemovePromoCode(setLoading, setLoadingText)


    async function onClear() {
        try {
            await removePromoCodeOnCartClear()
            window.localStorage.setItem('cart', 'null')

            const canApply = window.localStorage.getItem('canApply');

            if (canApply) {
                window.localStorage.removeItem('canApply')
            }
            dispatchToStore(initializeCart(JSON.parse(cart)))
            navigate('/')
        }
        catch (error) {

            error.response.data.err ?
                alert(error.response.data.err)
                :
                alert("Oops.. The Cart Couldn't be Cleared")

            setConfirmation(false);
        }
    }

    const [address, setAddress] = useState({
        address_line_1: '',
        address_line_2: '',
        landmark: '',
        city: '',
        pincode: '',
        state: '',
        country: '',
    });

    const [showPaymentsModal, setShowPaymentsModal] = useState(false)
    function popPaymentsModal() {

        if (!isAuth) {
            alert('Please login to continue checkout!')
            return;
        }
        if (address.address_line_1 === '' || address.address_line_2 === '' || address.city === '' || address.state === '' || address.pincode === '' || address.country === '') {
            alert('Please fill in the shipping information')
            return;
        }

        setShowPaymentsModal(true)
    }

    return (
        <>
            {
                cart && cart !== 'null' && Object.keys(JSON.parse(cart).items).length > 0 ?
                    loading ? <LoadingCard text={loadingText} /> :
                        <div className='container mx-auto pl-6 dark:bg-slate-900'>
                            <LoadingBar
                                color='#f11946'
                                progress={progress}
                                onLoaderFinished={() => { setProgress(0) }}
                            />
                            {
                                confirmation &&
                                <ConfirmationModal
                                    type='error'
                                    message='Are You Sure You Want to Clear The Cart?'
                                    onClose={setConfirmation}
                                    onClear={onClear}
                                />
                            }
                            {
                                orderSuccess && <OrderPlacedModal
                                    message='Woohoo! Order Placed Successfully!'
                                    onClose={setConfirmation}
                                    onClear={onClear}
                                />
                            }
                            {
                                showPaymentsModal && <PaymentsModal
                                    onClose={setShowPaymentsModal}
                                    address={address}
                                    setLoading={setLoading}
                                    setLoadingText={setLoadingText}
                                    setOrderSuccess={setOrderSuccess}
                                    setShowPaymentsModal={setShowPaymentsModal}
                                    promoApplied={promoCode} />
                            }

                            <h2
                                style={{ fontFamily: 'Poppins' }}
                                className='text-lg mt-8 sm:mt-0 sm:text-xl font-bold'>
                                Shopping Cart
                            </h2>

                            <div className="flex flex-col-reverse sm:flex-row">
                                <div style={{ flex: '2', minHeight: '70vh' }} className="checkout my-6 pr-6">
                                    <div>
                                        <p>Have a Promo Code?</p>
                                        <div className=''>
                                            <input
                                                className='block mt-6 mb-2 px-2'
                                                style={{ width: '20rem', height: '2.5rem', border: '1px solid #70a73c' }}
                                                type="text"
                                                placeholder='Promo code goes here'
                                                value={promoCode}
                                                onChange={(e) => { setPromoCode(e.target.value) }}
                                            />
                                            <button
                                                style={{ width: '10rem', height: '2rem', borderRadius: 5 }}
                                                className='bg-black text-white font-semibold'
                                                onClick={applyPromo}>
                                                Apply
                                            </button>

                                            {
                                                state.flash ?
                                                    state.flashType === 'error' ?
                                                        <p className='text-red-500 mt-2 font-semibold'>{state.message}</p>
                                                        : state.flashType === 'success' ?
                                                            <p className='text-green-500 mt-2 font-semibold'>{state.message}</p>
                                                            :
                                                            <></>
                                                    :
                                                    <></>
                                            }

                                            {
                                                JSON.parse(cart).isApplied === true
                                                    ?
                                                    <div
                                                        style={{ width: '20rem', height: '5rem', borderRadius: 5, border: '1px solid #dcdcdc' }}
                                                        className='p-2 mt-4'>
                                                        <h2 className='font-semibold'>Promo code applied:</h2>

                                                        <div className='relative'>

                                                            <span className="font-bold">{JSON.parse(cart).promoApplied}</span>
                                                            <span
                                                                onClick={removeAppliedPromo}
                                                                style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}
                                                                className="font-bold absolute cursor-pointer hover:text-red-500 text-2xl">&times;</span>
                                                        </div>
                                                    </div>
                                                    : <></>
                                            }


                                            <LoginCard />

                                            <Address
                                                address={address}
                                                setAddress={setAddress}
                                            />

                                            <button
                                                onClick={() => { popPaymentsModal() }}
                                                className='bg-black text-white font-bold w-48 h-12 mt-8'>
                                                Continue to Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <CartItems
                                        setConfirmation={setConfirmation}
                                    />
                                </div>
                            </div>
                        </div>
                    :
                    <div
                        style={{ height: '80vh' }}
                        className='w-full flex-center flex-col dark:bg-slate-900 '>
                        <Image
                            style={{ opacity: '0.75' }}
                            className='w-60'
                            cloudName='react-ecom'
                            publicId='utilities/empty_cart'
                            alt='empty cart' />

                        <h2 className='font-bold text-2xl text-gray-600 dark:text-gray-50'>Your Cart Looks Empty</h2>
                        <button
                            className='bg-green-primary text-white w-48 h-14 mt-12 font-bold'
                            onClick={() => { navigate('/') }}
                        >Continue Shopping</button>
                    </div>
            }
        </>

    )
}

export default Cart
