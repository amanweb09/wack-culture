import React from 'react'

const FormInput = ({ style, label, name, type, placeholder, value, setState }) => {
    return (
        <>
            <label htmlFor={label} className='flex mt-6'>
                {label}<span className='text-red-600'>*</span>
            </label>
            <input
                className='px-2 h-8 w-full'
                style={style}
                type={type ? type : 'text'}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={(e) => { setState(e.target.name, e.target.value) }}
            />
        </>
    )
}

export default FormInput
