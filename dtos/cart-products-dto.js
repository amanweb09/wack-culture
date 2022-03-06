class CartProductsDto {
    _id;
    title;
    price;
    img;

    constructor(product) {
        this.title = product.title;
        this._id = product._id;
        this.price = product.price;
        this.img = product.images.image_primary;
    }
}

module.exports = CartProductsDto;