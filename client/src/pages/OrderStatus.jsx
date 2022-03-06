import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useFetchOrderStatus } from '../hooks/useFetchStatus';
import Styles from './pages.module.css'

const OrderStatus = () => {

    const { _id } = useParams()
    const [currentStatus, setCurrentStatus] = useState('placed')
    const [updatedTime, setUpdatedTime] = useState('')

    useFetchOrderStatus(_id, setCurrentStatus, setUpdatedTime)

    return (
        <div className='container mx-auto'>
            <h1
                className='mt-8 text-lg sm:text-xl text-teal-600 ml-4 sm:ml-0'>
                VCR-{_id}
            </h1>

            <div className='w-full mt-10 p-4 flex-center flex-col sm:flex-row'>
                {
                    currentStatus === 'placed' ?
                        <div
                            style={{ boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} ${Styles.status_active} bg-green-500 status status_placed w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Placed
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/placed.png"
                                alt="placed" />
                        </div>
                        :
                        <div
                            style={{ background: '#F3F3F3', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} status status_placed w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order placed
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/placed.png"
                                alt="placed" />
                        </div>
                }
                {
                    currentStatus === 'confirmed' ?
                        <div
                            style={{ boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} ${Styles.status_active} bg-green-500 status status_confirmed w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Confirmed
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/confirmed.png"
                                alt="confirmed" />
                        </div>
                        :
                        <div
                            style={{ background: '#F3F3F3', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} status status_confirmed w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Confirmed
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/confirmed.png"
                                alt="confirmed" />
                        </div>
                }
                {
                    currentStatus === 'packed' ?
                        <div
                            style={{ boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} ${Styles.status_active} bg-green-500 status status_packed w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Packed
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/packed.png"
                                alt="packed" />
                        </div>
                        :
                        <div
                            style={{ background: '#F3F3F3', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} status status_packed w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Packed
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/packed.png"
                                alt="packed" />
                        </div>
                }
                {
                    currentStatus === 'shipped' ?
                        <div
                            style={{ boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} ${Styles.status_active} bg-green-500 status status_shipped w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Shipped
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/shipped.png"
                                alt="shipped" />
                        </div>
                        :
                        <div
                            style={{ background: '#F3F3F3', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} status status_shipped w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Shipped
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/shipped.png"
                                alt="shipped" />
                        </div>
                }
                {
                    currentStatus === 'completed' ?
                        <div
                            style={{ boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} ${Styles.status_active} bg-green-500 status status_shipped w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Completed
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/completed.png"
                                alt="completed" />
                        </div>
                        :
                        <div
                            style={{ background: '#F3F3F3', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                            className={`${Styles.status} status status_shipped w-20 h-20 rounded-full flex-center mx-0 my-10 sm:my-0 sm:mx-20 relative`}>
                            <span
                                style={{ bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                                className='absolute w-40 text-center font-semibold'>Order Completed
                            </span>
                            <img
                                className='w-12 h-12'
                                src="/images/completed.png"
                                alt="completed" />
                        </div>
                }

            </div>

            <div
                style={{ top: '10rem', right: '0.5rem', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                className="fixed w-64 sm:w-80 text-xs sm:text-sm rounded-lg h-10 flex-center bg-gray-50">
                <span className='font-semibold mr-2'>Changed At:</span>
                <span>
                    {updatedTime}
                </span>
            </div>
        </div>
    );
};

export default OrderStatus;
