import React from 'react'
import Styles from './shared.module.css'

const Section = ({ title, icon, children }) => {
    return (
        <>
            <div
                className={`${Styles.sectionTitleContainer}, mb-12 flex items-center justify-start pt-4 sm:pt-5 mt-4`}>
                <h1 className={`${Styles.title}, dark:text-white text-xl sm:text-2xl ml-2 sm:ml-0 font-semibold sm:font-normal`}>{title}</h1>
                {
                    icon && <img 
                    className='w-6 ml-2'
                    src={icon} 
                    alt='title icon' />
                }
            </div>

            {children}
        </>
    )
}

export default Section
