import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { cancelOrder } from '../http';
import LoadingCard from '../components/shared/LoadingCard'

const Cancellation = () => {

    const { _id } = useParams();

    const [flash, setFlash] = useState({ status: false, type: '', data: '' })
    const [reason, setReason] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    async function submitRequest(e) {
        e.preventDefault();
        setLoading(true)

        try {
            const { data } = await cancelOrder({ orderId: _id, reason })
            setFlash({ status: true, type: 'success', data: data.message })

            setLoading(false)
            setTimeout(() => {
                navigate('/')
            }, 1500);

        } catch (error) {
            console.log(error.response.data);
            setFlash({ status: true, type: 'error', data: error.response.data.message ? error.response.data.message : 'Something went wrong!' })
            setLoading(false)
        }
    }

    return (
        <>
            {
                loading ? <LoadingCard text="Till we're registering your request" /> :
                    <div className='container mx-auto'>
                        <h2
                            className="font-semibold text-lg sm:text-xl text-center mt-8 mb-4">
                            Cancel/Return Order
                        </h2>

                        {
                            flash.status ?
                                flash.type === 'success' ?
                                    <h2
                                        className='text-center text-green-500 font-semibold my-4'>
                                        {flash.data}
                                    </h2>
                                    :
                                    flash.type === 'error' ?
                                        <h2
                                            className='text-center text-red-500 font-semibold my-4'>
                                            {flash.data}
                                        </h2>
                                        : <></> : <></>
                        }

                        <form className='w-full flex-center flex-col mt-8'>
                            <label
                                className='font-semibold mb-2'
                                htmlFor="orderId">
                                Order ID
                            </label>
                            <input
                                style={{ border: '1px solid #70a73c' }}
                                className='block p-2 w-80 sm:w-96'
                                value={`VCR-${_id}`}
                                type="text"
                                name='orderId'
                                readOnly
                            />

                            <label
                                className='font-semibold mb-2 mt-10'
                                htmlFor="reason">
                                Reason
                            </label>
                            <select
                                onChange={(e) => { setReason(e.target.value) }}
                                style={{ background: '#F3F3F3', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                                className='h-10 px-2 rounded-sm w-80 sm:w-96'
                                value={reason}>

                                <option value="cheaper alternative">Got a Cheaper Alternative</option>
                                <option value="not needed">The product is no longer needed</option>
                                <option value="Unsatisfied">Not satsfied with the quality</option>
                                <option value="late delivery">Late Delivery</option>
                                <option value="others">Others</option>
                            </select>

                            <button
                                type='submit'
                                onClick={(e) => { submitRequest(e) }}
                                className='h-12 bg-black text-white mt-16 sm:mt-10 w-52 sm:w-60'>

                                Submit Request
                            </button>
                        </form>
                    </div>
            }
        </>
    );
};

export default Cancellation;
