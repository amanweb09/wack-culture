import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import Styles from './shared.module.css'
import { Image } from 'cloudinary-react'


const SideMenu = ({ status, setStatus }) => {
    const navigate = useNavigate()

    return (
        <>
            {
                status ? <div
                    style={{ zIndex: '99', transition: '0.4s' }}
                    className='fixed bg-white inset-0 w-screen h-screen dark:bg-gray-900 dark:text-white'>

                    <div
                        className='w-full flex items-center justify-end'>
                        <Image
                            onClick={() => { navigate('/'); setStatus(false) }}
                            className={Styles.nav_logo_side_menu}
                            cloudName='react-ecom'
                            publicId='utilities/logo'
                            alt="logo"
                        />
                    </div>

                    <div className='w-1/2 flex-center flex-col mx-auto py-8'>
                        <NavLink
                            onClick={() => { setStatus(false) }}
                            to='/new-arrivals'
                            className='sm:text-lg font-semibold hover:text-green-500 my-2'>
                            New Arrivals
                        </NavLink>
                        <NavLink
                            onClick={() => { setStatus(false) }}
                            to='/collection?qa=music&searchIna=collection_name'
                            className='sm:text-lg font-semibold hover:text-green-500 my-2'>
                            Indi-Pop
                        </NavLink>
                        <NavLink
                            onClick={() => { setStatus(false) }}
                            to='/collection?qa=netflix&searchIna=tags'
                            className='sm:text-lg font-semibold hover:text-green-500 my-2'>
                            Netflix Store
                        </NavLink>
                        <NavLink
                            onClick={() => { setStatus(false) }}
                            to='/login'
                            className='sm:text-lg font-semibold hover:text-green-500 my-2'>
                            Login/Register
                        </NavLink>
                        <NavLink
                            onClick={() => { setStatus(false) }}
                            to='/user/orders'
                            className='sm:text-lg font-semibold hover:text-green-500 my-2'>
                            My Orders
                        </NavLink>
                        <NavLink
                            onClick={() => { setStatus(false) }}
                            to='/profile'
                            className='sm:text-lg font-semibold hover:text-green-500 my-2'>
                            Profile
                        </NavLink>
                        <NavLink
                            onClick={() => { setStatus(false) }}
                            to='/contact'
                            className='sm:text-lg font-semibold hover:text-green-500 my-2'>
                            Contact
                        </NavLink>
                        <a
                            onClick={() => { setStatus(false) }}
                            href='http://www.instagram.com'
                            target='_blank'
                            className='sm:text-lg font-semibold text-pink-600 hover:text-green-500 my-2'>
                            Connect on Instagram
                        </a>
                    </div>

                    {/* <div className='w-full flex items-center sm:justify-center justify-end pr-8'>
                        <ThemeToggle />
                    </div> */}

                </div>
                    :
                    <div
                        style={{ width: '100vw', height: '100vh', zIndex: '99', top: 0, left: '-2000px', bottom: 0, right: 0, transition: '0.4s' }}
                        className='fixed bg-white'>
                    </div>
            }
        </>
    )
}

export default SideMenu
