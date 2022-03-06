import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Image } from 'cloudinary-react'

const Error_404 = () => {

    const navigate = useNavigate();

    return (
        <div
            className='w-11/12 py-10 mx-auto flex items-center sm:justify-center justify-start flex-col sm:flex-row'>
            <div>
                <Image
                    className='sm:w-96 w-3/4 sm:mx-auto'
                    cloudName='react-ecom'
                    publicId='utilities/bigfoot_404_page_monster_blue'
                    alt='404 page'
                />
            </div>

            <div className='sm:ml-8 sm:pr-0 mt-4 sm:mt-0'>
                <h1 className='sm:text-4xl text-2xl font-bold mb-2 text-gray-700 dark:text-gray-50'>OH NO! ERROR 404</h1>
                <p className='text-gray-500 sm:text-base text-sm font-semibold dark:text-gray-200'>Seems like our buddy has lost the way...</p>

                <button
                    onClick={() => { navigate('/') }}
                    className='font-bold text-base text-white mt-10 bg-black dark:bg-white dark:text-black w-48 h-14 rounded-full'>
                    Take me Back Home
                </button>
            </div>
        </div>
    )
};

export default Error_404;
