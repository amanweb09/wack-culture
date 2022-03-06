import React from 'react';
import Banner from '../shared/Banner';
import { Image } from 'cloudinary-react'

const Header = () => {
    return (
        <div
            className='mx-auto w-full'>
            <Banner
                icon='shipping-truck.png'
                text='Enjoy free express shipping throughout India!'
            />

            <div
                style={{ height: '70vh' }}
                className='slider bg-gray-200 w-full mt-8 relative'>

                <Image
                    className='h-full w-full'
                    cloudName='react-ecom'
                    publicId="utilities/hero-poster-plain-2"
                />

                <div
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    className='absolute w-max h-max text-center uppercase'>

                    <h2
                        className='font-semibold text-gray-200 sm:text-2xl text-lg block'>
                        Welcome
                    </h2>
                    <small className='text-gray-200 block my-2'>to</small>
                    <h1
                        className='text-white sm:text-6xl text-4xl font-bold mt-4'>
                        Wack Culture
                    </h1>

                </div>

                <div
                    style={{ transform: 'TranslateX(-50%)', boxShadow: '5px 7px 16px rgba(0, 0, 0, 0.25)' }}
                    className='bg-green-primary absolute flex-center bottom-8 left-1/2 w-80 flex-col text-center px-6 py-2 cursor-default'>

                    <h2
                        className='sm:text-2xl text-xl font-bold text-white'>
                        Shop Now
                    </h2>
                    <p
                        className='text-white font-thin text-lg'>
                        Free Shipping + Cash On Delivery
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;
