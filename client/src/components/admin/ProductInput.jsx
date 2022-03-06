import React from 'react';

const ProductInput = ({ label, value, name, type, details, setDetails }) => {
    function setInfo(evName, evValue) {
        setDetails({
            ...details,
            [evName]: evValue 
        })
    }
    return (
        <>
            <label
                className='block font-semibold mt-2 mb-2'
                htmlFor={name}>
                {label}
            </label>
            <input
                onChange={(e) => {setInfo(e.target.name, e.target.value)}}
                value={value}
                className='px-2 block w-7/12 border-2 border-solid border-green-600 h-10 mb-4'
                name={name}
                placeholder={`${name} here`}
                type={type ? type : 'text'} />
        </>
    );
};

export default ProductInput;
