import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/shared/ProductCard';
import { getProductsInCollection } from '../http';
import LoadingCard from '../components/shared/LoadingCard'

const CollectionProducts = () => {
    const { collection, sub_collection } = useParams();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)

        async function fetchCollectionProducts() {
            try {
                const { data } = await getProductsInCollection(collection, sub_collection);
                setProducts(data.products)
                setLoading(false)

            } catch (error) {
                console.log(error);
                setLoading(false)

            }
        }

        fetchCollectionProducts()
    }, [collection, sub_collection])

    return (
        <>
            {loading ? <LoadingCard /> : <></>}

            <div className='container mx-auto grid grid-cols-2 sm:grid-cols-4 justify-evenly sm:gap-8 mt-8'>
                {
                    products.map((product) => {
                        return <div>
                            <ProductCard product={product} />
                        </div>
                    })
                }
            </div>
        </>
    );
};

export default CollectionProducts;
