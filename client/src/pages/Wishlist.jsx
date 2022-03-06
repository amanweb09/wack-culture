import React, { useState } from 'react';
import { Image } from 'cloudinary-react'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
    const navigate = useNavigate()
    const [wishlist] = useState([])

    return (
        <div className='container mx-auto'>
            {
                !wishlist.length ?
                    <div className='w-full h-full flex-center flex-col'>
                        <Image
                            className='sm:w-80 w-64 opacity-50 mt-24 sm:mb-4 mb-8'
                            alt='empty wishlist'
                            cloudName='react-ecom'
                            publicId='utilities/empty_wishlist' />

                        <h2 className='font-bold text-center sm:text-4xl text-2xl text-gray-600 capitalize'>
                            Your wishlist looks empty
                        </h2>

                        <button
                            className='bg-green-primary text-white w-48 h-14 mt-12 font-bold'
                            onClick={() => { navigate('/') }}>
                            Continue Shopping
                        </button>
                    </div>
                    :
                    <div></div>
            }
        </div>
    );
};

export default Wishlist;
