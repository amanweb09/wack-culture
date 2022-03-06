import React from 'react'

const Notification = ({ type, message }) => {
    return (
        <>
            {
                type === 'error' ?
                    <div
                        style={{ border: '1px solid #ff5757' }}
                        className='w-full relative flex-center sm:h-24 h-20'>

                        <div
                            className='absolute bg-red-300 h-full sm:w-10 w-6 left-0 top-0'></div>

                        <img
                            style={{ left: '2.5rem', top: '50%', transform: 'translateY(-50%)' }}
                            className='absolute w-10'
                            src='/images/fail.png'
                            alt='fail' />

                        <div className='absolute px-4' style={{ right: '5px', top: '50%', transform: 'translateY(-50%)', width: '70%' }}>
                            <h3 className='text-sm text-center font-semibold'>{message}</h3>
                        </div>

                    </div>
                    : type === 'success' ?
                        <div
                            style={{ border: '1px solid rgb(134 239 172)' }}
                            className='w-full relative flex-center sm:h-24 h-20'>

                            <div
                                className='absolute bg-green-300 h-full sm:w-10 w-6 left-0 top-0'></div>

                            <img
                                style={{ left: '2.5rem', top: '50%', transform: 'translateY(-50%)' }}
                                className='absolute w-10'
                                src='/images/success.png'
                                alt='success' />

                            <div className='absolute px-4' style={{ right: '5px', top: '50%', transform: 'translateY(-50%)', width: '70%' }}>
                                <h3 className='text-sm text-center font-semibold'>{message}</h3>
                            </div>

                        </div>
                        :
                        <> </>
            }

        </>

    )
}

export default Notification
