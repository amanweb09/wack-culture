import React from 'react'
import Slider from "react-slick";
import { Image } from 'cloudinary-react'
import Styles from './shared/shared.module.css'


const SlickSlider = ({ image_primary, image_sec }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div
            // style={{ width: 400, height: 500 }}
            className={Styles.product_slider}>
            <Slider {...settings}>
                <div>
                    <Image
                        cloudName='react-ecom'
                        publicId={image_primary}
                        alt='product img' />
                </div>

                {
                    image_sec.map((img) => {
                        return <div key={img}>
                            <Image
                                cloudName='react-ecom'
                                publicId={img}
                                alt='product img' />
                        </div>
                    })
                }
            </Slider>
        </div>
    )
}

export default SlickSlider;