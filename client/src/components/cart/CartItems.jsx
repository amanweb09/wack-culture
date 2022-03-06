import React, { useEffect, useState } from 'react';
import { fetchProductsInCart } from '../../http';
import CartProductCard from './CartProductCard';
import LoadingCard from '../shared/LoadingCard'

const CartItems = ({ setConfirmation }) => {
    const [productsInCart, setProductsInCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const cart = window.localStorage.getItem('cart');

    useEffect(() => {
        async function fetchProducts() {
            if (cart && cart !== 'null') {
                const _cart = JSON.parse(cart);
                const pIds = Object.keys(_cart.items);

                try {
                    const { data } = await fetchProductsInCart({ ids: pIds });
                    setProductsInCart(data.products)
                    setLoading(false)

                } catch (error) {
                    console.log(error);
                    setLoading(false)
                }
            }
        }
        fetchProducts();
    }, [cart])

    const clearCart = () => {
        setConfirmation(true)
    }

    return (
        <div className="items my-6 mr-2 flex-1 h-max">
            {
                loading && <LoadingCard />
            }

            <h4 className='font-bold mt-6 mb-4 text-md'>
                Items in the Basket
            </h4>
            {
                cart && cart !== 'null' ?
                    <>
                        <div className='border-2 border-solid border-gray-200'>
                            {
                                productsInCart.map((product) => {
                                    return <CartProductCard
                                        key={product._id}
                                        img={product.img}
                                        _id={product._id}
                                        title={product.title}
                                        price={product.price}
                                        color={JSON.parse(cart).items[product._id].color}
                                        size={JSON.parse(cart).items[product._id].size}
                                    />
                                })
                            }
                        </div>
                        <div className="flex flex-col my-4 px-2">
                            <div className="shipping flex items-center justify-between mb-2">
                                <h6 className='font-semibold'>Shipping</h6>
                                <p className='text-green-500 font-semibold'>Free</p>
                            </div>
                            <div className="shipping flex items-center justify-between">
                                <h6 className='font-semibold'>Discount</h6>
                                <p>Rs. {JSON.parse(cart).discount ? JSON.parse(cart).discount : 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 px-2 py-4">
                            <h2 className='text-lg font-bold'>Total</h2>
                            <span>Rs. {JSON.parse(window.localStorage.getItem('cart')).totalPrice}</span>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={clearCart}
                                className="bg-red-500 px-4 py-2 my-2 hover:bg-red-600 rounded-sm">
                                Clear Cart
                            </button>
                        </div>
                    </>
                    : <></>
            }

        </div>
    )
};

export default CartItems;
