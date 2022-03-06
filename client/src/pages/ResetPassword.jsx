import React, { useState } from 'react';
import Styles from './pages.module.css'
import { resetPassword } from '../http'
import { useParams } from 'react-router-dom'
import Notification from '../components/shared/Notification';
import { useValidatePasswordToken } from '../hooks/useValidateToken';
import { Image } from 'cloudinary-react'

const ResetPassword = () => {
    const { token } = useParams()

    const isValid = useValidatePasswordToken(token);

    const [loading, setLoading] = useState(false);
    const [creds, setCreds] = useState({
        password: '',
        confirmPassword: ''
    })

    const [notify, setNotify] = useState({
        status: false,
        type: '',
        message: ''
    });

    function setInfo(name, value) {
        setCreds({
            ...creds,
            [name]: value
        })
    }

    async function handleReset(e) {
        e.preventDefault();

        if (creds.password === '' || creds.confirmPassword === '') {
            window.alert('All fields are required!')
            return;
        }

        if (creds.password !== creds.confirmPassword) {
            window.alert('Password and confirm password do not match!')
            return;
        }

        setLoading(true)

        try {
            const { data } = await resetPassword({
                newPassword: creds.password, confirmPassword: creds.confirmPassword, token
            })
            window.location.replace('/login');

            setNotify({
                status: true,
                message: data.message,
                type: 'success'
            })
            setCreds({
                password: '',
                confirmPassword: ''
            })

            setLoading(false)

            setTimeout(() => {
                window.location.href = `${process.env.REACT_APP_CLIENT_ADDRESS}/login`
            }, 1500)

        } catch (error) {
            console.log(error.response.data.err);
            setNotify({
                status: true,
                message: error.response.data.err ? error.response.data.err : "Something went wrong!",
                type: 'error'
            })
            setLoading(false)

        }
    }

    return (
        <>
            {
                isValid ?
                    <div className='container mx-auto flex-center sm:flex-row flex-col'>
                        <div className='flex-1'>
                            <Image
                                className='sm:w-10/12 w-8/12 mt-8 sm:mt-0 opacity-75 mx-auto sm:mx-0'
                                cloudName='react-ecom'
                                publicId='utilities/reset_password'
                                alt='empty cart' />
                        </div>

                        <div className='flex-1 pl-8'>
                            <div className='sm:w-9/12 w-10/12 mb-4'>
                                {notify.status ? <Notification type={notify.type} message={notify.message} /> : <></>}
                            </div>

                            <h2 className='sm:text-4xl text-2xl sm:mb-10 mb-8'>
                                Reset Password
                            </h2>

                            <p className='text-gray-600 mb-10 font-semibold sm:text-base text-sm pr-4 sm:pr-0'>
                                Enter the new password and make sure to remember it this time!
                            </p>


                            <input
                                style={{ borderBottom: '2px solid #000' }}
                                name='password'
                                value={creds.password}
                                onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                                className={`${Styles.phone_number_input} h-10 block w-48`}
                                placeholder='Password here'
                                type="password" />

                            <input
                                style={{ borderBottom: '2px solid #000' }}
                                name='confirmPassword'
                                value={creds.confirmPassword}
                                onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                                className={`${Styles.phone_number_input} h-10 w-48 mt-4`}
                                placeholder='Confirm password'
                                type="password" />

                            <button
                                onClick={handleReset}
                                disabled={loading ? true : false}
                                className='w-44 h-10 bg-green-primary flex-center mt-12'
                                type='submit'>
                                {
                                    loading ?
                                        <div className={`${Styles.otp_spinner} w-6 h-6 rounded-full`}></div>
                                        :
                                        <span className='font-bold text-white'>Update password</span>
                                }
                            </button>
                        </div>

                    </div>
                    :
                    <div className='container mx-auto flex-center'>
                        <h1 className='text-4xl font-bold text-gray-600'>
                            Trying to generate reset password link ...
                        </h1>
                    </div>
            }
        </>
    );
};

export default ResetPassword;
