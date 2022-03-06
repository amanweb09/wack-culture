import React, { useState } from 'react';
import { sendOtp } from '../http';
import Styles from './pages.module.css'
import { useDispatch } from 'react-redux'
import { setHash } from '../store/resetPasswordSlice';
import OTPModal from '../components/auth/OTPModal'
import { Image } from 'cloudinary-react'

const ResetPassword = () => {

    const dispatchToStore = useDispatch();

    const [tel, setTel] = useState('');
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(false);
    const [flashError, setFlashError] = useState({ status: false, message: '' });

    async function getOtp(e) {
        e.preventDefault();

        setLoading(true)
        try {
            const { data } = await sendOtp({ tel });

            dispatchToStore(setHash({ hash: data.hash, tel: data.tel }));
            setTel('');

            setLoading(false)
            setOtp(true)

        } catch (error) {
            console.log(error);
            setLoading(false)
            setFlashError({ status: true, message: error.response.data.err ? error.response.data.err : "Something went wrong!" })
        }
    }

    return (

        <div className='container mx-auto flex-center flex-col-reverse sm:flex-row'>
            {
                otp ? <OTPModal onClose={setOtp} /> : <></>
            }
            <div className='flex-1 pl-8'>
                <h2 className='sm:text-4xl text-2xl sm:mb-10 mb-6'>
                    Forgot Password?
                </h2>

                <p className='text-gray-600 mb-6 sm:text-base text-sm'>
                    You need not worry as we've got you covered!
                </p>

                <p className='text-gray-600 mb-10 font-semibold sm:text-base text-sm'>
                    Enter your phone number associated with the account
                </p>

                {
                    flashError && <p className='font-semibold sm:text-base text-sm mb-4 text-red-500'>{flashError.message}</p>
                }

                <div className="flex items-center">
                    <img
                        className='sm:w-8 w-6'
                        src="/images/phone.png"
                        alt="phone" />
                    <input
                        style={{ borderBottom: '2px solid #000' }}
                        name='tel'
                        value={tel}
                        onChange={(e) => { setTel(e.target.value) }}
                        className={`${Styles.phone_number_input} h-10 w-48 ml-4`}
                        placeholder='Phone number here'
                        type="number" />
                </div>

                <button
                    disabled={loading ? true : false}
                    onClick={getOtp}
                    className='w-44 h-10 bg-green-primary flex-center mt-12'
                    type='submit'>
                    {
                        loading ?
                            <div className={`${Styles.otp_spinner} w-6 h-6 rounded-full`}></div>
                            :
                            <span className='font-bold text-white'>Get OTP</span>
                    }
                </button>
            </div>

            <div className='flex-1'>
                <Image
                    style={{ opacity: '0.75' }}
                    className='sm:w-10/12 w-8/12 mx-auto sm:mx-0 my-4 sm:my-0'
                    cloudName='react-ecom'
                    publicId='utilities/forgot_password'
                    alt='forgot password' />
            </div>
        </div>

    );
};

export default ResetPassword;
