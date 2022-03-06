import React from 'react';

const LoadingCard = ({ text }) => {
    return (
        <div
            style={{ background: 'rgb(0,0,0,0.65)', zIndex: 99999 }}
            className='w-screen h-screen fixed inset-0 flex-center'>

            <div
                style={{ background: '#1d1d1d' }}
                className="flex-center flex-col rounded-lg w-3/4 h-72 sm:w-5/12 sm:h-80">
                <img
                    className='w-20 mb-6'
                    src='/images/loader-2.gif'
                    alt='loader' />
                <h2 className='text-white font-bold sm:text-lg'>Please Wait</h2>
                <p
                    className='text-white text-sm flex items-center'>
                    {
                        text ? text :
                            <span>
                                Till we're fetching the best for you!
                            </span>
                    }
                    <img src="/images/flames.png" alt="flame" className='w-6' />
                </p>
            </div>
        </div>
    );
};

export default LoadingCard;
