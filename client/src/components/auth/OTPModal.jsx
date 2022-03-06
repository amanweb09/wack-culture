import React, { useState } from 'react'
import Styles from '../../pages/pages.module.css'
import { useSelector } from 'react-redux'
import { verifyOtp } from '../../http'
import { useNavigate } from 'react-router-dom'
import LoadingCard from '../shared/LoadingCard'
import { Image } from 'cloudinary-react'

const OTPModal = ({ onClose }) => {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)

    const { hash, tel } = useSelector((state) => state.resetPassword)
    const navigate = useNavigate()

    async function sendForVerification(e) {
        e.preventDefault();
        setLoading(true)

        try {
            const { data } = await verifyOtp({ hash, tel, OTP: otp });
            const token = data.token;
            setLoading(false)

            if (token) {
                navigate(`/reset-password/${token}`)
            }

        } catch (error) {
            console.log(error);
            setLoading(false)

            error.response.data.err ?
                window.alert(error.response.data.err)
                :
                window.alert('Something went wrong!')
        }
    }

    return (
        <div
            style={{ top: 0, left: 0, bottom: 0, right: 0, background: 'rgb(0,0,0,0.75)', zIndex: '99' }}
            className='w-screen flex-center h-screen fixed'>
            {
                loading && <LoadingCard text="Till we're verifying your OTP!" />
            }
            <div
                className='bg-white flex-center flex-col relative rounded-lg sm:w-96 sm:h-96 w-80 h-80'>

                <span
                    onClick={() => { onClose(false) }}
                    style={{ top: 10, right: 10 }}
                    className='absolute text-4xl cursor-pointer font-bold hover:text-red-500'>
                    &times;
                </span>

                <Image
                    style={{ opacity: '0.75' }}
                    className='sm:w-44 w-28'
                    cloudName='react-ecom'
                    publicId='utilities/otp_sent'
                    alt='otp sent' />

                <h1 className='mt-4 font-semibold sm:text-md text-base'>Enter the OTP sent to your mobile</h1>

                <input
                    style={{ borderBottom: '2px solid #000' }}
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value) }}
                    className={`${Styles.phone_number_input} h-10 w-48 mt-6 text-center font-bold text-lg`}
                    placeholder='OTP here'
                    type="number" />

                <div className='flex-center mt-8'>
                    <button
                        onClick={sendForVerification}
                        type='submit'
                        className='bg-black-500 text-lg font-bold text-white bg-black w-10 h-10 rounded-full mr-6'>
                        &#8594;
                    </button>
                </div>
            </div>

        </div>
    )
}

export default OTPModal
