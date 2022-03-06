import React from 'react'

const OrderPlacedModal = ({ message, onClose, onClear }) => {

    function clean() {
        onClose(false)
        onClear()
    }

    return (
        <div
            style={{ top: 0, left: 0, bottom: 0, right: 0, background: 'rgb(0,0,0,0.75)', zIndex: '99' }}
            className='w-screen flex-center h-screen fixed'>
            <div
                className='bg-white flex-center flex-col relative'
                style={{ width: '25rem', height: '25rem', borderRadius: 20 }}>

                <span
                    onClick={clean}
                    style={{ top: 10, right: 10 }}
                    className='absolute text-4xl cursor-pointer font-bold hover:text-green-500'>
                    &times;
                </span>

                {
                    <h1 className='font-bold text-green-500'>
                        {message}
                    </h1>

                }

                <div className='flex-center mt-8'>
                    {
                        <>
                            <button
                                onClick={clean}
                                style={{ width: '6rem', height: '2.5rem', borderRadius: 7 }}
                                className='bg-green-500 mr-6'>OK!</button>
                            <button
                                onClick={clean}
                                style={{ width: '6rem', height: '2.5rem', borderRadius: 7 }}
                                className='border-2 border-solid border-blue-200'>Close
                            </button>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default OrderPlacedModal
