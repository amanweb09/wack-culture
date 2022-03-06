import React from 'react'

const ConfirmationModal = ({ message, onClose, onClear }) => {

    return (
        <div
            style={{ background: 'rgb(0,0,0,0.75)', zIndex: '99' }}
            className='w-screen flex-center h-screen fixed inset-0'>
            <div
                className='bg-white flex-center flex-col relative w-80 h-80 sm:w-96 sm:h-96'
                style={{ borderRadius: 20 }}>

                <span
                    onClick={() => { onClose(false) }}
                    style={{ top: 10, right: 10 }}
                    className='absolute text-4xl cursor-pointer font-bold hover:text-green-500'>&times;</span>

                <h1 className='font-bold text-red-500 px-6 text-center sm:text-left sm:px-0'>
                    {message}
                </h1>

                <div className='flex-center mt-8'>
                    <button
                        onClick={onClear}
                        className='bg-red-500 mr-6 w-24 h-10 rounded-sm'>Yes</button>
                    <button
                        onClick={() => { onClose(false) }}
                        className='border-2 border-solid w-24 h-10 rounded-sm border-blue-200'>Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default ConfirmationModal
