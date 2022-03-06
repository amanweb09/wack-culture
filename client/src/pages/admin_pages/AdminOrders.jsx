import React, { useState } from 'react';
import useFetchAdminOrders from '../../hooks/useFetchAdminOrders';
import AdminOrderCard from '../../components/admin/AdminOrderCard'

const AdminOrders = () => {

    const [orders, setOrders] = useState([])
    useFetchAdminOrders(setOrders)

    return (
        <div
            className='container mx-auto'>
            {
                orders.map((order) => {
                    return <div
                        style={{ borderBottom: '2px solid #454545' }}
                        className='mt-8 py-4'
                        key={order._id}>
                        <AdminOrderCard order={order} />
                    </div>
                })
            }
        </div>
    );
};

export default AdminOrders;
