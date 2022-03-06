import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

const ProductStoreElements = ({ label, name, store_property, value, setInfo, action, payload_name, details }) => {
    const dispatchToStore = useDispatch();
    const store = useSelector((state) => state.adminProduct)

    function handleSubmit(e) {
        e.preventDefault();
        dispatchToStore(action({ [payload_name]: value }))

        setInfo(name, '')
    }

    return (
        <>
            <label
                className='block font-semibold mt-2 mb-2'
                htmlFor={name}>{label}</label>

            <div className='flex items-center'>
                {
                    store[store_property].length > 0 && store[store_property].map((element) => {
                        return <div
                            key={element}
                            className='w-16 m-2 bg-gray-200 rounded-md flex-center'>
                            {element}
                        </div>
                    })
                }
            </div>

            <input
                placeholder={label}
                className='px-2 w-4/12 border-2 border-solid border-green-600 h-10 mb-4'
                name={name}
                value={value}
                onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                type="text" />

            <button
                onClick={handleSubmit}
                className='w-10 h-10 text-white mx-4 bg-green-700 rounded-full'>
                Set
            </button>
        </>
    )
};

export default ProductStoreElements;
