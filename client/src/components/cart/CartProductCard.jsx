import React from 'react'
import { initializeCart } from '../../store/orderSlice'
import { useDispatch } from 'react-redux'
import { removePromoCodeOnCartClear } from '../../http'
import { Image } from 'cloudinary-react'



const CartProductCard = ({ _id, img, title, price, size, color }) => {

    const dispatch = useDispatch();
    const cart = window.localStorage.getItem('cart');

    async function removeFromCart(pid, pprice) {
        const confirm = window.confirm(`Are you sure you want to delete ${title} from the cart?`);

        if (confirm) {
            let _cart = { ...JSON.parse(cart) };

            _cart.totalItems -= _cart.items[pid].qty;
            _cart.totalPrice -= pprice;
            delete _cart.items[pid]


            if (Object.keys(_cart.items).length < 1) {
                try {
                    await removePromoCodeOnCartClear()
                    window.localStorage.setItem('cart', 'null')
                }
                catch (error) {
                    console.log(error.response.message);
                    // alert(error.response.data.err ? error.response.data.err : "Oops.. Your cart couldn't be cleared!")
                    alert(error.response.status === 401 ? "Please login to clear your cart" : "Oops.. Your cart couldn't be cleared!")
                }

            }
            else {
                window.localStorage.setItem('cart', JSON.stringify(_cart))
            }

            dispatch(initializeCart({ cart: JSON.parse(cart) }))

            const canApply = window.localStorage.getItem('canApply');
            if (canApply) window.localStorage.removeItem('canApply')

            window.location.href = '/cart'
        }
    }

    return (
        <div className='flex mt-2 p-2 relative w-11/12 mx-2'>
            <div>
                <Image
                    className='w-20 h-20 mr-2'
                    alt="product"
                    cloudName='react-ecom'
                    publicId={img} />

            </div>

            <div className='pl-6'>
                <h4 className='font-semibold'>{title}</h4>
                <div className="flex items-center justify-evenly text-gray-600">
                    <p className='mr-6'>Size: {size}</p>
                    <p>Color: {color}</p>
                </div>

                <div className="flex items-center mt-4 mb-2">
                    <h4 style={{ fontFamily: 'Poppins' }}
                        className='text-lg font-bold mr-6'>Rs. {price}</h4>
                    <p className='text-gray-600'>x {
                        cart && cart !== 'null' ? JSON.parse(cart).items[_id].qty : ''
                    }
                    </p>
                </div>
            </div>

            <span
                onClick={() => { removeFromCart(_id, price) }}
                style={{ right: 10, top: '50%', transform: 'translateY(-50%)' }}
                className='absolute text-2xl text-gray-600 cursor-pointer hover:text-red-500'>
                &times;
            </span>
        </div>
    )
}

export default CartProductCard
