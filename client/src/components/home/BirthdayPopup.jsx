import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'
import { useSelector } from 'react-redux'

const BirthdayPopup = ({ setIsBirthday }) => {
    const navigate = useNavigate()
    const cookie = new Cookies()
    const { user } = useSelector((state) => state.auth)

    function handleDetails() {
        cookie.set('birthdayPopupShown', true, {
            maxAge: 60 * 60 * 60 * 24
        });
        navigate('/user/birthday-specials/address')
        setIsBirthday(false)
    }

    function handleClose() {
        cookie.set('birthdayPopupShown', 'true', {
            maxAge: 60 * 60 * 60 * 24
        });
        setIsBirthday(false)
    }

    return (
        <>
            <div
                style={{ background: 'rgb(0,0,0,0.2)', zIndex: 9999 }}
                className='w-screen h-screen fixed inset-0 flex-center'>

                <div
                    style={{ background: '#1d1d1d' }}
                    className="flex-center flex-col rounded-lg w-3/4 h-80 sm:w-5/12 sm:h-80 py-4 sm:py-0">

                    <img
                        className='sm:w-20 w-16'
                        src="/images/cake.png"
                        alt="cake" />
                    <p className='text-white text-lg font-bold flex items-center'>
                        Happy Birthday { user.name }!
                    </p>

                    <p className='mt-4 text-gray-300 sm:text-left text-center text-sm sm:text-base px-4 mb-2 sm:mb-0'>
                        Since it's your birthday, we've planned something for you!
                    </p>

                    <p className='mt-2 text-gray-300 font-semibold sm:text-left text-center text-sm sm:text-base'>
                        Check your mail, we're waiting...
                    </p>

                    <div className="flex-center mt-8">
                        <button
                            onClick={handleDetails}
                            className='bg-yellow-600 rounded-full px-4 text-sm sm:text-base py-2 font-bold mr-6'>
                            Fill in details
                        </button>
                        <button
                            onClick={handleClose}
                            className='bg-gray-600 text-white rounded-full px-4 py-2 font-bold'>
                            No Thanks
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
};

export default BirthdayPopup;
