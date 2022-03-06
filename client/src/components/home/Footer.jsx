import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className='bg-black w-full py-4'>
                <h2
                    className='text-center text-white text-2xl font-normal mt-8'>
                    QUICK LINKS
                </h2>

                <div
                    style={{ width: '90%', borderBottom: '1px solid #393939' }}
                    className='grid grid-cols-3 gap-12 items-center justify-center mx-auto my-6'>

                    <div>
                        <ul className='text-white text-center'>
                            <NavLink
                                to='/'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Home</NavLink>
                            <NavLink
                                to='/about'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>About</NavLink>
                            <NavLink
                                to='/contact'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Contact</NavLink>
                            <NavLink
                                to='/profile'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Profile</NavLink>
                        </ul>
                    </div>
                    <div>
                        <ul className='text-white text-center'>
                            <NavLink
                                to='/cart'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Cart</NavLink>
                            <NavLink
                                to='/wishlist'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Wishlist</NavLink>
                            <NavLink
                                to='/orders'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>My Orders</NavLink>
                            <NavLink
                                to='/cancellations'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Cancellations</NavLink>
                        </ul>
                    </div>
                    <div>
                        <ul className='text-white text-center'>
                            <NavLink
                                to='/policies'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>T&C</NavLink>
                            <NavLink
                                to='/policies'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Policies</NavLink>
                            <NavLink
                                to='/contact'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Review Us</NavLink>
                            <NavLink
                                to='/'
                                style={{ width: 'max-content' }}
                                className='text-xs sm:text-normal my-6 mx-auto block hover:text-green-700'>Connect</NavLink>
                        </ul>
                    </div>
                </div>

            </div>

            <div
                className="bg-black py-4"
                style={{ borderBottom: '1px solid #393939' }}>
                <h2 className="text-center text-white text-lg font-normal">Connect with us</h2>

                <div className="flex-center mt-4 sm:pb-8">
                    <a
                        href="https://www.instagram.com/wack.culture"
                        target='_blank'>
                        <img
                            className='mx-4 sm:w-8 w-6'
                            src="/images/instagram.png"
                            alt="instagram" />
                    </a>

                    <a
                        href="https://www.facebook.com/"
                        target='_blank'>
                        <img
                            className='mx-4 sm:w-8 w-6'
                            src="/images/facebook.png"
                            alt="facebook" />
                    </a>

                    <a
                        href="https://www.twitter.com/"
                        target='_blank'>
                        <img
                            className='mx-4 sm:w-8 w-6'
                            src="/images/twitter.png"
                            alt="twitter" />
                    </a>

                    <a
                        href="mailto: wackcultureofficial@gmail.com"
                        target='_blank'>
                        <img
                            className='mx-4 sm:w-8 w-6'
                            src="/images/gmail.png"
                            alt="mail" />
                    </a>
                </div>
            </div>

            <div className="bg-black pt-8" style={{ borderBottom: '1px solid #393939' }}>
                <h2 className="text-center text-white text-lg font-normal">Pay Securely With</h2>

                <div className="flex-center my-6 sm:pb-8 pb-6">
                    <img className='sm:mx-4 mx-2 sm:w-8 w-6' src="/images/cod.png" alt="cash on delivery" />
                    <img className='sm:mx-4 mx-2 sm:w-8 w-6' src="/images/mastercard.png" alt="mastercard" />
                    <img className='sm:mx-4 mx-2 sm:w-8 w-6' src="/images/visa.png" alt="visa" />
                    <img className='sm:mx-4 mx-2 sm:w-8 w-6' src="/images/upi.png" alt="upi" />
                    <img className='sm:mx-4 mx-2 sm:w-8 w-6' src="/images/netbanking.png" alt="netbanking" />
                    <img className='sm:mx-4 mx-2 sm:w-8 w-6' src="/images/wallet.png" alt="wallet" />
                </div>
            </div>

            <footer className='bg-black text-center text-white sm:text-base text-sm sm:font-thin w-full py-4'>
                Wack Culture &copy; || All rights reserved
            </footer>
        </>
    );
};

export default Footer;
