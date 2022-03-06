import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, logout } from '../http'
import { setIsAuth } from '../store/authSlice'
import LoadingBar from 'react-top-loading-bar'


const Profile = () => {

    const [progress, setProgress] = useState(100);


    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        async function requestProfile() {
            try {
                const { data } = await getProfile()
                dispatch(setIsAuth({ user: data.user, isAuth: true }))
            } catch (error) {
                console.log(error);
            }
        }
        requestProfile()
    }, [])

    async function logoutUser() {
        try {
            await logout()
            window.location.href = '/login'

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container mx-auto'>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => { setProgress(0) }}
            />
            <h2
                className='text-center text-lg sm:text-xl mt-12 mb-8 capitalize font-semibold dark:text-gray-50'>
                Welcome {user.name}!
            </h2>

            <div
                style={{ minHeight: '60vh', border: '1px solid #70a73c' }}
                className='sm:w-1/4 w-10/12 block mx-auto border dark:text-gray-50'>

                <h4 className='text-center text-lg pt-4 capitalize'>{user.name}'s ID Card</h4>

                <div className='mx-auto w-11/12 mt-8 py-4 dark:text-gray-50'>
                    <ul>
                        <li className='text-center mb-4'>
                            <span className='font-semibold mr-2 block'>Registered Name</span>
                            <span className='capitalize'>
                                {user.name}
                            </span>
                        </li>
                        <li className='text-center mb-4'>
                            <span className='font-semibold mr-2 block'>Email</span>
                            <span>
                                {user.email}
                            </span>
                        </li>
                        <li className='text-center mb-4'>
                            <span className='font-semibold mr-2 block'>Contact Number</span>
                            <span>
                                {user.tel}
                            </span>
                        </li>
                    </ul>
                </div>

                <button
                    className="mx-auto block bg-black text-white dark:bg-white dark:text-black font-semibold w-48 h-10 rounded-sm"
                    onClick={logoutUser}>
                    Logout
                </button>
            </div>

            <NavLink
                className='text-center w-max h-max mx-auto dark:text-white block mt-6 mb-2 font-semibold dark:hover:text-green-600 hover:text-green-600'
                to='/forgot-password'>Reset Password</NavLink>
            <NavLink
                className='text-center w-max h-max mx-auto dark:text-white block mt-2 mb-8 font-semibold dark:hover:text-green-600 hover:text-green-600'
                to='/reset-password'>My Orders</NavLink>
        </div>
    )
}

export default Profile
