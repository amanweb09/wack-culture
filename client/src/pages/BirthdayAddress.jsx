import React, { useEffect, useState } from 'react';
import { birthdayIsTokenValid, saveGiftDeliveryAddress } from '../http';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti-canvas'
import Styles from './pages.module.css'
import Notification from '../components/shared/Notification'

const BirthdayAddress = () => {
    const navigate = useNavigate()
    const [showConfetti, setShowConfetti] = useState(false)
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        (async () => {
            try {
                await birthdayIsTokenValid()
                setShowConfetti(true)
            } catch (error) {
                console.log(error);
                navigate('/')
            }
        })()
    }, [])

    async function handleSubmit() {
        if (address === '') {
            alert('Please fill in a valid address!')
            return;
        }

        setLoading(true)
        try {
            const { data } = await saveGiftDeliveryAddress({ address })
            setNotify({
                show: true,
                type: 'success',
                message: data.message
            })
            setLoading(false)

            setTimeout(() => {
                setAddress("")
                navigate('/')
            }, 1500)

        } catch (error) {
            console.log(error);
            setNotify({
                show: true,
                type: 'error',
                message: error.response.data.err ? error.response.data.err : "Address couldn't be saved ;("
            })
            setLoading(false)
        }
    }

    return (
        <>
            {
                showConfetti &&
                <div
                    className={`${Styles.birthday_confetti} absolute top-0 left-0 w-full`}>
                    <Confetti width={1000} height={500} />
                </div>
            }
            <div className='container mx-auto'>
                <img
                    className='sm:w-40 w-28 block mx-auto mt-8 mb-4'
                    src="/images/cake-big.png"
                    alt="cake" />

                {
                    notify.show ?
                        notify.type === 'success' ?
                            <div className='sm:w-1/2 w-10/12 block mx-auto mt-6'>
                                <Notification type='success' message={notify.message} />
                            </div>
                            :
                            notify.type === 'error' ?
                                <div className='sm:w-1/2 w-10/12 block mx-auto mt-6'>
                                    <Notification type='error' message={notify.message} />
                                </div>
                                : <></> : <></>
                }

                <label
                    className='flex-center mx-auto mt-20 mb-2 text-center font-bold text-lg'
                    htmlFor="address">
                    Fill in your complete address
                    <span className='text-red-500'>*</span>
                </label>
                <input
                    onChange={(e) => { setAddress(e.target.value) }}
                    className='px-2 font-bold rounded-sm sm:w-5/6 w-11/12 h-10 block border-2 border-solid border-green-600 mx-auto'
                    placeholder='Address here ...'
                    type="text" />

                <button
                    disabled={loading ? true : false}
                    onClick={handleSubmit}
                    className='w-48 h-12 bg-green-primary text-white font-bold block mx-auto mt-8'>
                    {
                        loading ?
                            <div className={`${Styles.otp_spinner} w-8 h-8 mx-auto block rounded-full`}></div>
                            :
                            <>Submit</>
                    }
                </button>
            </div>
        </>
    );
};

export default BirthdayAddress;
