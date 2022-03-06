import React, { useState } from 'react'
import Notification from '../components/shared/Notification';
import FormInput from '../components/shared/FormInput';
import { loginUser } from '../http';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../store/authSlice';
import LoadingBar from 'react-top-loading-bar'
import LoadingCard from '../components/shared/LoadingCard'


const Login = () => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email_tel: '',
        password: ''
    })

    const storeInfo = (eventName, eventValue) => {
        setUser({
            ...user,
            [eventName]: eventValue
        })
    }


    const [flash, setFlash] = useState(false);
    const [responseType, setResponseType] = useState('')
    const [responseText, setResponseText] = useState('')
    const [progress, setProgress] = useState(100);

    const [loading, setLoading] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();

        setLoading(true)
        try {
            const { data } = await loginUser(user);

            dispatch(setIsAuth({ user: data.user, isAuth: true }))

            setResponseType('success');
            setResponseText(data.message);
            setFlash(true);

            setLoading(false)
            // setInterval(() => {
            //     navigate('/')
            // }, 1000)

        } catch (error) {
            const { err } = error.response.data;
            setResponseType('error');
            setResponseText(err);
            setFlash(true)

            setLoading(false)
        }
    }

    return (
        <>
            {
                loading ? <LoadingCard text="Till we're logging you in" />
                    :
                    <div className='container'>
                        <LoadingBar
                            color='#f11946'
                            progress={progress}
                            onLoaderFinished={() => { setProgress(0) }}
                        />
                        <header className='flex-center flex-col py-8'>
                            <h6 className='text-sm font-normal'>Welcome to</h6>
                            <h2 className='text-2xl sm:text-3xl my-4 sm:font-thin'>Wack Culture</h2>
                            <h3 className='font-semibold text-sm'>Login in to you Account</h3>
                        </header>

                        {
                            flash ?
                                <div className='mx-auto sm:w-1/3 w-10/12'>
                                    <Notification type={responseType} message={responseText} />
                                </div> :
                                <></>
                        }

                        <form
                            className='block mx-auto px-6 sm:px-8 w-screen sm:w-max'>

                            <FormInput
                                style={{ border: '1px solid #70a73c' }}
                                name='email_tel'
                                label='Email or Telephone Number'
                                placeholder='Email/telephone number here'
                                value={user.email_tel}
                                setState={storeInfo}
                            />
                            <FormInput
                                style={{ border: '1px solid #70a73c', width: '100%', height: '2rem', padding: '0 0.5rem' }}
                                name='password'
                                type='password'
                                label='Password'
                                placeholder='Password here'
                                value={user.password}
                                setState={storeInfo}
                            />

                            <button
                                type='submit'
                                style={{ width: '20rem', borderRadius: 7 }}
                                className="mt-8 mb-10 h-10 sm:h-8 bg-black text-white font-semibold"
                                onClick={(e) => { submitForm(e) }}>
                                Login
                            </button>
                        </form>

                        <div>
                            <span className='flex-center mb-8'>
                                Don't have an account?
                                <NavLink to='/signup' className='font-semibold ml-2'>Signup</NavLink>
                            </span>
                            <span className='flex-center mb-8'>
                                <NavLink to='/forgot-password' className='font-semibold ml-2'>Forgot Password?</NavLink>
                            </span>
                        </div>

                    </div>
            }
        </>
    )
}

export default Login
