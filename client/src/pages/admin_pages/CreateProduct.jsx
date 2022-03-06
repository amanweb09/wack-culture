import React, { useState } from 'react';
import ProductInput from '../../components/admin/ProductInput';
import { uploadImage } from '../../utils/uploadImage';
import { useDispatch, useSelector } from 'react-redux'
import { setPrimary, setSec, setColor, setSize, setTags } from '../../store/adminProductSlice';
import ProductStoreElements from '../../components/admin/ProductStoreElements';
import { submitProduct } from '../../utils/submitProductForm';

const CreateProduct = () => {
    const dispatchToStore = useDispatch();
    const store = useSelector((state) => state.adminProduct)

    const [image, setImage] = useState('');
    const [details, setDetails] = useState({
        id: '',
        title: '',
        price: '',
        category: '',
        tag: '',
        desc: '',
        color: '',
        size: '',
        season: '',
        collection_name: '',
        sub_collection: ''
    })

    async function sendImage(e) {
        e.preventDefault();
        const { public_id } = await uploadImage(image);
        dispatchToStore(setPrimary({ image_primary: public_id }))
    }

    async function sendImageSec(e) {
        e.preventDefault();
        const { public_id } = await uploadImage(image);
        dispatchToStore(setSec({ image_sec: public_id }))
    }

    function setInfo(evName, evValue) {
        setDetails({
            ...details,
            [evName]: evValue
        })
    }

    function handleProductSubmit(e) {
        e.preventDefault();
        const confirmation = window.confirm('Are you sure you want to submit the product?')

        if(confirmation) {
            submitProduct(details, store, dispatchToStore)
        }
        else {
            return;
        }
    }

    return (
        <div className='container mx-auto'>
            <header
                className='text-2xl font-semibold text-white flex-center h-44'
                style={{
                    backgroundColor: '#21d190',
                    backgroundImage: 'linearGradient(315deg, #21d190 0%, #d65bca 74%)'
                }}>
                Create a Product
            </header>
            <form method='POST'>

                <ProductInput details={details} setDetails={setDetails} label="Product ID" name='id' value={details.id} />
                <ProductInput details={details} setDetails={setDetails} label="Title" name='title' value={details.title} />
                <ProductInput details={details} setDetails={setDetails} label="Price" name='price' value={details.price} type='tel' />
                <ProductInput details={details} setDetails={setDetails} label="Category" name='category' value={details.category} />
                <ProductInput details={details} setDetails={setDetails} label="Product Description" name='desc' value={details.desc} />
                <ProductInput details={details} setDetails={setDetails} label="Collection Name" name='collection_name' value={details.collection_name} />
                <ProductInput details={details} setDetails={setDetails} label="Sub-Collection Name" name='sub_collection' value={details.sub_collection} />


                {/* season */}
                <label
                    className='block font-semibold mt-2 mb-2'
                    htmlFor="season">Season</label>
                <select
                    defaultValue=''
                    onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                    className='w-44 h-10 border-2 border-solid border-green-600 mb-6'
                    name="season">
                    <option selected></option>
                    <option value="summer">Summer</option>
                    <option value="winter">Winter</option>
                    <option value="all">All Season</option>
                </select>


                {/* colors */}
                <ProductStoreElements
                    label='Colors'
                    name='color'
                    store_property='colors'
                    value={details.color}
                    setInfo={setInfo}
                    action={setColor}
                    payload_name='color'
                    details={details} />

                {/* sizes */}
                <ProductStoreElements
                    label='Sizes'
                    name='size'
                    store_property='sizes'
                    value={details.size}
                    setInfo={setInfo}
                    action={setSize}
                    payload_name='size'
                    details={details} />

                {/* sizes */}
                <ProductStoreElements
                    label='Tags'
                    name='tag'
                    store_property='tags'
                    value={details.tag}
                    setInfo={setInfo}
                    action={setTags}
                    payload_name='tag'
                    details={details} />


                {/* primary image */}
                <label
                    htmlFor="image_primary"
                    className='block font-semibold mt-2 mb-2'>
                    Primary Image
                </label>
                <h2 className='font-bold'>{store.image_primary}</h2>
                <input
                    className='block w-44 h-10 font-bold'
                    name='image'
                    onChange={(e) => { setImage(e.target.files[0]) }}
                    type="file" />

                <button
                    className='w-44 h-10 mt-2 mb-4 bg-black text-white font-bold'
                    onClick={sendImage}
                    type='submit'>
                    upload Primary
                </button>


                {/* secondary Image */}
                <label
                    className='block font-semibold mt-4 mb-2'
                    htmlFor="image">
                    Secondary Image
                </label>

                <ol>
                    {
                        store.image_sec.length > 0 && store.image_sec.map((pId) => {
                            return <li
                                key={pId}
                                className='my-2 font-bold'>
                                {pId}
                            </li>
                        })
                    }
                </ol>

                <input
                    className='block'
                    name='image'
                    onChange={(e) => { setImage(e.target.files[0]) }}
                    type="file" />

                <button
                    className='w-44 h-10 my-4 bg-black text-white font-bold'
                    onClick={sendImageSec}
                    type='submit'>
                    upload Secondary
                </button>


                <button
                onClick={handleProductSubmit}
                    type='submit'
                    className='w-96 mx-auto block h-14 mt-10 mb-4 bg-green-primary font-bold'>
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
