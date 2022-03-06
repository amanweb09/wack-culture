import React from 'react'

const Banner = ({ icon, text }) => {
    return (
        <div className='flex-center bg-black mx-auto dark:bg-gray-200 h-10 w-screen'>
            {
                icon &&
                <img
                    className="sm:w-10 sm:h-8 w-8 h-6"
                    src={`/images/${icon}`}
                    alt="banner" />

            }
            <span className='text-white ml-2 text-xs dark:text-black font-normal'>
                {text}
            </span>
        </div>
    )
}

export default Banner
