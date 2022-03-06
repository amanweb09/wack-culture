import React, { useState, useEffect } from 'react'
import ProductCard from '../components/shared/ProductCard';
import { getProducts } from '../http'
import LoadingCard from '../components/shared/LoadingCard'


const NewArrivals = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true)

    async function fetchProducts() {

      try {
        const { data } = await getProducts()
        setProducts(data.products.reverse())
        setLoading(false)

      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <>
      {loading ? <LoadingCard /> : <></>}
      <div className='container mx-auto grid grid-cols-2 sm:grid-cols-4 justify-evenly sm:gap-8 mt-8'>
        {
          products.length ? products.map((product) => {
            return <div key={product._id}>
              <ProductCard product={product} />
            </div>
          }) : <></>
        }
      </div>
    </>
  )
}

export default NewArrivals