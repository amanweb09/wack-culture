import { useEffect } from "react"
import moment from 'moment'
import initSocket from '../web_socket/config'
import { fetchStatus } from '../http'

export const useFetchOrderStatus = (_id, setCurrentStatus, setUpdatedTime) => {
    useEffect(() => {

        async function fetchOrderStatus() {
            try {
                const { data } = await fetchStatus(_id)
                setCurrentStatus(data.status)
                setUpdatedTime(moment(data.updatedAt).format('MMMM Do YYYY, hh:mm a'))

            } catch (error) {
                console.log(error);
            }
        }
        fetchOrderStatus()

        const socket = initSocket()
        socket.on('connect', () => {
            socket.emit('join_into_pvt_room', `order_${_id}`)
        })

        socket.on('user_order_updated', (data) => {
            const { newStatus } = data;

            setCurrentStatus(newStatus)
            const updatedTime = moment().format('MMMM Do YYYY, hh:mm a')
            setUpdatedTime(updatedTime)
        })

    }, [])
}