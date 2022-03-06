import axios from 'axios'

export async function uploadImage(image) {

    const formData = new FormData();
    formData.append('file', image)
    formData.append('upload_preset', 'product_primary')

    try {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/react-ecom/upload`
        const { data } = await axios.post(cloudinaryUrl, formData);

        console.log(data);
        return { public_id: data.public_id }

    } catch (error) {
        console.log(error.response.data);
    }

}