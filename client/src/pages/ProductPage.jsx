import React, { useState } from 'react';
import { useFetchProductById } from '../hooks/useFetchProductById';
import { useParams } from 'react-router-dom'
import Styles from './pages.module.css'
import AddToCartBtn from '../components/shared/AddToCartBtn'
import LoadingBar from 'react-top-loading-bar'
import LoadingCard from '../components/shared/LoadingCard'
import SlickSlider from '../components/SlickSlider';

const ProductPage = () => {
    const [loading, setLoading] = useState(true)

    const [progress, setProgress] = useState(100);

    const [product, setProduct] = useState({});
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    const [isOpen, setIsOpen] = useState(false)

    const { _id } = useParams()
    useFetchProductById(_id, setProduct, setLoading)

    function openDetails() {
        !isOpen ? setIsOpen(true) : setIsOpen(false)
    }
    return (
        <>
            {loading && <LoadingCard />}
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => { setProgress(0) }}
            />

            {
                product._id ? <> <div className='container mx-auto flex-col sm:flex-row flex'>

                    <div
                        style={{ height: '80vh', flex: '2' }}
                        className="image">
                        <SlickSlider image_primary={product.images.image_primary} image_sec={product.images.image_sec} />
                    </div>

                    <div
                        style={{ flex: '3' }}
                        className="p-4 h-max">
                        <h1 className='font-semibold text-2xl'>{product.title}</h1>

                        <small className='text-lg text-gray-800 my-2 block'>{product.category}</small>

                        <p
                            className='text-gray-600 pr-12 mt-6'>
                            {product.desc}
                        </p>

                        <div className='flex items-center mt-4'>

                            <img
                                className='w-8 h-8'
                                src="/images/Star.png"
                                alt="star" />
                            <h6 className='font-semibold'>5</h6>
                        </div>

                        <div className='mt-6'>
                            <h2 className='font-semibold text-lg'>Sizes Available</h2>

                            <select
                                onChange={(e) => { setSize(e.target.value) }}
                                style={{ borderRadius: 5, background: '#F3F3F3', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                                className='w-28 mt-2'
                                name="sizes">
                                <option>select</option>
                                {
                                    product.variants.sizes.map((size) => {
                                        return <option
                                            key={size}
                                            value={size}>
                                            {size}
                                        </option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="mt-8">
                            <h2 className='font-semibold text-lg'>Colors Available</h2>

                            <div className='flex items-center mt-2'>
                                {
                                    product.variants.colors.map((color) => {
                                        return <input
                                            onChange={(e) => { setColor(e.target.value) }}
                                            id={Styles[color]}
                                            className={Styles.product_page_color_input}
                                            key={color}
                                            type="radio"
                                            name="color"
                                            value={color} />
                                    })
                                }
                            </div>
                        </div>
                        <div className='mt-10'>
                            <AddToCartBtn
                                _id={product._id}
                                price={product.price}
                                size={size}
                                color={color}
                            />
                        </div>
                    </div>

                </div>
                    <div>
                        <div className='w-full h-10 my-4 font-bold text-lg flex items-center justify-between py-2 px-6'>
                            Fabric features
                            <img
                                onClick={openDetails}
                                src='/images/down-arrow.png'
                                alt='open'
                                className="w-6 h-6 cursor-pointer"
                                style={{ transform: isOpen ? 'rotateZ(180deg)' : 'rotate(0)', transition: '0.3s' }} />
                        </div>

                        <div>
                            <ul
                                style={{
                                    height: isOpen === true ? 'maxContent' : 0,
                                    overflow: isOpen ? "" : 'hidden',
                                    transition: '0.5s'
                                }}
                                className={`px-8 pb-4`}>

                                <li className='mb-2 font-semibold'>220 GSM Fabric</li>
                                <li className='mb-2 font-semibold'>Pre-shrunk T-shirt (No shrinkage after washing!)</li>
                                <li className='mb-2 font-semibold'>Bio-Washed Fabric (Incredible softness!)</li>
                                <li className='mb-2 font-semibold'>Color-Fastened Fabric (no color fading!)</li>
                            </ul>
                        </div>
                    </div>
                </>
                    :
                    <div style={{ height: '80vh' }} className='w-full flex-center'>
                        <h2 className='font-bold text-4xl text-gray-600'>Please give us a few seconds...</h2>
                    </div>
            }
        </>

    );
};

export default ProductPage;
