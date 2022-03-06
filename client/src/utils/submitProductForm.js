import { admin__createProduct } from "../http";

export async function submitProduct(details, store) {

    const productData = {
        id: details.id,
        title: details.title,
        price: details.price,
        image_primary: store.image_primary,
        image_sec: store.image_sec ? store.image_sec: [],
        category: details.category,
        tags: store.tags,
        desc: details.desc,
        colors: store.colors,
        sizes: store.sizes,
        sku: '',
        season: details.season,
        collection_name: details.collection_name,
        sub_collection: details.sub_collection,
    }

    try {
        await admin__createProduct(productData);
        window.alert('Woohoo! Product Created Successfully...')
        window.location.reload()

    } catch (error) {
        console.log(error.response);
        window.alert(error.response.data.err)
    }
}