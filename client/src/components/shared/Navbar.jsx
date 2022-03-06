import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SideMenu from './SideMenu'
import { useSelector } from 'react-redux'
import { Image } from 'cloudinary-react'
import Styles from './shared.module.css'

const Navbar = () => {

    const navigate = useNavigate()

    const [sideMenu, setSideMenu] = useState(false)
    const cartDetails = useSelector((state) => state.order.cart)

    const counterStyle = {
        right: '-5px',
        top: '-5px',
        borderRadius: '50%',
        backgroundColor: '#d8dede',
        backgroundImage: 'linear-gradient(315deg, #f876de 0%, #b9d1eb 74%)'
    }

    return (
        <>
            <div
                className='h-16 sm:h-24 w-full mx-auto flex items-center justify-evenly'
            >

                <SideMenu
                    status={sideMenu}
                    setStatus={setSideMenu} />

                <div className="nav-left flex items-center">
                    <div
                        onClick={() => { sideMenu ? setSideMenu(false) : setSideMenu(true) }}
                        className="hamburger mr-6 flex-col cursor-pointer"
                        style={{ zIndex: '999' }}>

                        {
                            !sideMenu ? <>
                                <div style={{ height: '2px' }} className="bars w-10 dark:bg-gray-50 bg-black my-1"></div>
                                <div style={{ height: '2px' }} className="bars w-10 dark:bg-gray-50 bg-black my-1"></div>
                                <div style={{ height: '2px' }} className="bars w-10 dark:bg-gray-50 bg-black my-1"></div>
                            </>
                                :
                                <img
                                    className='w-8 sm:w-12 fixed'
                                    src='/images/delete-button.png'
                                    alt='close menu'
                                    style={{ top: 30 }} />
                        }


                    </div>
                    <div className="user mx-6 hidden sm:block">
                        <NavLink to='/profile'>
                            <img
                                className='w-8 cursor-pointer dark:invert'
                                src="/images/user.png"
                                alt="user" />
                        </NavLink>
                    </div>
                </div>

                <div className="logo w-1/2">
                    <Image
                        onClick={() => { navigate('/') }}
                        className={Styles.nav_logo}
                        cloudName='react-ecom'
                        publicId='utilities/logo'
                        alt="logo"
                    />
                </div>

                <div className="nav-right flex items-center">
                    <div className="wishlist mx-6 hidden sm:block">
                        <NavLink to='/wishlist'>
                            <img
                                className='w-8 cursor-pointer dark:invert'
                                src="/images/wishlist.png"
                                alt="wishlist" />
                        </NavLink>
                    </div>
                    <div className="cart ml-6 relative">
                        <NavLink to='/cart'>
                            <div
                                style={counterStyle}
                                className="flex-center absolute w-4 h-4 sm:w-5 sm:h-5 top-0.5 right-0.5">
                                {cartDetails ? cartDetails.totalItems : 0}
                            </div>
                            <img
                                className='sm:w-8 w-6 cursor-pointer dark:invert'
                                src="/images/cart.png"
                                alt="cart" />
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
