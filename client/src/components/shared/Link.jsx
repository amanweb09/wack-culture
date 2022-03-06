import React from 'react'
import { NavLink } from 'react-router-dom'

const Link = ({ title, path }) => {
    return (
        <div>
            <NavLink
                to={path}
                className='flex-center mt-4 mx-auto w-max h-max'>
                <span
                    style={{ borderBottom: '1px solid #70a73c' }}
                    className='text-lg mr-2 my-6 dark:text-gray-50'>
                    {title}
                </span>
                <img
                    src='/images/link-icon.png'
                    alt='link' />
            </NavLink>
        </div>
    )
}

export default Link
