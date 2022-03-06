import React, { useState } from 'react'
import FormInput from '../components/shared/FormInput'
import Notification from '../components/shared/Notification'
import { signupUser } from '../http'
import { useNavigate, NavLink } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import LoadingCard from '../components/shared/LoadingCard'
import DOB from '../components/auth/DOB'


const Signup = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        tel: '',
        password: '',
        birthday: ""
    })

    const [tc, setTc] = useState('')
    const [flash, setFlash] = useState(false);
    const [responseType, setResponseType] = useState('')
    const [responseText, setResponseText] = useState('')
    const [progress, setProgress] = useState(100);

    const [loading, setLoading] = useState(false);


    const storeInfo = (eventName, eventValue) => {
        setUser({
            ...user,
            [eventName]: eventValue
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.tel || !user.password || !user.birthday) {
            alert('Please fill all the fields!')
            return;
        }

        if (!tc) {
            alert('t&c required')
            return;
        }
        else {
            setLoading(true)
            try {
                const { data } = await signupUser(user);
                setResponseText(data.message);
                setResponseType('success')
                setFlash(true)

                setUser({
                    name: "",
                    email: "",
                    tel: "",
                    password: "",
                    birthday: ""

                })
                setLoading(false)

                setTimeout(() => {
                    navigate('/login')
                }, 1000)

            } catch (error) {
                const { err } = error.response.data;

                setResponseText(err);
                setResponseType('error')
                setFlash(true)

                setUser({
                    name: "",
                    email: "",
                    tel: "",
                    password: "",
                    birthday: ""
                })
                setLoading(false)
            }
        }
    }

    return (
        <>
            {
                loading ? <LoadingCard text="Till we're signing you up" />
                    :
                    <div className='container mx-auto'>
                        <LoadingBar
                            color='#f11946'
                            progress={progress}
                            onLoaderFinished={() => { setProgress(0) }}
                        />
                        <header className='flex-center flex-col py-8'>
                            <h6 className='text-sm font-normal'>Welcome to</h6>
                            <h2 className='text-3xl my-4 font-thin'>Wack Culture</h2>
                            <h3 className='font-semibold sm:text-lg'>Create an account</h3>
                        </header>

                        {
                            flash ?
                                <div 
                                className='mx-auto sm:w-1/3 w-5/6'>
                                    <Notification type={responseType} message={responseText} />
                                </div> :
                                <></>
                        }


                        <form
                            style={{ width: 'max-content' }}
                            className='block mx-auto px-8'>

                            <FormInput
                                style={{ border: '1px solid #70a73c', width: '100%', height: '2rem', padding: '0 0.5rem' }}
                                name='name'
                                label='Full name'
                                placeholder='Full name here'
                                value={user.name}
                                setState={storeInfo}
                            />
                            <FormInput
                                style={{ border: '1px solid #70a73c', width: '100%', height: '2rem', padding: '0 0.5rem' }}
                                name='email'
                                label='Email'
                                placeholder='Email here'
                                value={user.email}
                                type='email'
                                setState={storeInfo}
                            />
                            <FormInput
                                style={{ border: '1px solid #70a73c', width: '100%', height: '2rem', padding: '0 0.5rem' }}
                                name='tel'
                                label='Contact Number'
                                placeholder='Contact Number here'
                                value={user.tel}
                                type='tel'
                                setState={storeInfo}
                            />
                            <FormInput
                                style={{ border: '1px solid #70a73c', width: '100%', height: '2rem', padding: '0 0.5rem' }}
                                name='password'
                                label='Password'
                                placeholder='Password here'
                                value={user.password}
                                type='password'
                                setState={storeInfo}
                            />

                            <DOB storeInfo={storeInfo} user={user} />

                            <div className='flex items-center mt-6'>
                                <input
                                    onChange={(e) => { setTc(e.target.checked) }}
                                    value={tc}
                                    type="checkbox" />
                                <label
                                    className='ml-2'
                                    htmlFor="t&c">
                                    I Agree to the Terms & Conditions
                                </label>
                            </div>

                            <button
                                type='submit'
                                style={{ width: '20rem', borderRadius: 7 }}
                                className="mt-8 mb-10 sm:h-8 h-10 bg-black text-white font-semibold"
                                onClick={(e) => { submitForm(e) }}>
                                Signup
                            </button>
                        </form>

                        <div>
                            <span className='flex-center mb-8'>
                                Already have an account?
                                <NavLink to='/login' className='font-semibold ml-2'>Login</NavLink>
                            </span>
                        </div>
                    </div>
            }
        </>
    )
}

export default Signup
