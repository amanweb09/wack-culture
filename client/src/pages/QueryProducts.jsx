import React, { useEffect, useState } from 'react'
import ProductCard from '../components/shared/ProductCard';
import { useSearchParams } from 'react-router-dom'
import { getProductsByQuery } from '../http';
import LoadingCard from '../components/shared/LoadingCard'


const QueryProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        
        (
            async () => {
                    setLoading(true)
                    const qa = searchParams.get('qa')
                    const searchIna = searchParams.get('searchIna')

                    try {
                        const { data } = await getProductsByQuery({ qa, searchIna });
                        setProducts(data.products.reverse())
                        setLoading(false)

                    } catch (error) {
                        console.log(error);
                        setLoading(false)

                    }
                }
            )()
    }, [])

    return (
        <>
            {loading ? <LoadingCard /> : <></>}

            <div className='container mx-auto grid grid-cols-2 sm:grid-cols-4 justify-evenly sm:gap-8 mt-8'>
                {
                    products.length ? products.map((product) => {
                        return <div>
                            <ProductCard product={product} />
                        </div>
                    }) : <></>
                }
            </div>
        </>
    )
}

export default QueryProducts