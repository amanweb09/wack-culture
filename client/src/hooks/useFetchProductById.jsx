import { useEffect } from 'react';
import { getProductById } from '../http';



export const useFetchProductById = (_id, setProduct, setLoading) => {

    useEffect(() => {
        async function fetchById() {
            try {
                const { data } = await getProductById(_id)
                setLoading(false)
                return setProduct(data.product)
                
            } catch (error) {
                console.log(error); 
                setLoading(false)
            }
        }
        fetchById()
    }, [])
}