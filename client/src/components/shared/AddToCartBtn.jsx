import React, { useState } from 'react';
import { addToCart } from '../../store/orderSlice'
import { useDispatch } from 'react-redux'

const AddToCartBtn = ({ _id, price, color, size }) => {
    const [isAdded, setIsAdded] = useState(false);

    const dispatch = useDispatch();

    function onAdd() {

        if (color === '' || size === '') {
            alert('please select a color and size!')
        }
        else {
            dispatch(addToCart({ _id, price, color, size }))
            setIsAdded(true)

            setTimeout(() => {
                setIsAdded(false)
            }, 1000)
        }
    }

    return (
        <>
            {
                !isAdded ?
                    <button
                        onClick={onAdd}
                        style={{ width: '10rem', height: '2rem' }}
                        className='flex bg-black flex-center text-white my-4'>
                        <span className='text-sm mr-2'>ADD TO CART</span>
                        <img src="/images/add-to-cart-plus-icon.png" alt="" />
                    </button>
                    :
                    <>
                        <button
                            style={{ width: '10rem', height: '2rem' }}
                            className='flex flex-center text-white my-4 bg-green-500'>
                            <span className='text-sm mr-2'>ADDED</span>
                        </button>
                    </>

            }
        </>
    )
};

export default AddToCartBtn;
