import { useEffect } from 'react'
import { admin__orders } from '../http'

const useFetchAdminOrders = (setOrders) => {
    useEffect(() => {
        async function fetchOrders() {
            try {
                const { data } = await admin__orders()
                console.log(data.orders);
                setOrders(data.orders)
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrders()
    }, [])
}

export default useFetchAdminOrders;