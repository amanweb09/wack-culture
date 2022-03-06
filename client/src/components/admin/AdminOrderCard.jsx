import React, { useRef } from 'react';
import moment from 'moment'
import { admin__change__status } from '../../http';
import { Image } from 'cloudinary-react'

const OrderCard = ({ order }) => {

    const status = useRef('')

    async function changeStatus(newStatus) {
        try {
            const { data } = await admin__change__status({ _id: order._id, newStatus })
            status.current = data.newStatus

            window.location.href = '/admin/orders'

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2 className='font-semibold'>
                <span className='text-red-700 mr-2'>Order ID:</span>
                <span className=''>{order._id}</span>
            </h2>

            <div className='w-full mt-4'>
                <h2 className='font-semibold'>Shipping Details</h2>

                <div className='flex pt-2'>
                    <h6 className='text-sm sm:text-base font-semibold mr-2'>Name</h6>
                    <p className='capitalize text-sm sm:text-base'>{order.customerId.name}</p>
                </div>
                <div className='flex'>
                    <h6 className='text-sm sm:text-base font-semibold mr-2'>Email</h6>
                    <p className='text-sm sm:text-base'>{order.customerId.email}</p>
                </div>
                <div className='flex'>
                    <h6 className='font-semibold mr-2 text-sm sm:text-base'>Contact Number</h6>
                    <p className='text-sm sm:text-base'>{order.customerId.tel}</p>
                </div>
                <div className='flex'>
                    <h6 className='font-semibold mr-2 text-sm sm:text-base'>Address</h6>
                    <p className='capitalize text-sm sm:text-base'>{order.address}</p>
                </div>
                <div className='flex'>
                    <h6 className='font-semibold mr-2 text-sm sm:text-base'>Payment Status</h6>
                    <p className='capitalize text-sm sm:text-base'>{order.isPaid === true ? 'Paid' : 'Not Paid'}</p>
                </div>
                <div className='flex'>
                    <h6 className='font-semibold mr-2 text-sm sm:text-base'>Payment Type</h6>
                    <p className='capitalize text-sm sm:text-base'>{order.paymentType}</p>
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
                                alt='product image' />


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
                <div className='flex pt-2'>
                    <h6 className='font-semibold mr-2'>Updated on: </h6>
                    <p className='capitalize'>{moment(order.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
                </div>
            </div>

            <div>
                <h2 className='font-bold mt-4'>Order Status</h2>
                <select
                    defaultValue={order.status}
                    onChange={(e) => { changeStatus(e.target.value) }}
                    className='w-60 border-2 border-solid border-black h-10 my-2'
                    name="status">

                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="packed">packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
        </>
    )
};

export default OrderCard;
