import React from 'react';
import OrderCard from './OrderCard';
import { Image } from 'cloudinary-react'


const Completed = ({ completedOrders }) => {
  return (
    <div className='w-full p-6'>
      {
        completedOrders && completedOrders.length ?
          completedOrders.map((order) => {
            return <div
              key={order._id}
              className='pb-2'
              style={{ borderBottom: '1px solid #70a73c' }}>
              <OrderCard order={order} />
            </div>
          })
          :
          <div style={{ height: '50vh' }} className='flex-center flex-col mt-6'>
            <Image
              className='sm:w-60 w-48 mb-10 sm:mb-6 opacity-70'
              cloudName='react-ecom'
              publicId='utilities/empty_orders'
              alt='empty orders'/>
              
            <h1 className='sm:text-4xl text-2xl sm:text-left text-center text-gray-400 font-bold'>No Completed Orders Found!</h1>
          </div>
      }
    </div>
  );
};

export default Completed;
