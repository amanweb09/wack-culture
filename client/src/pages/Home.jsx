import React, { useEffect, useState } from 'react'
import Banner from '../components/shared/Banner'
import ProductCard from '../components/shared/ProductCard'
import Section from '../components/shared/Section'
import { useNavigate } from 'react-router-dom'
import CollectionCard from '../components/home/CollectionCard'
import Link from '../components/shared/Link'
import { getProducts } from '../http'
import LoadingBar from 'react-top-loading-bar'
import Footer from '../components/home/Footer'
import Header from '../components/home/Header'
import BirthdayPopup from '../components/home/BirthdayPopup'
import useFindIsBirthday from '../hooks/useFindIsBirthday'
import EmailList from '../components/home/EmailList'
import homeProducts from '../homeProducts.json'


const Home = () => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(100);
    const [newArrivals, setNewArrivals] = useState([]);
    const [saleProducts, setSaleProducts] = useState([]);

    const { isBirthday, setIsBirthday } = useFindIsBirthday()

    useEffect(() => {
        const newArrivalsDetails = homeProducts.filter((product) => {
            return product.displayedOn === 'new-arrivals'
        })
        setNewArrivals(newArrivalsDetails)

        const saleProductsDetails = homeProducts.filter((product) => {
            return product.displayedOn === 'sale'
        })
        setSaleProducts(saleProductsDetails)
    }, [])


    return (
        <>
            <div className='container mx-auto'>
                {
                    isBirthday ? <BirthdayPopup setIsBirthday={setIsBirthday} /> : <></>
                }
                <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onLoaderFinished={() => { setProgress(0) }}
                />

                <Header />

                <div className='mt-10 mb-16'>
                    <Banner
                        icon="coupon.png"
                        text='Flat Rs.50 off on your first order with First50!'
                    />
                </div>

                <Section title='Newly Arrived'>
                    <div
                        className='products-container grid grid-cols-2 sm:grid-cols-4 sm:gap-4 items-center justify-center mx-auto'>
                        {
                            newArrivals.map((product) => {
                                return <ProductCard
                                    key={product._id}
                                    product={product} />
                            })
                        }
                    </div>

                    <div>
                        <Link path='/new-arrivals' title='Browse all new arrivals' />
                    </div>
                </Section>

                <Section
                    title='Our Collections'>
                    <div
                        className='grid grid-cols-2 gap-4 sm:grid-cols-5 mx-auto items-center justify-center px-2'>

                        <CollectionCard
                            img='utilities/exclusives'
                            link='/collection?qa=exclusives&searchIna=tags'
                            bannerTitle='Exclusives'
                        />
                        <CollectionCard
                            img='utilities/indi_pop'
                            link="collection?qa=music&searchIna=collection_name"
                            bannerTitle='Indi Pop'
                        />
                        <CollectionCard
                            img='utilities/netflix'
                            link='/collection?qa=netflix&searchIna=tags'
                            bannerTitle='Netflix'
                        />

                    </div>
                </Section>

                <div className='pt-4 sm:pt-6 mt-6'>
                    <Section
                        title='The "Not to be Missed" Sale!'
                        icon='/images/sale-icon.png'>
                        <div className='grid grid-cols-2 sm:grid-cols-4 sm:gap-24 mt-2 py-2 sm:mt-6 sm:py-6'>

                            {
                                saleProducts.map((product) => {
                                    return <ProductCard
                                        key={product._id}
                                        product={product} />
                                })
                            }
                        </div>

                        <div>
                            <Link path='/' title='View Complete Sale' />
                        </div>
                    </Section>
                </div>

                <EmailList />

                <Footer />
            </div>
        </>
    )
}

export default Home
