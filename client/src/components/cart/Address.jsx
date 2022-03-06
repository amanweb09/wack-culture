import React from 'react'

const Address = ({ address, setAddress }) => {

    function pushAddressDetails(name, value) {
        setAddress({
            ...address,
            [name]: value
        })
    }

    return (
        <>
            <details>
                <summary className='text-lg font-semibold mt-12 cursor-pointer'>
                    Shipping Info
                </summary>

                <form className='mt-4'>
                    <label
                        htmlFor="address_line_1">
                        Address Line 1
                        <span className='text-red-500'>*</span>
                    </label>

                    <input
                        onChange={(e) => { pushAddressDetails(e.target.name, e.target.value) }}
                        value={address.address_line_1}
                        style={{ border: '1px solid #70a73c' }}
                        className='block px-2 w-11/12 sm:w-8/12 mb-4 h-8'
                        type="text"
                        name='address_line_1'
                        placeholder='Address line 1 here' />

                    <label
                        htmlFor="address_line_2">
                        Address Line 2
                    </label>
                    <input
                        onChange={(e) => { pushAddressDetails(e.target.name, e.target.value) }}
                        value={address.address_line_2}
                        style={{ border: '1px solid #70a73c' }}
                        className='block px-2 w-11/12 sm:w-8/12 mb-4 h-8'
                        type="text"
                        name='address_line_2'
                        placeholder='Address line 2 here' />

                    <label
                        htmlFor="landmark">Landmark</label>
                    <input
                        onChange={(e) => { pushAddressDetails(e.target.name, e.target.value) }}
                        value={address.landmark}
                        style={{ border: '1px solid #70a73c' }}
                        className='block px-2 w-11/12 sm:w-8/12 mb-2 h-8'
                        type="text"
                        name='landmark'
                        placeholder='Landmark here' />

                    <div className='flex mt-4'>
                        <div className='mr-2 sm:mr-6'>
                            <label
                                htmlFor="city">
                                City
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                onChange={(e) => { pushAddressDetails(e.target.name, e.target.value) }}
                                value={address.city}
                                style={{ border: '1px solid #70a73c' }}
                                className='block px-2 mb-4 h-8'
                                type="text"
                                name='city'
                                placeholder='City here' />
                        </div>

                        <div>
                            <label
                                htmlFor="pincode">
                                Pin Code
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                onChange={(e) => { pushAddressDetails(e.target.name, e.target.value) }}
                                value={address.pincode}
                                style={{ border: '1px solid #70a73c' }}
                                className='block px-2 mb-4 h-8 w-40'
                                type="number"
                                name='pincode'
                                placeholder='Pin Code here' />
                        </div>
                    </div>

                    <div className='flex mt-4'>
                        <div className='sm:mr-6 mr-2'>
                            <label
                                htmlFor="city">
                                State
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                onChange={(e) => { pushAddressDetails(e.target.name, e.target.value) }}
                                value={address.state}
                                style={{ border: '1px solid #70a73c' }}
                                className='block px-2 mb-4 h-8'
                                type="text"
                                name='state'
                                placeholder='State here' />
                        </div>

                        <div>
                            <label
                                htmlFor="pincode">
                                Country
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                onChange={(e) => { pushAddressDetails(e.target.name, e.target.value) }}
                                value={address.country}
                                style={{ border: '1px solid #70a73c' }}
                                className='block px-2 mb-4 h-8 w-40 sm:w-80'
                                type="text"
                                name='country'
                                placeholder='Country here' />
                        </div>
                    </div>

                </form>
            </details>


        </>
    );
};

export default Address;
