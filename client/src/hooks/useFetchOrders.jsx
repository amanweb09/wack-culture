import { useEffect } from "react"
import { fetchOrders } from "../http"

export const useFetchOrders = (dispatch, setLoading) => {
    useEffect(() => {
        async function fetchUserOrders() {
            try {
                const { data } = await fetchOrders();
                const { completedOrders, orders } = data;

                dispatch({ type: 'setOrders', payload: { completedOrders, orders } })
                setLoading(false)

            } catch (error) {
                console.log(error.response.data);
                setLoading(false)
            }
        }
        fetchUserOrders()
    }, [])
}