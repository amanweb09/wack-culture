import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Image } from 'cloudinary-react'

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => { navigate(`/product/${product._id}`) }}
            className='product-wrapper flex-col cursor-pointer mx-2'>
            <div
                style={{ objectFit: 'cover' }}
                className="flex-center w-44 h-44 sm:w-56 sm:h-56">
                <Image
                    className='h-full'
                    cloudName='react-ecom'
                    publicId={product.images.image_primary}
                />
            </div>
            <div
                className="description w-48 sm:w-56">

                <h4 className="font-semibold text-lg mb-2">{product.title}</h4>
                <p className='font-thin text-gray-600'>{product.category}</p>
                {
                    product.slashedPrice && <h3
                        style={{ color: '#000' }}
                        className='line-through'>
                        Rs. {product.slashedPrice}
                    </h3>
                }
                <h3 style={{ color: '#70a73c' }} className='text-xl font-bold'>Rs. {product.price}</h3>

                <div className="button">
                    <button
                        onClick={() => { navigate(`/product/${product._id}`) }}
                        style={{ width: '10rem', height: '2rem' }}
                        className='flex bg-black flex-center text-white my-4'>
                        VIEW PRODUCT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
