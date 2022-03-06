import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Image } from 'cloudinary-react'

const CollectionCard = ({ img, link, bannerTitle }) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => { navigate(link) }}
            className="flex-center flex-col py-4 px-2 cursor-pointer"
            style={{boxShadow: '2px 4px 7px #dcdcdc, -2px 4px 7px #dcdcdc'}}>

            <Image
                className='h-40'
                cloudName='react-ecom'
                publicId={img}
            />

            <div className='w-full text-center font-bold bg-black text-white py-2 mt-4'>
                <h2>{bannerTitle}</h2>
            </div>

        </div>
    )
}

export default CollectionCard
