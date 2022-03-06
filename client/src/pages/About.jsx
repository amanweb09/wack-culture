import React from 'react'
import Styles from './pages.module.css'
import Footer from '../components/home/Footer'

const About = () => {
    return (
        <div className='container mx-auto'>
            <h1 className='font-bold text-xl mt-10'>About the store</h1>
            <p className='pt-2 mb-4'>
                <span className={Styles.first_letter}>Wack</span> Culture &copy; is an online fashion store, themed around quirky fashion and art.
                We intend to put your thoughts onto the most comfortable fabric and serve it to our customers with immense enthusiasm.
                <br />
                At Wack Culture &copy;, we try to provide the best illustrated T-shirt, and we're incredibly proud to call ourselves a 100% Indian brand!
            </p>

            <h1 className='font-bold text-xl'>The Beginning</h1>
            <p className='pt-2 mb-4'>
                <span className={Styles.first_letter}>Wack</span> Culture &copy; was established in 2022 to serve the people who love to look at the world through a different perspective, with a wacky approach.
                Our motive is to keep bland, common perspectives aside and focus on visualising the world in a whole new way!
            </p>

            <h1 className='font-bold text-xl'>What do we make?</h1>
            <p className='pt-2 mb-4'>
                We deal in apparel, which currently includes T-shirts. But we're planning to manufacture other apparel as well as accessories like notebooks, diaries, keychains, and much more.
            </p>

            <div className="mt-8">
                <Footer />
            </div>
        </div>
    )
}

export default About