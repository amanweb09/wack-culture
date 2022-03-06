import React from 'react';
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { Image } from 'cloudinary-react'

const OrderCard = ({ order }) => {
    return (
        <>
            <h2 className='font-semibold'>
                <span className='text-red-700 mr-2'>Order ID:</span>
                <span className=''>VCR-{order._id}</span>
            </h2>

            <div className='w-full mt-4'>
                <h2 className='font-semibold'>Shipping Details</h2>

                <div className='flex pt-2'>
                    <h6 className='text-sm sm:text-base font-semibold mr-2'>Name</h6>
                    <p className='capitalize text-sm sm:text-base'>{order.customerId.name}</p>
                </div>
                <div className='flex'>
                    <h6 className='font-semibold mr-2 text-sm sm:text-base'>Contact Number</h6>
                    <p className='capitalize text-sm sm:text-base'>{order.customerId.tel}</p>
                </div>
                <div className='flex'>
                    <h6 className='font-semibold mr-2 text-sm sm:text-base'>Address</h6>
                    <p className='capitalize text-sm sm:text-base'>{order.address}</p>
                </div>
            </div>

            <div className='w-full mt-4'>
                <h2 className='font-semibold'>Product Details</h2>

                {
                    order.products.map((product) => {
                        return <div key={product.product._id} className='flex'>
                            <Image
                                className='w-16 h-16'
                                cloudName='react-ecom'
                                publicId={product.product.images.image_primary}
                                alt='product image'
                            />

                            <div style={{ width: 'max-content' }} className='flex flex-1 flex-col sm:flex-row items-center'>
                                <h6 className='font-semibold ml-4 mr-2'>Product Name</h6>
                                <p className='capitalize'>{product.product.title}</p>
                            </div>
                        </div>
                    })
                }
            </div>


            <div className='w-full mt-4'>
                <div className='flex pt-2'>
                    <h6 className='font-semibold mr-2'>Placed On: </h6>
                    <p className='capitalize'>{moment(order.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                </div>
            </div>

            {
                order.status !== 'completed' &&
                <>
                    <div className='w-full mt-4 text-xs text-right'>
                        <NavLink
                            to={`/order/cancellation/${order._id}`}
                            className='text-red-600 hover:text-red-600'>
                            Cancel Order
                        </NavLink>
                    </div>
                </>
            }

            <NavLink
                className='text-orange-600 hover:text-orange-800 font-semibold'
                to={`/customer/status/${order._id}`}>
                Track status
            </NavLink>
        </>
    )
};

export default OrderCard;
